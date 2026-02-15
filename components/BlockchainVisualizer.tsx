"use client";

import { useCallback, useMemo, useState } from "react";
import { Block, type BlockData, isChainValidFromBlocks, isBlockHashValid, getBlockValidationError } from "@/lib/blockchain";
import { BlockCard } from "@/components/BlockCard";
import { ValidationIndicator } from "@/components/ValidationIndicator";
import { DifficultySelector } from "@/components/DifficultySelector";
import { MiningForm } from "@/components/MiningForm";
import { AutoMineForm } from "@/components/AutoMineForm";
import { TransactionLedger } from "@/components/TransactionLedger";
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
  const [isAutoMining, setIsAutoMining] = useState(false);
  const [autoMineProgress, setAutoMineProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);

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

  const handleEditBlock = useCallback(
    (index: number, updates: Partial<BlockData>) => {
      setBlocks((prev) =>
        prev.map((b, i) =>
          i === index ? { ...b, ...updates } : b
        )
      );
    },
    []
  );

  const handleAutoMine = useCallback(
    (count: number) => {
      setIsAutoMining(true);
      setAutoMineProgress({ current: 0, total: count });

      const mineNext = (remaining: number, currentBlocks: BlockData[]) => {
        if (remaining === 0) {
          setIsAutoMining(false);
          setAutoMineProgress(null);
          return;
        }

        setTimeout(() => {
          const latest = currentBlocks[currentBlocks.length - 1];
          const newBlock = new Block(
            currentBlocks.length,
            Date.now(),
            `Auto-mined block ${count - remaining + 1}`,
            latest.hash
          );
          newBlock.mineBlock(difficulty);

          const updated = [...currentBlocks, newBlock.toJSON()];
          setBlocks(updated);
          setAutoMineProgress({ current: count - remaining + 1, total: count });
          mineNext(remaining - 1, updated);
        }, 10);
      };

      mineNext(count, blocks);
    },
    [blocks, difficulty]
  );

  const handleResetChain = useCallback(() => {
    setBlocks(getInitialBlocks());
    setMiningStatus("idle");
    setMiningTimeMs(0);
    setIsAutoMining(false);
    setAutoMineProgress(null);
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-primary)" }}
    >
      {/* Top bar: Centered title, Theme toggle at right */}
      <header
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4"
        style={{ backgroundColor: "var(--primary-violet)", color: "#ffffff" }}
      >
        <div />
        <h1 className="text-xl font-semibold text-white">
          Blockchain Visualizer
        </h1>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-6 sm:px-6">
        <div className="flex w-full max-w-6xl flex-1 flex-col gap-6">
          {/* Controls row: Difficulty, Block data input, and Auto-mine */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              className="rounded-2xl border p-4"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-ui)",
              }}
            >
              <DifficultySelector
                value={difficulty}
                onChange={setDifficulty}
                disabled={miningStatus === "mining"}
              />
            </div>
            <div
              className="rounded-2xl border p-4"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-ui)",
              }}
            >
              <MiningForm
                onMine={handleMine}
                miningStatus={miningStatus}
                miningTimeMs={miningTimeMs}
                onResetStatus={() => setMiningStatus("idle")}
              />
            </div>
            <div
              className="rounded-2xl border p-4"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-ui)",
              }}
            >
              <AutoMineForm
                onAutoMine={handleAutoMine}
                isAutoMining={isAutoMining}
                progress={autoMineProgress ?? undefined}
              />
            </div>
          </section>

          {/* Chain Valid row */}
          <section className="flex flex-wrap items-center gap-4">
            <ValidationIndicator isValid={isValid} />
            <button
              type="button"
              onClick={handleResetChain}
              className="rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ 
                backgroundColor: "var(--error-red)",
                color: "#ffffff"
              }}
            >
              Reset Chain
            </button>
          </section>

          {/* Transaction Ledger */}
          <section>
            <TransactionLedger blocks={blocks} />
          </section>

          {/* Grid layout for blockchain - max 3 per row */}
          <section className="pb-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block, i) => (
              <BlockCard
                key={block.hash}
                block={block}
                previousHash={i > 0 ? blocks[i - 1].hash : null}
                isMining={miningStatus === "mining" && i === blocks.length - 1}
                isInvalid={!isBlockHashValid(block)}
                validationError={getBlockValidationError(block, i > 0 ? blocks[i - 1] : null)}
                highlightPreviousHash={hoveredHashBlockIndex === i - 1}
                onHashHover={(hovering) =>
                  setHoveredHashBlockIndex(hovering ? i : null)
                }
                onEdit={(updates) => handleEditBlock(i, updates)}
              />
            ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
