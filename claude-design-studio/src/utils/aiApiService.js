// AI API Service for NVIDIA NIM, Anthropic Claude, OpenAI, and OpenRouter

import { generateWebsiteFromPrompt } from './aiGenerator';

// Default JSON schema prompt instruction sent to LLMs
const JSON_SCHEMA_INSTRUCTION = `
Format your response as a JSON object with this exact structure:
{
  "name": "Brand Title — Category",
  "category": "Industry Name",
  "style": {
    "palette": "clay",
    "primaryColor": "#CC6B49",
    "accentColor": "#D97706",
    "bgColor": "#090D16",
    "cardBg": "#111726",
    "textColor": "#F8FAFC",
    "subtextColor": "#94A3B8",
    "borderColor": "#1E293B",
    "fontHeading": "'Instrument Serif', serif",
    "fontBody": "'Inter', sans-serif",
    "borderRadius": "rounded-2xl",
    "cardStyle": "bordered",
    "bgPattern": "mesh",
    "isDark": true
  },
  "content": {
    "nav": {
      "brandName": "BrandName",
      "brandTag": "ENTERPRISE",
      "links": ["Architecture", "Capabilities", "Pricing", "Docs"],
      "ctaText": "Deploy Now"
    },
    "hero": {
      "badge": "Pill Badge Text",
      "titlePrefix": "Prefix headline",
      "titleHighlight": "Highlight Word",
      "titleSuffix": "suffix words.",
      "subtitle": "Articulate description of the product and value proposition.",
      "primaryCta": "Get Started",
      "secondaryCta": "Explore Docs",
      "announcement": "Zero-data retention SLA guaranteed",
      "stats": [
        { "label": "Metric 1", "value": "99.99%" },
        { "label": "Metric 2", "value": "< 2ms" },
        { "label": "Metric 3", "value": "10M+" }
      ]
    },
    "logos": {
      "title": "TRUSTED BY PIONEERING TEAMS",
      "items": ["Linear", "Stripe", "Vercel", "Notion", "Scale AI"]
    },
    "bento": {
      "tag": "CAPABILITIES",
      "title": "Main Bento Title",
      "subtitle": "Bento Subtitle",
      "cards": [
        {
          "id": "b1",
          "colSpan": "col-span-12 md:col-span-8",
          "title": "Card 1 Title",
          "description": "Card 1 description",
          "badge": "Feature Badge",
          "interactiveType": "alignment-slider"
        },
        {
          "id": "b2",
          "colSpan": "col-span-12 md:col-span-4",
          "title": "Card 2 Title",
          "description": "Card 2 description",
          "badge": "Metric Badge",
          "interactiveType": "needle-graph"
        },
        {
          "id": "b3",
          "colSpan": "col-span-12 md:col-span-4",
          "title": "Card 3 Title",
          "description": "Card 3 description",
          "badge": "Accuracy",
          "interactiveType": "math-pill"
        },
        {
          "id": "b4",
          "colSpan": "col-span-12 md:col-span-8",
          "title": "Card 4 Title",
          "description": "Card 4 description",
          "badge": "Orchestrator",
          "interactiveType": "agent-flow"
        }
      ]
    },
    "interactiveDemo": {
      "tag": "LIVE PLAYGROUND",
      "title": "Interactive Playground Title",
      "subtitle": "Playground subtitle description",
      "demoPrompt": "Sample input prompt command...",
      "thoughtSteps": [
        { "step": "1. Ingest context and verify schema", "duration": "4ms" },
        { "step": "2. Execute graph traversal", "duration": "12ms" },
        { "step": "3. Synthesize deterministic output", "duration": "8ms" }
      ],
      "outputPreview": "Synthesized output text preview."
    },
    "featuresTab": {
      "tag": "INTEGRATION",
      "title": "Feature Code Title",
      "subtitle": "Feature subtitle",
      "tabs": [
        {
          "id": "sdk",
          "name": "TypeScript SDK",
          "heading": "Type-Safe Client",
          "description": "Initialize in 3 lines of code.",
          "codeSnippet": "import { createClient } from '@app/sdk';\\n\\nconst app = createClient({ apiKey: 'key' });"
        }
      ]
    },
    "metrics": {
      "tag": "SCALE",
      "title": "Operational Scale",
      "items": [
        { "number": "99.999%", "label": "Uptime SLA", "detail": "Multi-region failover" },
        { "number": "< 2ms", "label": "Latency", "detail": "Edge accelerated" },
        { "number": "100%", "label": "Data Isolation", "detail": "SOC2 certified" },
        { "number": "14B+", "label": "Tokens Processed", "detail": "Zero retention" }
      ]
    },
    "testimonials": {
      "tag": "WALL OF LOVE",
      "title": "Loved by builders worldwide",
      "subtitle": "See what leaders are saying",
      "items": [
        {
          "quote": "The design precision and performance are completely unmatched.",
          "author": "Elena Vance",
          "role": "VP of Architecture at Horizon",
          "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          "highlight": "Productivity up 300%",
          "rating": 5
        }
      ]
    },
    "pricing": {
      "tag": "PRICING",
      "title": "Predictable Volume Pricing",
      "subtitle": "Start free, scale with priority throughput.",
      "discountBadge": "Save 20% on Annual Billing",
      "plans": [
        {
          "name": "Developer",
          "priceMonthly": "$20",
          "priceYearly": "$16",
          "period": "/ seat / mo",
          "description": "For independent creators and indie squads.",
          "isPopular": false,
          "badge": "STARTER",
          "features": ["Full Core Platform Access", "200k Context Window", "Standard Support"],
          "cta": "Start 14-Day Free Trial"
        },
        {
          "name": "Pro Organization",
          "priceMonthly": "$49",
          "priceYearly": "$39",
          "period": "/ seat / mo",
          "description": "For fast-growing engineering teams.",
          "isPopular": true,
          "badge": "MOST POPULAR",
          "features": ["1,000,000 Token Context", "Sub-second Streaming", "Priority 24/7 Support", "Zero Data Retention"],
          "cta": "Unlock Pro Organization"
        },
        {
          "name": "Enterprise Matrix",
          "priceMonthly": "Custom",
          "priceYearly": "Custom",
          "period": "annual contract",
          "description": "For global enterprises with dedicated VPC.",
          "isPopular": false,
          "badge": "ENTERPRISE",
          "features": ["Dedicated GPU Compute", "99.999% SLA", "Custom Weights"],
          "cta": "Contact Sales"
        }
      ]
    },
    "faq": {
      "tag": "FAQS",
      "title": "Frequently Asked Questions",
      "items": [
        { "q": "How does integration work?", "a": "Drop in our SDK in less than 5 minutes." },
        { "q": "Is data stored for training?", "a": "Never. All data is protected by strict zero-retention policies." }
      ]
    },
    "cta": {
      "title": "Experience the next standard in intelligent software.",
      "subtitle": "Join thousands of builders shaping the future.",
      "primaryButton": "Get Started for Free",
      "secondaryButton": "Schedule Architecture Demo",
      "badge": "Instant setup • No card required"
    },
    "footer": {
      "brandName": "BrandName Systems",
      "description": "High-performance software crafted with intellectual clarity.",
      "columns": [
        { "title": "Platform", "links": ["Overview", "Architecture", "Pricing"] },
        { "title": "Developers", "links": ["Documentation", "API Reference", "Status"] }
      ],
      "copyright": "© 2026 BrandName Technologies, Inc. All rights reserved."
    }
  }
}
`;

export async function callAiApi({
  userPrompt,
  systemPrompt,
  apiConfig,
  onStatusUpdate,
}) {
  const { provider, apiKey, model, temperature, maxTokens, customBaseUrl } = apiConfig;

  // If no API key provided, fall back seamlessly to local AI engine
  if (!apiKey || apiKey.trim() === '') {
    if (onStatusUpdate) onStatusUpdate('Using built-in Smart Local AI Generator (No API key set)...');
    await new Promise((resolve) => setTimeout(resolve, 600));
    return generateWebsiteFromPrompt(userPrompt);
  }

  const promptWithSchema = `User Website Request: "${userPrompt}"\n\n${JSON_SCHEMA_INSTRUCTION}`;

  try {
    let rawResponseText = '';

    // 1. NVIDIA NIM API Integration
    if (provider === 'nvidia') {
      const selectedModel = model || 'nvidia/llama-3.1-nemotron-70b-instruct';
      if (onStatusUpdate) onStatusUpdate(`Connecting to NVIDIA NIM Microservice (${selectedModel})...`);

      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          temperature: temperature !== undefined ? temperature : 0.6,
          max_tokens: maxTokens || 4000,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: promptWithSchema },
          ],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || errData.message || `NVIDIA NIM API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      rawResponseText = data.choices?.[0]?.message?.content || '';
    } else if (provider === 'anthropic') {
      if (onStatusUpdate) onStatusUpdate(`Connecting to Anthropic Claude (${model || 'claude-3-5-sonnet-20241022'})...`);
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim(),
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: model || 'claude-3-5-sonnet-20241022',
          max_tokens: maxTokens || 4000,
          temperature: temperature !== undefined ? temperature : 0.7,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: promptWithSchema,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Anthropic API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      rawResponseText = data.content?.[0]?.text || '';
    } else if (provider === 'openai' || provider === 'openrouter' || provider === 'custom') {
      const endpoint = provider === 'openrouter' 
        ? 'https://openrouter.ai/api/v1/chat/completions'
        : provider === 'custom' && customBaseUrl
        ? `${customBaseUrl.replace(/\/+$/, '')}/chat/completions`
        : 'https://api.openai.com/v1/chat/completions';

      const selectedModel = model || (provider === 'openai' ? 'gpt-4o' : 'anthropic/claude-3.5-sonnet');

      if (onStatusUpdate) onStatusUpdate(`Connecting to ${provider.toUpperCase()} (${selectedModel})...`);

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
      };

      if (provider === 'openrouter') {
        headers['HTTP-Referer'] = window.location.origin;
        headers['X-Title'] = 'ClaudeDesign Studio';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: selectedModel,
          temperature: temperature !== undefined ? temperature : 0.7,
          max_tokens: maxTokens || 4000,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: promptWithSchema },
          ],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `${provider.toUpperCase()} API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      rawResponseText = data.choices?.[0]?.message?.content || '';
    }

    if (onStatusUpdate) onStatusUpdate('Parsing design tokens & architecture from AI model...');

    // Extract JSON from response (handles cases where model wrapped in ```json ... ```)
    const jsonMatch = rawResponseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI response did not contain a valid JSON object. Falling back to local synthesis.');
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    // Ensure required properties
    const customTemplate = {
      id: 'ai-gen-' + Date.now(),
      name: parsedData.name || 'NVIDIA NIM Design',
      tagline: `Synthesized via ${provider === 'nvidia' ? 'NVIDIA NIM' : provider.toUpperCase()} for "${userPrompt.slice(0, 40)}..."`,
      category: parsedData.category || 'AI Generated',
      style: {
        palette: parsedData.style?.palette || 'clay',
        primaryColor: parsedData.style?.primaryColor || '#CC6B49',
        accentColor: parsedData.style?.accentColor || '#D97706',
        bgColor: parsedData.style?.bgColor || '#090D16',
        cardBg: parsedData.style?.cardBg || '#111726',
        textColor: parsedData.style?.textColor || '#F8FAFC',
        subtextColor: parsedData.style?.subtextColor || '#94A3B8',
        borderColor: parsedData.style?.borderColor || '#1E293B',
        fontHeading: parsedData.style?.fontHeading || "'Instrument Serif', serif",
        fontBody: parsedData.style?.fontBody || "'Inter', sans-serif",
        borderRadius: parsedData.style?.borderRadius || 'rounded-2xl',
        cardStyle: parsedData.style?.cardStyle || 'bordered',
        bgPattern: parsedData.style?.bgPattern || 'mesh',
        isDark: parsedData.style?.isDark !== undefined ? parsedData.style.isDark : true,
      },
      content: parsedData.content,
    };

    return customTemplate;
  } catch (error) {
    console.error('AI API call failed:', error);
    if (onStatusUpdate) onStatusUpdate(`API warning: ${error.message}. Using high-fidelity smart fallback.`);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return generateWebsiteFromPrompt(userPrompt);
  }
}

export async function testApiConnection(apiConfig) {
  const { provider, apiKey, model, customBaseUrl } = apiConfig;

  if (!apiKey || apiKey.trim() === '') {
    return { success: false, message: 'API key cannot be empty.' };
  }

  try {
    if (provider === 'nvidia') {
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          model: model || 'nvidia/llama-3.1-nemotron-70b-instruct',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Ping' }],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return { success: false, message: err.detail || err.message || `HTTP ${response.status}` };
      }

      return { success: true, message: 'NVIDIA NIM API connected successfully! Accelerated on NVIDIA H100 Tensor Core GPUs.' };
    } else if (provider === 'anthropic') {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim(),
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: model || 'claude-3-5-haiku-20241022',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Ping' }],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return { success: false, message: err.error?.message || `HTTP ${response.status}` };
      }

      return { success: true, message: 'Anthropic Claude API connected successfully!' };
    } else {
      const endpoint = provider === 'openrouter'
        ? 'https://openrouter.ai/api/v1/chat/completions'
        : provider === 'custom' && customBaseUrl
        ? `${customBaseUrl.replace(/\/+$/, '')}/chat/completions`
        : 'https://api.openai.com/v1/chat/completions';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: model || (provider === 'openai' ? 'gpt-4o-mini' : 'anthropic/claude-3.5-haiku'),
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Ping' }],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return { success: false, message: err.error?.message || `HTTP ${response.status}` };
      }

      return { success: true, message: `${provider.toUpperCase()} API connected successfully!` };
    }
  } catch (err) {
    return { success: false, message: err.message || 'Connection failed.' };
  }
}
