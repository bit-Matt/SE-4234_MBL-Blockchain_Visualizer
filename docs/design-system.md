# Blockchain Visualizer: Design System

## Core Aesthetic
* **Style**: Simple, modern, and tech-focused.
* **Inspiration**: Material Design 3 (Material You) mixed with modern SaaS dashboard elements.
* **Theme**: Dark Mode (Default) with a Light Mode toggle option.

---

## 🎨 Color Palette

### Dark Mode (Pro)
* **Surface (Background)**: `#0F0F12` (Deep Black/Grey).
* **Container (Card)**: `#1C1B22` (Slightly lighter than background).
* **Primary (Violet)**: `#9D50FF` (Vibrant Violet for buttons, accents, and active states).
* **Success (Valid)**: `#00E676` (Neon Green for valid chains).
* **Error (Invalid)**: `#FF5252` (Vivid Red for broken hashes/tampering).
* **Text**: Primary `#FFFFFF`, Secondary `#B3B3B3`.

### Light Mode (Clean)
* **Surface (Background)**: `#F8F9FF` (Soft Blue-White).
* **Container (Card)**: `#FFFFFF` (Pure white).
* **Primary (Violet)**: `#6200EE` (Deep Material Violet).
* **Success (Valid)**: `#2E7D32` (Deep Forest Green).
* **Error (Invalid)**: `#D32F2F` (Deep Crimson).
* **Text**: Primary `#1C1B22`, Secondary `#666666`.

---

## 🧱 Component Specifications

### 1. Block Cards
* **Border Radius**: `16px` (Material 3 standard).
* **Elevation**: Subtle shadows or a `1px` border with `rgba(255, 255, 255, 0.1)` (Dark) or `rgba(0, 0, 0, 0.1)` (Light).
* **Mining State**: Apply a pulsing Violet gradient border animation during the mining process.
* **Tamper State**: Apply a solid Red border if the block's hash is invalid.

### 2. Typography
* **UI Text**: *Inter* or *Roboto* (San-serif).
* **Technical Text**: *JetBrains Mono* or *Source Code Pro* for Hashes, Nonces, and Data to ensure alignment and readability.

### 3. Visual Links
* **The Chain**: Use a thick Violet line between block cards to represent the cryptographic link.
* **Highlighting**: When hovering over a "Hash", the "Previous Hash" in the following block should glow in Violet.

---

## 📐 Layout Logic
* **Navigation**: Top bar containing the Title, Difficulty Selector (Dropdown), and a large "Chain Valid" indicator.
* **Input**: A prominent text input for data with a Solid Violet "Mine Block" button.
* **Scrolling**: Horizontal scrolling container for the chain of blocks to maintain a linear timeline.

---

## 💻 CSS Variables Implementation

```css
:root {
  --primary-violet: #9D50FF;
  --success-green: #00E676;
  --error-red: #FF5252;
  
  /* Defaults to Dark Mode */
  --bg-color: #0F0F12;
  --card-bg: #1C1B22;
  --text-primary: #FFFFFF;
  --text-secondary: #B3B3B3;
  --border-ui: rgba(255, 255, 255, 0.1);
}

[data-theme='light'] {
  --bg-color: #F8F9FF;
  --card-bg: #FFFFFF;
  --text-primary: #1C1B22;
  --text-secondary: #666666;
  --border-ui: rgba(0, 0, 0, 0.1);
}