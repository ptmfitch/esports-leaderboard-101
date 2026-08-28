import { ReactElement } from "react";
import { AgentLogoId } from "./entrants";

// Sized to the 16px contender label so a glyph never makes a standings row
// taller than the leader row, which earns its height from the larger rank.
const iconClass = "h-4 w-4 shrink-0 text-current";

function ClaudeCodeLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" />
    </svg>
  );
}

function CursorLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    >
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5Z" />
      <path d="M12 12l9-5M12 12v10M12 12L3 7" />
    </svg>
  );
}

function DevinLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FactoryLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 20v-9l5 3.5V11l5 3.5V8l5 3.5V20H3Z" />
      <path d="M18 8V4h3v4" />
    </svg>
  );
}

function GoogleAntigravityLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l6 7h-4v6h-4v-6H6l6-7Z" />
      <path d="M5 20h14" />
    </svg>
  );
}

function KiroLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      <path d="M4 20v-9a8 8 0 0 1 16 0v9l-2.7-2-2.6 2-2.7-2-2.7 2L4 20Z" />
      <circle cx="9.5" cy="11" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="11" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function OpenAICodexLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <ellipse cx="12" cy="12" rx="3.6" ry="9" />
      <ellipse
        cx="12"
        cy="12"
        rx="3.6"
        ry="9"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="3.6"
        ry="9"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}

function OpenCodeLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M8 10l2.5 2.5L8 15M13.5 15H17" />
    </svg>
  );
}

const logos: Record<AgentLogoId, () => ReactElement> = {
  "claude-code": ClaudeCodeLogo,
  cursor: CursorLogo,
  devin: DevinLogo,
  factory: FactoryLogo,
  "google-antigravity": GoogleAntigravityLogo,
  kiro: KiroLogo,
  "openai-codex": OpenAICodexLogo,
  opencode: OpenCodeLogo,
};

export default function AgentLogo({ id }: { id: AgentLogoId }) {
  const Logo = logos[id];
  return <Logo />;
}
