export const JIRA_SITE = "https://fe-anysphere-demo.atlassian.net";
export const JIRA_CLOUD_ID = "564eb250-21c1-45d7-81f9-527d6bf705ad";
export const JIRA_PROJECT_KEY = "ELD";
export const SLACK_CHANNEL = "peter-esports-leaderboard-demo";

export function buildReportPrompt({
  text,
  path,
}: {
  text: string;
  path: string;
}): string {
  return `You are triaging a bug report submitted from the "Interstellar AI Rap Battles" esports leaderboard app.

## Reporter's description

${text}

## Where it was reported

Page path: ${path}

## Your task, in order

1. Search Jira for an existing duplicate BEFORE creating anything.
   - Site: ${JIRA_SITE} (cloudId ${JIRA_CLOUD_ID})
   - Project key: ${JIRA_PROJECT_KEY}
   - Use JQL such as: project = ${JIRA_PROJECT_KEY} AND statusCategory != Done ORDER BY created DESC
   - Read the summaries and descriptions of the results and decide whether any of them
     describes the same underlying problem as this report. Match on the underlying problem,
     not on identical wording.

2. If a duplicate exists:
   - Add a comment to that existing issue noting that the problem was reported again,
     including the reporter's description and the page path above.
   - Do NOT create a new issue.
   - Do NOT post anything to Slack.
   - Finish by stating: DUPLICATE <issue-key>

3. If no duplicate exists:
   - Create a new issue in project ${JIRA_PROJECT_KEY} with issue type "Bug".
   - Summary: a short, specific one-line title (no ticket prefix, no "Bug:" prefix).
   - Description: the reporter's description verbatim, the page path, and — if you can
     determine it from the repository — the component or route most likely responsible.
   - Then post a message to the Slack channel #${SLACK_CHANNEL} containing the issue
     summary, the issue key, and the browse URL ${JIRA_SITE}/browse/<issue-key>.
   - Finish by stating: CREATED <issue-key>

## Hard limits

- Do not modify, create, or delete any file in the repository.
- Do not run git commands that change state, do not commit, do not push, do not open a pull request.
- The repository is available to you READ-ONLY, purely so you can identify which part of the
  app the report relates to and write a more useful ticket.
- Post to Slack only in the "new issue" case in step 3. A duplicate must never produce a Slack message.
- Use the #${SLACK_CHANNEL} channel only. Do not message any other channel or any person directly.`;
}
