"use client";

import { useCallback, useMemo, useState } from "react";
import { Block, type BlockData } from "@/lib/blockchain";
import { isChainValidFromBlocks } from "@/lib/blockchain";
import { BlockCard } from "@/components/BlockCard";
import { ValidationIndicator } from "@/components/ValidationIndicator";
import { DifficultySelector } from "@/components/DifficultySelector";
import { MiningForm } from "@/components/MiningForm";

function getInitialBlocks(): BlockData[] {
  const genesis = new Block(0, Date.now(), "Genesis Block", "0");
  return [genesis.toJSON()];
}

export function BlockchainVisualizer() {
  const [blocks, setBlocks] = useState<BlockData[]>(getInitialBlocks);
  const [difficulty, setDifficulty] = useState(1);
  const [miningStatus, setMiningStatus] = useState<
    "idle" | "mining" | "mined"
  >("idle");
  const [miningTimeMs, setMiningTimeMs] = useState(0);

  const isValid = useMemo(() => isChainValidFromBlocks(blocks), [blocks]);

  const handleMine = useCallback(
    (data: string) => {
      setMiningStatus("mining");
      setMiningTimeMs(0);

      // Allow UI to paint "Mining..." before blocking on mineBlock
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
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Blockchain Visualizer
        </h1>
        <ValidationIndicator isValid={isValid} />
      </header>

      <main className="flex-1 space-y-6 p-6">
        <section className="flex flex-wrap items-center gap-4">
          <DifficultySelector
            value={difficulty}
            onChange={setDifficulty}
            disabled={miningStatus === "mining"}
          />
          <MiningForm
            onMine={handleMine}
            miningStatus={miningStatus}
            miningTimeMs={miningTimeMs}
            onResetStatus={() => setMiningStatus("idle")}
          />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Chain
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {blocks.map((block, i) => (
              <div key={block.hash} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    className="hidden shrink-0 text-zinc-300 dark:text-zinc-600 sm:inline"
                    aria-hidden
                  >
                    →
                  </span>
                )}
                <BlockCard
                  block={block}
                  previousHash={i > 0 ? blocks[i - 1].hash : null}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
