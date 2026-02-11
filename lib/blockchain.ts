import SHA256 from "crypto-js/sha256";

/** Serializable block shape for React state */
export interface BlockData {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  nonce: number;
  hash: string;
}

export class Block implements BlockData {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  nonce: number;
  hash: string;

  constructor(
    index: number,
    timestamp: number,
    data: string,
    previousHash = ""
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        this.data +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join("0");

    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  /** Return a plain object for React state */
  toJSON(): BlockData {
    return {
      index: this.index,
      timestamp: this.timestamp,
      data: this.data,
      previousHash: this.previousHash,
      nonce: this.nonce,
      hash: this.hash,
    };
  }
}

export class Blockchain {
  chain: Block[];
  difficulty: number;

  constructor(difficulty = 2) {
    this.difficulty = difficulty;
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: string): Block {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      data,
      this.getLatestBlock().hash
    );

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

function calculateHashFromData(block: BlockData): string {
  return SHA256(
    block.index +
      block.previousHash +
      block.timestamp +
      block.data +
      block.nonce
  ).toString();
}

/** Validate an array of block data (e.g. from React state) without Block instances */
export function isChainValidFromBlocks(blocks: BlockData[]): boolean {
  if (blocks.length === 0) return true;

  for (let i = 0; i < blocks.length; i++) {
    const current = blocks[i];
    if (calculateHashFromData(current) !== current.hash) return false;
    if (i > 0 && current.previousHash !== blocks[i - 1].hash) return false;
  }
  return true;
}
