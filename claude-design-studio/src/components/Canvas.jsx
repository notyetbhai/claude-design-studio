import React from 'react';
import NavbarSection from './sections/NavbarSection';
import FooterSection from './sections/FooterSection';

import HomePage from '../pages/HomePage';
import FeaturesPage from '../pages/FeaturesPage';
import PlaygroundPage from '../pages/PlaygroundPage';
import PricingPage from '../pages/PricingPage';
import DashboardPage from '../pages/DashboardPage';
import DocsPage from '../pages/DocsPage';
import ResearchPage from '../pages/ResearchPage';
import SettingsPage from '../pages/SettingsPage';
import AuthPage from '../pages/AuthPage';
import SignupPage from '../pages/SignupPage';
import ComponentsPage from '../pages/ComponentsPage';
import ApiOnboardingPage from '../pages/ApiOnboardingPage';
import AutonomousPlannerPage from '../pages/AutonomousPlannerPage';

export default function Canvas({
  template,
  config,
  viewport,
  currentPage,
  setCurrentPage,
  isAuthenticated,
  currentUser,
  apiConfig,
  setApiConfig,
  onLoginSuccess,
  onSignupSuccess,
  onApiConnected,
  onApplyPlannedSystem,
}) {
  const { content } = template;
  const isDark = config.isDark;

  const bg = isDark ? (config.bgColor || '#090D16') : '#FAF8F5';
  const text = isDark ? '#F8FAFC' : '#1F1D1A';
  const primary = config.primaryColor || '#CC6B49';

  const pages = [
    { id: 'home', label: '1. Home' },
    { id: 'features', label: '2. Features' },
    { id: 'components', label: '3. Components' },
    { id: 'planner', label: '4. AI Planner' },
    { id: 'dashboard', label: '5. Dashboard' },
    { id: 'playground', label: '6. Playground' },
    { id: 'docs', label: '7. Docs & API' },
    { id: 'pricing', label: '8. Pricing' },
    { id: 'research', label: '9. Research' },
    { id: 'settings', label: '10. Settings' },
    { id: 'auth', label: '11. Sign In' },
    { id: 'signup', label: '12. Sign Up' },
  ];

  const renderActivePage = () => {
    switch (currentPage) {
      case 'signup':
        return (
          <SignupPage
            config={config}
            template={template}
            onSignupSuccess={onSignupSuccess}
            onNavigate={setCurrentPage}
          />
        );
      case 'auth':
        return (
          <AuthPage
            config={config}
            template={template}
            onLoginSuccess={onLoginSuccess}
            onNavigate={setCurrentPage}
          />
        );
      case 'api-onboarding':
        return (
          <ApiOnboardingPage
            config={config}
            apiConfig={apiConfig}
            setApiConfig={setApiConfig}
            currentUser={currentUser}
            onApiConnected={onApiConnected}
          />
        );
      case 'planner':
        return (
          <AutonomousPlannerPage
            config={config}
            template={template}
            apiConfig={apiConfig}
            currentUser={currentUser}
            onApplyPlannedSystem={onApplyPlannedSystem}
            onNavigate={setCurrentPage}
          />
        );
      case 'features':
        return <FeaturesPage config={config} template={template} />;
      case 'components':
        return <ComponentsPage config={config} template={template} />;
      case 'playground':
        return <PlaygroundPage config={config} template={template} />;
      case 'dashboard':
        return <DashboardPage config={config} template={template} />;
      case 'docs':
        return <DocsPage config={config} />;
      case 'pricing':
        return <PricingPage config={config} template={template} />;
      case 'research':
        return <ResearchPage config={config} />;
      case 'settings':
        return <SettingsPage config={config} />;
      case 'home':
      default:
        return <HomePage config={config} template={template} onNavigate={setCurrentPage} />;
    }
  };

  const isIsolatedPage = currentPage === 'auth' || currentPage === 'signup' || currentPage === 'api-onboarding';

  const renderCanvasBody = () => (
    <div
      className={`min-h-screen transition-colors duration-300 relative overflow-x-hidden flex flex-col justify-between ${
        config.bgPattern === 'grid' ? 'bg-grid-pattern' : config.bgPattern === 'dots' ? 'bg-dots-pattern' : ''
      }`}
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: config.fontBody || "'Inter', sans-serif",
      }}
    >
      {/* Background Mesh Glow */}
      {config.bgPattern === 'mesh' && (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div
            className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[550px] rounded-full blur-[150px] opacity-25"
            style={{ backgroundColor: config.primaryColor }}
          />
          <div
            className="absolute top-1/2 -left-48 w-[600px] h-[500px] rounded-full blur-[160px] opacity-15"
            style={{ backgroundColor: config.accentColor }}
          />
        </div>
      )}

      {/* Persistent Universal Navbar */}
      {!isIsolatedPage && content.nav && (
        <NavbarSection
          nav={content.nav}
          config={config}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
        />
      )}

      {/* Main Active Page */}
      <div className="flex-1">
        {renderActivePage()}
      </div>

      {/* Persistent Universal Footer */}
      {!isIsolatedPage && content.footer && (
        <FooterSection
          footer={content.footer}
          config={config}
          onNavigate={setCurrentPage}
        />
      )}
    </div>
  );

  return (
    <main className="flex-1 bg-[#07080c] overflow-y-auto relative flex flex-col items-center">
      {/* Multi-Page Navigation Bar */}
      <div className="w-full bg-[#0a0c12]/95 backdrop-blur-md border-b border-white/10 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30 overflow-x-auto shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[11px] font-mono text-neutral-400 uppercase font-bold mr-1 hidden sm:inline">
            Active Page:
          </span>
          {pages.map((p) => {
            const isActive = currentPage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setCurrentPage(p.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                }`}
                style={{
                  backgroundColor: isActive ? primary : undefined,
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-emerald-400 hidden lg:flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>11 Standalone Dedicated Pages</span>
        </div>
      </div>

      {/* Viewport Frame Rendering */}
      <div className="w-full flex-1 p-0 sm:p-4 flex items-start justify-center">
        {viewport === 'desktop' && (
          <div className="w-full min-h-full shadow-2xl rounded-none sm:rounded-2xl overflow-hidden border-0 sm:border border-white/10">
            {renderCanvasBody()}
          </div>
        )}

        {viewport === 'tablet' && (
          <div className="w-[768px] my-6 shadow-2xl rounded-[32px] overflow-hidden border-[8px] border-neutral-800 ring-1 ring-white/10 bg-black">
            <div className="h-6 bg-neutral-800 flex items-center justify-center">
              <div className="w-12 h-1 rounded-full bg-neutral-600"></div>
            </div>
            <div className="max-h-[85vh] overflow-y-auto">
              {renderCanvasBody()}
            </div>
          </div>
        )}

        {viewport === 'mobile' && (
          <div className="w-[375px] my-6 shadow-2xl rounded-[44px] overflow-hidden border-[10px] border-neutral-800 ring-1 ring-white/10 bg-black">
            <div className="h-7 bg-neutral-800 flex items-center justify-center relative">
              <div className="w-20 h-3.5 bg-black rounded-full absolute top-1 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 absolute right-3"></div>
              </div>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              {renderCanvasBody()}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
