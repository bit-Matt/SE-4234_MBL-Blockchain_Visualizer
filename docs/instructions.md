# Overview

Build a web application that visualizes how blockchain works. Users should be able to see blocks, mine new blocks, and watch validation happen in real-time.


# What You'll Build

A blockchain visualizer that demonstrates:
- How blocks link together through hashes
- How mining works (proof-of-work)
- How tampering breaks the chain
- How validation detects problems


# Core Requirements

1. Display the Blockchain
Show each block as a card with:
- Block number (0, 1, 2, 3...)
- Timestamp (when block was created)
- Data (e.g., "Alice pays Bob 10")
- Previous hash (first 10 characters + ...)
- Nonce (the number found during mining)
- Hash (first 10 characters + ...)

**Visual linking:** Show how each block's "Previous Hash" matches the previous block's "Hash" (use color coding or arrows).

2. Mining Feature
**Input field**: Text input for block data

**Mine button**: Clicking starts the mining process

**Mining process**:
- Show "Mining..." message or display a spinner during mining
- Find a nonce such that the hash starts with the required number of zeros (according to difficulty)
- Display the mining time (e.g., "Mined in 45ms")
- Add the newly mined block to the blockchain

3. Validation Indicator
**Display**: Large, clear indicator showing:
- "Chain Valid" (green) when blockchain is valid
- "Chain Invalid" (red) when blockchain is broken

**Updates automatically** whenever:
- A new block is added
- A block is edited

4. Difficulty Selector
**Dropdown or buttons**: Choose difficulty 1, 2, 3, or 4
- Difficulty = number of leading zeros required in hash
- Example: Difficulty 3 = hash must start with "000"


# Bonus Features (Optional)
## Tampering Demo
- Add an "Edit" button on each block
- Allow users to change block data directly without requiring mining
- Visually indicate a broken chain by displaying a red border on the tampered block

## Auto-Mine Feature
Button to automatically mine multiple blocks at once
Shows mining progress for each block

## Transaction Ledger View
- Simple list of all block data in order
- Example: "Block 1: Alice pays Bob 10"


# Technical Requirements
## Frontend Stack (Choose One)
- Vanilla: HTML + CSS + JavaScript
- Framework: React, Vue, or Svelte
- Build tool: Vite, Create React App, or plain files


## Blockchain Logic
Reuse the concepts from class:
- SHA-256 hashing (use crypto-js library for browser)
- Block class (with calculateHash, mine methods)
- Blockchain class (with isValid method)
- Mining = find nonce where hash starts with N zeros


## No Backend Required
Implement everything in the browser using JavaScript's crypto libraries.

**Recommended library**: `crypto-js` for SHA-256 in the browser

`npm install crypto-js`


# Submission Requirements
1. GitHub Repository
Create a repo named: `blockchain-visualizer` or `blockchain-demo`

**Include**:
- Source code with clear folder structure
- README.md with:
  - Project title and description
  - How to run locally (`npm install` + `npm run dev` or "open index.html")
  - Screenshot or GIF of your app in action
  - (Optional) Link to live demo
- Clean, commented code

2. Make it Public
Ensure your repo is public so we can review it.

3. What to Submit
**Required**:
- GitHub repository link

Optional but recommended:
- Live demo URL (GitHub Pages, Vercel, Netlify)


# Grading Rubric
"Feature" = "Points"
Chain display (all 6 required fields) =	20
Mining functionality with visual feedback =	20
Validation indicator (updates correctly) = 15
Difficulty selector (1-4) = 10
Clean UI and user experience = 15
Code quality and structure = 10
README with instructions & screenshot =	10
Bonus features (optional) =	+5 extra
Tota = 100


# Starter Code Hint

## Block Class
```
import SHA256 from 'crypto-js/sha256';

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      this.data +
      this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    const target = Array(difficulty + 1).join('0');
    
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    
    console.log('Block mined: ' + this.hash);
  }
}
```

### Blockchain Class
```
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      data,
      this.getLatestBlock().hash
    );
    
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check if current block's hash is valid
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Check if blocks are properly linked
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
```

# Resources

**Libraries**:
1. crypto-js - SHA-256 for browser
2. React - If using React
3. Tailwind CSS - For styling (optional)

**Deployment**:
1. VercelLinks to an external site. - Easy deployment for React/Vue
