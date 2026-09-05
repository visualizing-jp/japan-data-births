import { useUrlState } from "./hooks/useUrlState.ts";

const VIEWS = [
  { id: "era", label: "時代", hint: "", ready: false },
  { id: "age", label: "母親年齢", hint: "", ready: false },
  { id: "geo", label: "地域", hint: "", ready: false },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

export function App() {
  const [view, setView] = useUrlState<ViewId>("view", "era", (v) =>
    VIEWS.some((x) => x.id === v),
  );

  return (
    <div className="min-h-dvh">
      <header className="border-b border-rule bg-paper/85 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-end justify-between gap-4 px-6 pt-5">
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight">
              日本人はどれだけ子どもを産んできたか
            </h1>
            <p className="text-[11px] text-muted">
              人口動態統計
            </p>
          </div>
          <nav className="flex gap-1 -mb-px" aria-label="ビュー">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={!v.ready}
                onClick={() => setView(v.id)}
                aria-current={view === v.id ? "page" : undefined}
                className={`cursor-pointer border-b-2 px-3 pt-1 pb-2 text-[13px] transition-colors duration-150 disabled:cursor-not-allowed disabled:text-faint ${
                  view === v.id
                    ? "border-accent font-semibold text-ink"
                    : "border-transparent text-muted hover:text-ink disabled:hover:text-faint"
                }`}
              >
                {v.label}
                <span className="ml-1.5 text-[10px] font-normal text-faint">
                  {v.ready ? v.hint : "準備中"}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

<main className="mx-auto w-full max-w-[1240px] px-6 py-16">
  <p className="text-[13px] text-muted">このテーマは準備中です。</p>
  <p className="mt-2 text-[12px] text-faint">
    主な統計: 人口動態統計 ／ 可視化の核: 出生数・出生率・TFR・母親の年齢
  </p>
</main>

      <footer className="mx-auto w-full max-w-[1240px] px-6 pt-2 pb-10 text-[11px] leading-relaxed text-faint">
        出典: 人口動態統計（詳細は docs/data-sources.md。表IDは調査後に確定）。
        <a
          href="https://visualizing.jp/"
          className="mt-2 block w-fit transition-colors duration-150 hover:text-muted"
        >
          visualizing.jp
        </a>
      </footer>
    </div>
  );
}
