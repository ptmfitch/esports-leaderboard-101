import { Agent, CursorAgentError } from "@cursor/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buildReportPrompt } from "./prompt";

// @cursor/sdk is a Node-only package and must not be bundled for the edge runtime.
export const runtime = "nodejs";

const REPO_URL = "https://github.com/ptmfitch/esports-leaderboard-101";
const REPO_REF = "master";

// Omitting `auth`/`headers` lets a personal API key reuse the OAuth grants already
// authorized for these server URLs on cursor.com/agents.
const MCP_SERVERS = {
  slack: { type: "http" as const, url: "https://mcp.slack.com/mcp" },
  atlassian: {
    type: "http" as const,
    url: "https://mcp.atlassian.com/v1/mcp/authv2",
  },
};

export async function POST(req: NextRequest) {
  if (!req.cookies.get("userId")?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const apiKey = process.env.CURSOR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "CURSOR_API_KEY is not configured on the server" },
      { status: 500 },
    );
  }

  let body: { text?: unknown; path?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) {
    return NextResponse.json(
      { error: "Please describe the issue" },
      { status: 400 },
    );
  }

  const path = typeof body.path === "string" ? body.path : "unknown";

  try {
    const agent = await Agent.create({
      apiKey,
      model: { id: "composer-2.5" },
      name: "Report issue",
      cloud: {
        repos: [{ url: REPO_URL, startingRef: REPO_REF }],
        autoCreatePR: false,
        skipReviewerRequest: true,
      },
      mcpServers: MCP_SERVERS,
    });

    const run = await agent.send(buildReportPrompt({ text, path }));
    const { agentId } = agent;

    // Cloud runs live server-side, so releasing the local handle does not stop the run.
    agent.close();

    return NextResponse.json(
      {
        agentId,
        runId: run.id,
        agentUrl: `https://cursor.com/agents?id=${agentId}`,
      },
      { status: 202 },
    );
  } catch (err) {
    if (err instanceof CursorAgentError) {
      console.error("report-issue: agent failed to start", {
        message: err.message,
        code: err.code,
        requestId: err.requestId,
        helpUrl: (err as CursorAgentError & { helpUrl?: string }).helpUrl,
      });
      return NextResponse.json(
        { error: `Could not start the reporting agent: ${err.message}` },
        { status: 502 },
      );
    }
    console.error("report-issue: unexpected failure", err);
    return NextResponse.json(
      { error: "Could not start the reporting agent" },
      { status: 500 },
    );
  }
}
