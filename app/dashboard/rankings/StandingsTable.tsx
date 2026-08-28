import type { AgentLogoId } from "./entrants";
import AgentLogo from "./logos";

export type Criterion = {
  label: string;
  value: number;
};

export type Standing = {
  name: string;
  logo: AgentLogoId;
  score: number;
  criteria: Criterion[];
};

// Type roles from the Aerosol HUD library. Font variables are supplied by the
// page wrapper; tabular figures are mandatory anywhere numbers stack.
const numeral =
  "font-[family-name:var(--font-roboto-mono)] font-medium tabular-nums";
const rowLabel =
  "font-[family-name:var(--font-roboto-condensed)] font-semibold uppercase";
const uiLabel = `${rowLabel} text-[length:var(--size-label)] tracking-[var(--tracking-label)] text-[color:var(--ash)]`;
const micro =
  "font-[family-name:var(--font-space-mono)] text-[length:var(--size-micro)] tracking-[var(--tracking-micro)] uppercase";

// A 24px gap between columns, drawn entirely with left padding so every value
// stays on the 8px scale instead of splitting into two 12px halves.
const rankCell = "w-[80px] pl-[var(--space-3)] align-middle";
const identityCell = "pl-[var(--space-3)] align-middle";
const scoreCell =
  "w-[158px] px-[var(--space-3)] text-right align-middle whitespace-nowrap";

function StandingsRow({
  standing,
  rank,
  isLeader,
}: {
  standing: Standing;
  rank: number;
  isLeader: boolean;
}) {
  const meta = standing.criteria
    .map((c) => `${c.label} // ${c.value}`)
    .join(" · ");

  return (
    <tr className="border-t border-[color:var(--hairline-dim)]">
      <th
        scope="row"
        className={`${rankCell} ${numeral} py-[var(--space-2)] text-left font-medium ${
          isLeader
            ? "text-[length:var(--size-heading)] leading-[1.1] text-[color:var(--spray-pink)]"
            : "text-[length:var(--size-body)] leading-none text-[color:var(--chalk)]"
        }`}
      >
        {String(rank).padStart(2, "0")}
      </th>
      <td className={`${identityCell} py-[var(--space-2)]`}>
        <span className="flex flex-col gap-[6px]">
          <span
            className={`${rowLabel} flex items-center gap-[var(--space-1)] text-[length:var(--size-body)] leading-none tracking-[0.04em] text-[color:var(--chalk)]`}
          >
            <AgentLogo id={standing.logo} />
            {standing.name}
          </span>
          <span className={`${micro} leading-none text-[color:var(--ash)]`}>
            {meta}
          </span>
        </span>
      </td>
      <td
        className={`${scoreCell} ${numeral} py-[var(--space-2)] text-[length:var(--size-body)] leading-none text-[color:var(--chalk)]`}
      >
        {standing.score}
      </td>
    </tr>
  );
}

export default function StandingsTable({
  standings,
}: {
  standings: Standing[];
}) {
  return (
    // The plate is the table, not the row: one hairline wraps the whole thing
    // and rows separate with the dimmer hairline.
    <div className="w-full max-w-[1000px] overflow-x-auto rounded-[var(--radius)] border border-[color:var(--hairline)] bg-[color:var(--asphalt)]">
      <table className="w-full min-w-[640px] table-fixed border-collapse text-left">
        <thead>
          <tr>
            <th
              scope="col"
              className={`${rankCell} ${uiLabel} py-[var(--space-2)] leading-none`}
            >
              Rank
            </th>
            <th
              scope="col"
              className={`${identityCell} ${uiLabel} py-[var(--space-2)] leading-none`}
            >
              Contender
            </th>
            <th
              scope="col"
              className={`${scoreCell} ${uiLabel} py-[var(--space-2)] leading-none`}
            >
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, i) => (
            <StandingsRow
              key={standing.name}
              standing={standing}
              rank={i + 1}
              isLeader={i === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
