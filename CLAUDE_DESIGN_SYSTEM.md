# ClaudeDesign Studio — NVIDIA NIM, Claude Design System & Multi-Page Suite

**ClaudeDesign Studio** is an AI web design engine and full-stack application suite accelerated by **NVIDIA NIM Microservices (H100 Tensor Core GPUs)**, **Anthropic Claude**, and the **Model Context Protocol (MCP)**.

---

## 🚀 1. Powered by NVIDIA NIM (Best Design Models)

Users can paste their NVIDIA API Key (`nvapi-...`) directly in the app to unlock NVIDIA's flagship reasoning and design models:

| NVIDIA NIM Model | Specialization | Performance |
|---|---|---|
| **`nvidia/llama-3.1-nemotron-70b-instruct`** | **Flagship Design & Reasoning** (Tuned for structured JSON & UI code) | Sub-5ms TTFT |
| **`deepseek-ai/deepseek-r1`** | **Deep Architectural Reasoning & Logic Verification** | Complex Layouts |
| **`meta/llama-3.3-70b-instruct`** | **Ultra-Fast Generation (200+ tok/s)** | High-Velocity |
| **`meta/llama-3.1-405b-instruct`** | **Frontier Giant (405 Billion Parameters)** | Maximum Quality |
| **`qwen/qwen2.5-72b-instruct`** | **Frontend Code Specialist** | Tailwind CSS Master |

### How to Use NVIDIA NIM in ClaudeDesign Studio:
1. Get a free API key with 1,000 free inference credits from [build.nvidia.com](https://build.nvidia.com).
2. Paste your `nvapi-...` key directly in the sidebar or click **"API Settings"**.
3. Type any website concept and click **"Generate 10/10 Website"** to synthesize your design using NVIDIA H100 microservices!

---

## 🌐 2. Multi-Page Full-Stack Suite

Switch between 7 cohesive Claude-aesthetic pages:
1. **🏠 Landing Page**: Hero, 12-column Asymmetrical Bento Grid, Live Sandbox, Pricing, FAQs, Footer.
2. **📊 Agent Dashboard**: Real-time cluster throughput (**48,210 TPS**), edge latency (**1.84ms**), live agent thought traces.
3. **📖 Docs & API**: Multi-column developer documentation portal with **TypeScript**, **Python**, and **cURL** code tabs.
4. **🧮 Pricing Calculator**: Interactive volume & concurrency sliders with a **75% prompt caching discount**.
5. **📜 Research & Safety**: Anthropic-inspired safety research papers and downloadable PDF whitepapers.
6. **⚙️ Settings**: Private VPC peering, Zero-Data Retention (ZDR) status, and webhook configurations.
7. **🔐 Auth Portal**: Minimalist sign-in and sign-up with Magic Link auth and SOC2 security verification.

---

## ⚡ 3. Express Backend Server (`server.js`) & MCP Server

* **`server.js`**: Full-stack Express.js REST API with live telemetry metrics and MCP JSON-RPC gateway.
* **`claude-design-mcp-server.js`**: Standalone Model Context Protocol server for Claude Desktop and Claude Code.
* **`claude_desktop_config.json`**: 1-click configuration to connect Claude Desktop directly to ClaudeDesign Studio.
