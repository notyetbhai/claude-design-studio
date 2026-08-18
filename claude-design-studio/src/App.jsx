import React, { useState, useEffect } from 'react';
import { TEMPLATES } from './data/templates';
import { COLOR_PALETTES, FONT_PAIRINGS, BG_PATTERNS } from './data/designStyles';
import { SYSTEM_PROMPT_PRESETS } from './data/systemPromptPresets';
import { callAiApi } from './utils/aiApiService';
import { generateFullHTML } from './utils/codeGenerator';

import StudioNavbar from './components/Navbar';
import StudioSidebar from './components/Sidebar';
import ClaudeChatPanel from './components/ClaudeChatPanel';
import Canvas from './components/Canvas';
import LiveCodeEditor from './components/LiveCodeEditor';

import ExportModal from './components/ExportModal';
import ClaudePromptModal from './components/ClaudePromptModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import McpStudioModal from './components/McpStudioModal';
import CommandPaletteModal from './components/CommandPaletteModal';
import CloudDeployModal from './components/CloudDeployModal';

import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  X, 
  Eye, 
  Code2, 
  Columns, 
  MessageSquare, 
  SlidersHorizontal,
  Layers,
  Zap,
  Play
} from 'lucide-react';

export default function App() {
  const [templateList, setTemplateList] = useState(TEMPLATES);
  const [currentTemplateId, setCurrentTemplateId] = useState(TEMPLATES[0].id);

  // Find active template
  const currentTemplate = templateList.find((t) => t.id === currentTemplateId) || templateList[0];

  // Design tokens & styling configuration state
  const [config, setConfig] = useState({
    palette: currentTemplate.style.palette || 'clay',
    primaryColor: currentTemplate.style.primaryColor,
    accentColor: currentTemplate.style.accentColor,
    bgColor: currentTemplate.style.bgColor,
    cardBg: currentTemplate.style.cardBg,
    textColor: currentTemplate.style.textColor,
    subtextColor: currentTemplate.style.subtextColor,
    borderColor: currentTemplate.style.borderColor,
    fontHeading: currentTemplate.style.fontHeading,
    fontBody: currentTemplate.style.fontBody,
    borderRadius: currentTemplate.style.borderRadius,
    cardStyle: currentTemplate.style.cardStyle,
    bgPattern: currentTemplate.style.bgPattern,
    isDark: currentTemplate.style.isDark,
  });

  // Main Workspace Mode: 'preview' | 'code' | 'split'
  const [workspaceMode, setWorkspaceMode] = useState('preview');

  // Left Sidebar Mode: 'chat' (Claude AI Co-Pilot) | 'studio' (Manual Controls & Presets)
  const [sidebarMode, setSidebarMode] = useState('chat');

  // Responsive device view: 'desktop' | 'tablet' | 'mobile'
  const [viewport, setViewport] = useState('desktop');

  // Authentication & Onboarding state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Alex Vance',
    email: 'alex.vance@enterprise.com',
    role: 'Lead AI Architect',
    org: 'Anthra Autonomous Systems',
  });

  // Active Multi-Page View: 'home' | 'features' | 'components' | 'planner' | 'playground' | 'dashboard' | 'docs' | 'pricing' | 'research' | 'settings' | 'auth' | 'signup' | 'api-onboarding'
  const [currentPage, setCurrentPage] = useState('home');

  // Active sidebar navigation tab: 'generator' | 'prompt' | 'style' | 'sections' | 'editor' | 'audit'
  const [activeSidebarTab, setActiveSidebarTab] = useState('generator');

  // Section visibility controls
  const [sectionVisibility, setSectionVisibility] = useState({
    nav: true,
    hero: true,
    logos: true,
    bento: true,
    playground: true,
    featuresTab: true,
    metrics: true,
    testimonials: true,
    pricing: true,
    faq: true,
    cta: true,
    footer: true,
  });

  // System Prompt State
  const [activeSystemPromptPresetId, setActiveSystemPromptPresetId] = useState(SYSTEM_PROMPT_PRESETS[0].id);
  const [currentSystemPrompt, setCurrentSystemPrompt] = useState(SYSTEM_PROMPT_PRESETS[0].prompt);

  // AI API Configuration state (persisted in localStorage, defaulting to NVIDIA NIM)
  const [apiConfig, setApiConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('claude_design_api_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      provider: 'nvidia',
      apiKey: '',
      model: 'nvidia/llama-3.1-nemotron-70b-instruct',
      temperature: 0.6,
      maxTokens: 4000,
      customBaseUrl: '',
    };
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  // Generation status state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatusText, setGenerationStatusText] = useState('');

  // Modals
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPromptGuideOpen, setIsPromptGuideOpen] = useState(false);
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);
  const [isMcpStudioOpen, setIsMcpStudioOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // Live code string
  const [liveHtmlCode, setLiveHtmlCode] = useState(() => generateFullHTML(currentTemplate, config));

  useEffect(() => {
    setLiveHtmlCode(generateFullHTML(currentTemplate, config));
  }, [currentTemplate, config]);

  // Global Keyboard Shortcuts (⌘K, Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Login Success -> Move to Step 2: API Onboarding
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setCurrentPage('api-onboarding');
    showToast(`Welcome back, ${userData.name}! Connect your AI engine.`);
  };

  // Handle Signup Success -> Move to Step 2: API Onboarding
  const handleSignupSuccess = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setCurrentPage('api-onboarding');
    showToast(`Account created for ${userData.name}! Connect your AI engine.`);
  };

  // Handle API Key Connected -> Move to Step 3: Autonomous Planner & Dashboard
  const handleApiConnected = (newApiConfig) => {
    setApiConfig(newApiConfig);
    setCurrentPage('planner');
    showToast(`AI Engine connected successfully (${newApiConfig.provider.toUpperCase()})!`);
  };

  // Handle Apply Planned System from Autonomous Planner
  const handleApplyPlannedSystem = (goalText) => {
    handleGeneratePrompt(goalText);
    setCurrentPage('dashboard');
    showToast('Autonomous system plan applied to multi-page suite!');
  };

  // When switching templates, sync style configs
  const handleSelectTemplate = (id) => {
    const found = templateList.find((t) => t.id === id);
    if (found) {
      setCurrentTemplateId(id);
      setConfig({
        ...found.style,
      });
      showToast(`Loaded "${found.name}" template.`);
    }
  };

  // AI Generation with API + System Prompt
  const handleGeneratePrompt = async (promptText) => {
    setIsGenerating(true);
    setGenerationStatusText('Claude is synthesizing website code & bento layout...');

    try {
      const newTemplate = await callAiApi({
        userPrompt: promptText,
        systemPrompt: currentSystemPrompt,
        apiConfig,
        onStatusUpdate: (status) => setGenerationStatusText(status),
      });

      setTemplateList((prev) => [newTemplate, ...prev]);
      setCurrentTemplateId(newTemplate.id);
      setConfig({
        ...newTemplate.style,
      });

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.25 },
        colors: ['#D97706', '#CC6B49', '#6366F1', '#10B981'],
      });

      showToast(`Generated: "${newTemplate.name}"!`);
    } catch (err) {
      console.error('Generation error:', err);
      showToast('Generation completed with smart fallback.', 'info');
    } finally {
      setIsGenerating(false);
      setGenerationStatusText('');
    }
  };

  // Magic Aesthetic Shuffle
  const handleShuffleAesthetic = () => {
    const randomPalette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    const randomFont = FONT_PAIRINGS[Math.floor(Math.random() * FONT_PAIRINGS.length)];
    const randomBg = BG_PATTERNS[Math.floor(Math.random() * BG_PATTERNS.length)];

    setConfig((prev) => ({
      ...prev,
      palette: randomPalette.id,
      primaryColor: randomPalette.primary,
      accentColor: randomPalette.accent,
      fontHeading: randomFont.heading,
      fontBody: randomFont.body,
      bgPattern: randomBg.id,
    }));

    showToast(`Shuffled: ${randomPalette.name} + ${randomFont.name}`);
  };

  // 1-Click Auto-Polish Harmonies
  const handleAutoPolish = () => {
    setConfig((prev) => ({
      ...prev,
      borderRadius: 'rounded-2xl',
      bgPattern: 'mesh',
      cardStyle: 'glass',
    }));
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.5 },
    });
    showToast('Applied 10/10 Claude Design Harmonies & Balance!');
  };

  // Update content strings in active template
  const handleUpdateContent = (path, value) => {
    const keys = path.split('.');
    setTemplateList((prevList) =>
      prevList.map((tpl) => {
        if (tpl.id !== currentTemplateId) return tpl;

        const updatedContent = JSON.parse(JSON.stringify(tpl.content));
        if (keys.length === 2) {
          if (!updatedContent[keys[0]]) updatedContent[keys[0]] = {};
          updatedContent[keys[0]][keys[1]] = value;
        } else if (keys.length === 1) {
          updatedContent[keys[0]] = value;
        }

        return {
          ...tpl,
          content: updatedContent,
        };
      })
    );
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#07080c] text-[#f3f4f6] overflow-hidden font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="p-3.5 px-4 rounded-2xl bg-[#0f1422] border border-white/15 text-xs text-white shadow-2xl flex items-center gap-3 backdrop-blur-xl">
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="opacity-50 hover:opacity-100 ml-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Studio Navbar */}
      <StudioNavbar
        templates={templateList}
        currentTemplateId={currentTemplateId}
        onSelectTemplate={handleSelectTemplate}
        viewport={viewport}
        setViewport={setViewport}
        isDark={config.isDark}
        setIsDark={(val) => {
          setConfig((prev) => ({ ...prev, isDark: val }));
          showToast(`Canvas theme switched to ${val ? 'Dark' : 'Light'} Mode.`);
        }}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPromptGuide={() => setIsPromptGuideOpen(true)}
        onOpenApiSettings={() => setIsApiSettingsOpen(true)}
        onOpenMcpStudio={() => setIsMcpStudioOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenDeploy={() => setIsDeployModalOpen(true)}
        onShuffleAesthetic={handleShuffleAesthetic}
        activeSidebarTab={activeSidebarTab}
        setActiveSidebarTab={setActiveSidebarTab}
        apiConfig={apiConfig}
      />

      {/* Mode Sub-Bar: Left Panel Mode & Workspace View Mode */}
      <div className="h-10 border-b border-white/10 bg-[#090b12] px-4 flex items-center justify-between z-40 text-xs font-mono">
        {/* Left Side: Chat Co-Pilot vs Manual Controls Toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSidebarMode('chat')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              sidebarMode === 'chat'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Claude AI Co-Pilot</span>
          </button>

          <button
            onClick={() => setSidebarMode('studio')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              sidebarMode === 'studio'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Style & Tokens Studio</span>
          </button>
        </div>

        {/* Right Side: Preview vs Code vs Split View Toggle */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setWorkspaceMode('preview')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              workspaceMode === 'preview'
                ? 'bg-amber-500 text-white shadow-sm font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => setWorkspaceMode('split')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              workspaceMode === 'split'
                ? 'bg-amber-500 text-white shadow-sm font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>

          <button
            onClick={() => setWorkspaceMode('code')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              workspaceMode === 'code'
                ? 'bg-amber-500 text-white shadow-sm font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Editor</span>
          </button>
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side Panel: Either Claude AI Co-Pilot Chat or Style/Layout Controls */}
        {sidebarMode === 'chat' ? (
          <ClaudeChatPanel
            onSendMessage={handleGeneratePrompt}
            isGenerating={isGenerating}
            generationStatusText={generationStatusText}
            apiConfig={apiConfig}
            onOpenApiSettings={() => setIsApiSettingsOpen(true)}
            activeSystemPromptPresetId={activeSystemPromptPresetId}
            onSelectSystemPrompt={setActiveSystemPromptPresetId}
          />
        ) : (
          <StudioSidebar
            activeTab={activeSidebarTab}
            setActiveTab={setActiveSidebarTab}
            template={currentTemplate}
            config={config}
            setConfig={setConfig}
            onGeneratePrompt={handleGeneratePrompt}
            onUpdateContent={handleUpdateContent}
            sectionVisibility={sectionVisibility}
            setSectionVisibility={setSectionVisibility}
            onAutoPolish={handleAutoPolish}
            apiConfig={apiConfig}
            setApiConfig={setApiConfig}
            onOpenApiSettings={() => setIsApiSettingsOpen(true)}
            activeSystemPromptPresetId={activeSystemPromptPresetId}
            setActiveSystemPromptPresetId={setActiveSystemPromptPresetId}
            currentSystemPrompt={currentSystemPrompt}
            setCurrentSystemPrompt={setCurrentSystemPrompt}
            isGenerating={isGenerating}
            generationStatusText={generationStatusText}
          />
        )}

        {/* Right Side Workspace: Preview Mode, Code Mode, or Split View */}
        {workspaceMode === 'preview' && (
          <Canvas
            template={currentTemplate}
            config={config}
            viewport={viewport}
            sectionVisibility={sectionVisibility}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            apiConfig={apiConfig}
            setApiConfig={setApiConfig}
            onLoginSuccess={handleLoginSuccess}
            onSignupSuccess={handleSignupSuccess}
            onApiConnected={handleApiConnected}
            onApplyPlannedSystem={handleApplyPlannedSystem}
          />
        )}

        {workspaceMode === 'code' && (
          <div className="flex-1 p-4 bg-[#05070c] overflow-hidden">
            <LiveCodeEditor
              code={liveHtmlCode}
              onChange={(val) => setLiveHtmlCode(val)}
              language="html"
              config={config}
            />
          </div>
        )}

        {workspaceMode === 'split' && (
          <div className="flex-1 flex overflow-hidden">
            <div className="w-1/2 p-3 bg-[#05070c] border-r border-white/10 overflow-hidden">
              <LiveCodeEditor
                code={liveHtmlCode}
                onChange={(val) => setLiveHtmlCode(val)}
                language="html"
                config={config}
              />
            </div>
            <div className="w-1/2 flex overflow-hidden">
              <Canvas
                template={currentTemplate}
                config={config}
                viewport="desktop"
                sectionVisibility={sectionVisibility}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
                apiConfig={apiConfig}
                setApiConfig={setApiConfig}
                onLoginSuccess={handleLoginSuccess}
                onSignupSuccess={handleSignupSuccess}
                onApiConnected={handleApiConnected}
                onApplyPlannedSystem={handleApplyPlannedSystem}
              />
            </div>
          </div>
        )}
      </div>

      {/* Code Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        template={currentTemplate}
        config={config}
      />

      {/* Claude Master Prompt System Modal */}
      <ClaudePromptModal
        isOpen={isPromptGuideOpen}
        onClose={() => setIsPromptGuideOpen(false)}
      />

      {/* AI API Keys & Model Settings Modal */}
      <ApiSettingsModal
        isOpen={isApiSettingsOpen}
        onClose={() => setIsApiSettingsOpen(false)}
        apiConfig={apiConfig}
        setApiConfig={setApiConfig}
      />

      {/* Model Context Protocol (MCP) Studio Modal */}
      <McpStudioModal
        isOpen={isMcpStudioOpen}
        onClose={() => setIsMcpStudioOpen(false)}
        onApplyMcpDesign={(prompt) => handleGeneratePrompt(prompt)}
      />

      {/* Open-Source Command Palette (⌘K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(page) => {
          setCurrentPage(page);
          showToast(`Jumped to ${page.toUpperCase()} page.`);
        }}
        onOpenApiSettings={() => setIsApiSettingsOpen(true)}
        onOpenMcpStudio={() => setIsMcpStudioOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        isDark={config.isDark}
        setIsDark={(val) => setConfig((prev) => ({ ...prev, isDark: val }))}
        onShuffleAesthetic={handleShuffleAesthetic}
      />

      {/* 1-Click Cloud Deploy Modal */}
      <CloudDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </div>
  );
}
