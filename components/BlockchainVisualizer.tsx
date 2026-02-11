"use client";

import { useCallback, useMemo, useState } from "react";
import { Block, type BlockData, isChainValidFromBlocks, isBlockHashValid } from "@/lib/blockchain";
import { BlockCard } from "@/components/BlockCard";
import { ValidationIndicator } from "@/components/ValidationIndicator";
import { DifficultySelector } from "@/components/DifficultySelector";
import { MiningForm } from "@/components/MiningForm";
import { ThemeToggle } from "@/components/ThemeToggle";

/** Fixed timestamp for genesis so server and client render the same hash (avoids hydration mismatch). */
const GENESIS_TIMESTAMP = 0;

function getInitialBlocks(): BlockData[] {
  const genesis = new Block(0, GENESIS_TIMESTAMP, "Genesis Block", "0");
  return [genesis.toJSON()];
}

export function BlockchainVisualizer() {
  const [blocks, setBlocks] = useState<BlockData[]>(getInitialBlocks);
  const [difficulty, setDifficulty] = useState(1);
  const [miningStatus, setMiningStatus] = useState<
    "idle" | "mining" | "mined"
  >("idle");
  const [miningTimeMs, setMiningTimeMs] = useState(0);
  const [hoveredHashBlockIndex, setHoveredHashBlockIndex] = useState<
    number | null
  >(null);

  const isValid = useMemo(() => isChainValidFromBlocks(blocks), [blocks]);

  const handleMine = useCallback(
    (data: string) => {
      setMiningStatus("mining");
      setMiningTimeMs(0);

      setTimeout(() => {
        const start = performance.now();
        const latest = blocks[blocks.length - 1];
        const newBlock = new Block(
          blocks.length,
          Date.now(),
          data,
          latest.hash
        );
        newBlock.mineBlock(difficulty);
        const elapsed = Math.round(performance.now() - start);

        setBlocks((prev) => [...prev, newBlock.toJSON()]);
        setMiningTimeMs(elapsed);
        setMiningStatus("mined");
      }, 0);
    },
    [blocks, difficulty]
  );

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-primary)" }}
    >
      {/* Top bar: Title and Theme toggle */}
      <header
        className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
        style={{ backgroundColor: "var(--primary-violet)", color: "#ffffff" }}
      >
        <h1 className="text-xl font-semibold text-white">
          Blockchain Visualizer
        </h1>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-6 sm:px-6">
        <div className="flex w-full max-w-6xl flex-1 flex-col gap-6">
          {/* Difficulty row */}
          <section className="flex flex-wrap items-center gap-4">
            <DifficultySelector
              value={difficulty}
              onChange={setDifficulty}
              disabled={miningStatus === "mining"}
            />
          </section>

          {/* Chain Valid row */}
          <section className="flex flex-wrap items-center gap-4">
            <ValidationIndicator isValid={isValid} />
          </section>

          {/* Prominent input + Mine button */}
          <section className="flex flex-wrap items-end gap-4">
            <MiningForm
              onMine={handleMine}
              miningStatus={miningStatus}
              miningTimeMs={miningTimeMs}
              onResetStatus={() => setMiningStatus("idle")}
            />
          </section>

          {/* Horizontal scrolling chain */}
          <section className="flex-1 overflow-x-auto pb-4">
            <div className="flex min-h-full items-stretch gap-0">
            {blocks.map((block, i) => (
              <div key={block.hash} className="flex items-stretch">
                {i > 0 && (
                  <div
                    className="w-8 shrink-0 self-center"
                    style={{ backgroundColor: "var(--primary-violet)", height: "4px", minWidth: "32px" }}
                    aria-hidden
                  />
                )}
                <BlockCard
                  block={block}
                  previousHash={i > 0 ? blocks[i - 1].hash : null}
                  isMining={miningStatus === "mining" && i === blocks.length - 1}
                  isInvalid={!isBlockHashValid(block)}
                  highlightPreviousHash={hoveredHashBlockIndex === i - 1}
                  onHashHover={(hovering) =>
                    setHoveredHashBlockIndex(hovering ? i : null)
                  }
                />
              </div>
            ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
