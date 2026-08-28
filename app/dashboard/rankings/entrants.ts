export type AgentLogoId =
  | "claude-code"
  | "cursor"
  | "devin"
  | "factory"
  | "google-antigravity"
  | "kiro"
  | "openai-codex"
  | "opencode";

export type Entrant = {
  name: string;
  logo: AgentLogoId;
  harness: number;
  surfaces: number;
  factory: number;
  governance: number;
};

export const entrants: Entrant[] = [
  {
    name: "Claude Code",
    logo: "claude-code",
    harness: 5,
    surfaces: 3,
    factory: 4,
    governance: 3,
  },
  {
    name: "Cursor",
    logo: "cursor",
    harness: 5,
    surfaces: 5,
    factory: 5,
    governance: 5,
  },
  {
    name: "Devin",
    logo: "devin",
    harness: 3,
    surfaces: 3,
    factory: 4,
    governance: 3,
  },
  {
    name: "Factory",
    logo: "factory",
    harness: 4,
    surfaces: 3,
    factory: 4,
    governance: 4,
  },
  {
    name: "Google Antigravity",
    logo: "google-antigravity",
    harness: 3,
    surfaces: 4,
    factory: 2,
    governance: 3,
  },
  {
    name: "Kiro",
    logo: "kiro",
    harness: 3,
    surfaces: 3,
    factory: 2,
    governance: 3,
  },
  {
    name: "OpenAI Codex",
    logo: "openai-codex",
    harness: 4,
    surfaces: 4,
    factory: 3,
    governance: 3,
  },
  {
    name: "OpenCode",
    logo: "opencode",
    harness: 3,
    surfaces: 2,
    factory: 2,
    governance: 1,
  },
];
