# Contributing to Anthra Studio

Thank you for your interest in contributing to **Anthra Studio**! As an open-source project, we welcome contributions from designers, frontend architects, and AI engineers worldwide.

---

## 🛠️ Development Setup

1. **Fork & Clone**:
   ```bash
   git clone https://github.com/your-username/claude-design-studio.git
   cd claude-design-studio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Start the Express Backend & MCP Gateway**:
   ```bash
   node server.js
   ```

---

## 🎨 Design Guidelines (The Claude Aesthetic)

All contributions to UI components, bento cards, and themes must adhere to our core design principles:

1. **Color Palette**:
   - Backgrounds: Warm creamy paper (`#FAF8F5`) or Obsidian slate (`#090D16`).
   - Accents: Terracotta (`#CC6B49`), Amber Clay (`#D97706`), or Luminous Indigo (`#6366F1`).
   - Hairline Borders: 1px subtle borders (`border-neutral-200/80` or `border-white/10`).
2. **Typography**:
   - Headings: `Instrument Serif` or `Playfair Display` with italicized accent words.
   - Body: `Inter` or `Plus Jakarta Sans`.
   - Telemetry & Badges: `JetBrains Mono`.
3. **Bento Grids**:
   - 12-column asymmetrical layouts with tactile micro-interactions (sliders, gauges, thought-trace tickers).
4. **Copywriting**:
   - Articulate, intellectual, high-signal, zero robotic SaaS fluff.

---

## 🧪 Testing & Quality Assurance

Before submitting a Pull Request:
```bash
# Verify build succeeds with zero errors
npm run build

# Verify MCP Server responds on stdio
node claude-design-mcp-server.js
```

---

## 📄 License

By contributing to Anthra Studio, you agree that your contributions will be licensed under the **Apache License 2.0**.
