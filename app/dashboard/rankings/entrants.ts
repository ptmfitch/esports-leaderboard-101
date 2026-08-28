export type Entrant = {
  name: string;
  harness: number;
  surfaces: number;
  factory: number;
  governance: number;
};

export const entrants: Entrant[] = [
  { name: "Claude Code", harness: 5, surfaces: 3, factory: 4, governance: 3 },
  { name: "Cursor", harness: 5, surfaces: 5, factory: 5, governance: 5 },
  { name: "Devin", harness: 3, surfaces: 3, factory: 4, governance: 3 },
  { name: "Factory", harness: 4, surfaces: 3, factory: 4, governance: 4 },
  {
    name: "Google Antigravity",
    harness: 3,
    surfaces: 4,
    factory: 2,
    governance: 3,
  },
  { name: "Kiro", harness: 3, surfaces: 3, factory: 2, governance: 3 },
  { name: "OpenAI Codex", harness: 4, surfaces: 4, factory: 3, governance: 3 },
  { name: "OpenCode", harness: 3, surfaces: 2, factory: 2, governance: 1 },
];
