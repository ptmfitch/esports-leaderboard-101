import { Roboto_Condensed, Roboto_Mono, Space_Mono } from "next/font/google";
import { entrants } from "./entrants";
import StandingsTable, { type Standing } from "./StandingsTable";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: "400",
  subsets: ["latin"],
});

const standings: Standing[] = entrants
  .map((e) => ({
    name: e.name,
    logo: e.logo,
    score: e.harness + e.surfaces + e.factory + e.governance,
    criteria: [
      { label: "Harness", value: e.harness },
      { label: "Surfaces", value: e.surfaces },
      { label: "Factory", value: e.factory },
      { label: "Governance", value: e.governance },
    ],
  }))
  .sort((a, b) => b.score - a.score);

export default function RankingsPage() {
  return (
    <div
      className={`aerosol-hud ${robotoMono.variable} ${robotoCondensed.variable} ${spaceMono.variable} flex w-full max-w-[1000px] flex-col gap-[var(--space-4)] bg-[color:var(--asphalt)] px-[var(--space-3)] py-[var(--space-6)]`}
    >
      <div className="flex flex-col gap-[var(--space-2)]">
        <p className="font-[family-name:var(--font-roboto-condensed)] text-[length:var(--size-label)] font-semibold uppercase leading-none tracking-[var(--tracking-label)] text-[color:var(--spray-pink)]">
          + Standings +
        </p>
        <h2 className="font-[family-name:var(--font-roboto-condensed)] text-[length:var(--size-heading)] font-semibold uppercase leading-none tracking-[0.02em] text-[color:var(--chalk)]">
          Agent Leaderboard
        </h2>
        <p className="max-w-[48ch] font-[family-name:var(--font-roboto-condensed)] text-[length:var(--size-body)] leading-[1.6] text-[color:var(--chalk-74)]">
          Every contender gets the mic. The board decides who keeps it. Scored
          out of 20 across four criteria.
        </p>
      </div>

      <StandingsTable standings={standings} />
    </div>
  );
}
