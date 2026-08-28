import { entrants } from "./entrants";
import AgentLogo from "./logos";

const rankSize = [
  "text-6xl",
  "text-5xl",
  "text-4xl",
  "text-3xl",
  "text-2xl",
  "text-xl",
  "text-lg",
  "text-base",
];

function Stars({ score }: { score: number }) {
  return (
    <span aria-label={`${score} out of 5`} className="text-nowrap">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={s <= score ? "text-warning" : "text-base-content/30"}
        >
          {s <= score ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

export default function RankingsPage() {
  return (
    <>
      <h2 className="text-3xl m-5">Agent Leaderboard</h2>

      <div className="overflow-x-auto min-w-2/3 rounded-box border border-base-content/5 bg-base-200">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Agent</th>
              <th>Harness</th>
              <th>Surfaces</th>
              <th>Factory</th>
              <th>Governance</th>
              <th>Overall</th>
            </tr>
          </thead>
          <tbody>
            {entrants.map((e, i) => {
              const overall =
                e.harness + e.surfaces + e.factory + e.governance;
              return (
                <tr key={e.name}>
                  <th
                    className={`${
                      rankSize[i] ?? "text-base"
                    } font-thin opacity-70 tabular-nums`}
                  >
                    {i + 1}
                  </th>
                  <th>
                    <span className="flex items-center gap-2">
                      <AgentLogo id={e.logo} />
                      {e.name}
                    </span>
                  </th>
                  <th>
                    <Stars score={e.harness} />
                  </th>
                  <th>
                    <Stars score={e.surfaces} />
                  </th>
                  <th>
                    <Stars score={e.factory} />
                  </th>
                  <th>
                    <Stars score={e.governance} />
                  </th>
                  <th>
                    <span
                      className="relative inline-flex h-12 w-12 items-center justify-center"
                      aria-label={`${overall} overall`}
                    >
                      <span className="absolute text-5xl leading-none text-warning">
                        ★
                      </span>
                      <span className="relative z-10 text-sm font-bold tabular-nums text-warning-content">
                        {overall}
                      </span>
                    </span>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
