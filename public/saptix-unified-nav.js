/**
 * Saptix Enterprise Unified Topbar & Design System v4.0
 * Features:
 * - Unified Topbar with App Launcher (11 Connected Saptix stakes)
 * - Modern Shadcn Studio Theme Customizer Drawer (Right Slide-Over Sheet)
 * - Alt+T / Option+T Global Capture Keyboard Shortcut
 * - Full Configuration: Theme Preset, Font, Mode (Light/Dark/System), Radius, Layout, Scale, Sidebar Variant & Mode
 * - Cross-Subdomain Synchronization via localStorage, custom events, and .saptix.tech cookies
 */
(function() {
  if (window.__SAPTIX_NAV_LOADED__) return;
  window.__SAPTIX_NAV_LOADED__ = true;

  // 1. Saptix Connected Apps Catalog
  const SAPTIX_APPS = [
    { name: 'Core Hub', sub: 'Platform', url: 'https://saptix.tech', desc: 'Main Marketing & Enterprise Platform', icon: '⚡', category: 'Platform & Governance' },
    { name: 'Admin Portal', sub: 'Admin', url: 'https://admin.saptix.tech', desc: 'Enterprise Administration & Security', icon: '⚙️', category: 'Platform & Governance' },
    { name: 'Modeler Studio', sub: 'Modeler', url: 'https://modeler.saptix.tech', desc: 'SAP BTP Architecture & Cloud Modeler', icon: '📊', category: 'AI Architecture & Swarms' },
    { name: 'AI Chat', sub: 'Chat', url: 'https://chat.saptix.tech', desc: 'Intelligent AI Agent Workspace', icon: '💬', category: 'AI Architecture & Swarms' },
    { name: 'Spectra Engine', sub: 'Spectra', url: 'https://spectra.saptix.tech', desc: 'SAP Cognitive Core & Agent Engine', icon: '🛡️', category: 'AI Architecture & Swarms' },
    { name: 'Agent Platform', sub: 'Agent', url: 'https://agent.saptix.tech', desc: 'Autonomous Multi-Agent Swarm Orchestrator', icon: '🤖', category: 'AI Architecture & Swarms' },
    { name: 'Automate Studio', sub: 'Automate', url: 'https://automate.saptix.tech', desc: 'Enterprise Fullstack Automation & Orchestration', icon: '⚡', category: 'Automation & Workflows' },
    { name: 'Datamachine', sub: 'Datamachine', url: 'https://datamachine.saptix.tech', desc: 'Data Transformation & Processing', icon: '🔄', category: 'Automation & Workflows' },
    { name: 'Workflow', sub: 'Workflow', url: 'https://workflow.saptix.tech', desc: 'Automated Agent Orchestration', icon: '🔀', category: 'Automation & Workflows' },
  ];

  // 2. Comprehensive Theme Color Presets (Shadcn Studio style)
  const COLOR_PRESETS = {
    default: { name: 'Default', hex: '#0d9488', primary: 'oklch(0.72 0.14 180)', fg: 'oklch(0.985 0 0)', ring: 'oklch(0.72 0.14 180)', light: 'rgba(13, 148, 136, 0.15)', border: 'rgba(13, 148, 136, 0.35)', glow: '0 0 15px rgba(13, 148, 136, 0.35)' },
    zinc:    { name: 'Zinc',    hex: '#71717a', primary: 'oklch(0.55 0.01 260)', fg: 'oklch(0.985 0 0)', ring: 'oklch(0.55 0.01 260)', light: 'rgba(113, 113, 122, 0.15)', border: 'rgba(113, 113, 122, 0.35)', glow: '0 0 15px rgba(113, 113, 122, 0.35)' },
    slate:   { name: 'Slate',   hex: '#64748b', primary: 'oklch(0.55 0.03 240)', fg: 'oklch(0.985 0 0)', ring: 'oklch(0.55 0.03 240)', light: 'rgba(100, 116, 139, 0.15)', border: 'rgba(100, 116, 139, 0.35)', glow: '0 0 15px rgba(100, 116, 139, 0.35)' },
    stone:   { name: 'Stone',   hex: '#78716c', primary: 'oklch(0.55 0.02 50)',  fg: 'oklch(0.985 0 0)', ring: 'oklch(0.55 0.02 50)',  light: 'rgba(120, 113, 108, 0.15)', border: 'rgba(120, 113, 108, 0.35)', glow: '0 0 15px rgba(120, 113, 108, 0.35)' },
    gray:    { name: 'Gray',    hex: '#6b7280', primary: 'oklch(0.55 0.02 250)', fg: 'oklch(0.985 0 0)', ring: 'oklch(0.55 0.02 250)', light: 'rgba(107, 114, 128, 0.15)', border: 'rgba(107, 114, 128, 0.35)', glow: '0 0 15px rgba(107, 114, 128, 0.35)' },
    neutral: { name: 'Neutral', hex: '#737373', primary: 'oklch(0.55 0 0)',       fg: 'oklch(0.985 0 0)', ring: 'oklch(0.55 0 0)',       light: 'rgba(115, 115, 115, 0.15)', border: 'rgba(115, 115, 115, 0.35)', glow: '0 0 15px rgba(115, 115, 115, 0.35)' },
    red:     { name: 'Red',     hex: '#ef4444', primary: 'oklch(0.63 0.24 25)',  fg: 'oklch(0.985 0 0)', ring: 'oklch(0.63 0.24 25)',  light: 'rgba(239, 68, 68, 0.15)',   border: 'rgba(239, 68, 68, 0.35)',   glow: '0 0 15px rgba(239, 68, 68, 0.35)' },
    rose:    { name: 'Rose',    hex: '#f43f5e', primary: 'oklch(0.65 0.24 15)',  fg: 'oklch(0.985 0 0)', ring: 'oklch(0.65 0.24 15)',  light: 'rgba(244, 63, 94, 0.15)',   border: 'rgba(244, 63, 94, 0.35)',   glow: '0 0 15px rgba(244, 63, 94, 0.35)' },
    orange:  { name: 'Orange',  hex: '#f97316', primary: 'oklch(0.70 0.19 45)',  fg: 'oklch(0.985 0 0)', ring: 'oklch(0.70 0.19 45)',  light: 'rgba(249, 115, 22, 0.15)',  border: 'rgba(249, 115, 22, 0.35)',  glow: '0 0 15px rgba(249, 115, 22, 0.35)' },
    green:   { name: 'Green',   hex: '#22c55e', primary: 'oklch(0.72 0.19 145)', fg: 'oklch(0.145 0 0)', ring: 'oklch(0.72 0.19 145)', light: 'rgba(34, 197, 94, 0.15)',   border: 'rgba(34, 197, 94, 0.35)',   glow: '0 0 15px rgba(34, 197, 94, 0.35)' },
    blue:    { name: 'Blue',    hex: '#3b82f6', primary: 'oklch(0.62 0.21 255)', fg: 'oklch(0.985 0 0)', ring: 'oklch(0.62 0.21 255)', light: 'rgba(59, 130, 246, 0.15)',  border: 'rgba(59, 130, 246, 0.35)',  glow: '0 0 15px rgba(59, 130, 246, 0.35)' },
    yellow:  { name: 'Yellow',  hex: '#eab308', primary: 'oklch(0.78 0.18 85)',  fg: 'oklch(0.145 0 0)', ring: 'oklch(0.78 0.18 85)',  light: 'rgba(234, 179, 8, 0.15)',   border: 'rgba(234, 179, 8, 0.35)',   glow: '0 0 15px rgba(234, 179, 8, 0.35)' },
    violet:  { name: 'Violet',  hex: '#8b5cf6', primary: 'oklch(0.65 0.22 290)', fg: 'oklch(0.985 0 0)', ring: 'oklch(0.65 0.22 290)', light: 'rgba(139, 92, 246, 0.15)',  border: 'rgba(139, 92, 246, 0.35)',  glow: '0 0 15px rgba(139, 92, 246, 0.35)' },
    cyan:    { name: 'Cyan',    hex: '#06b6d4', primary: 'oklch(0.75 0.15 200)', fg: 'oklch(0.145 0 0)', ring: 'oklch(0.75 0.15 200)', light: 'rgba(6, 182, 212, 0.15)',   border: 'rgba(6, 182, 212, 0.35)',   glow: '0 0 15px rgba(6, 182, 212, 0.35)' },
    emerald: { name: 'Emerald', hex: '#10b981', primary: 'oklch(0.70 0.16 160)', fg: 'oklch(0.985 0 0)', ring: 'oklch(0.70 0.16 160)', light: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.35)', glow: '0 0 15px rgba(16, 185, 129, 0.35)' }
  };

  // 3. Fonts
  const FONT_OPTIONS = {
    geist:   { label: 'Geist',              css: "'Geist', 'Geist Sans', -apple-system, sans-serif" },
    inter:   { label: 'Inter',              css: "'Inter', 'Plus Jakarta Sans', -apple-system, sans-serif" },
    jakarta: { label: 'Plus Jakarta Sans',  css: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" },
    outfit:  { label: 'Outfit',             css: "'Outfit', 'Inter', sans-serif" },
    roboto:  { label: 'Roboto',             css: "'Roboto', -apple-system, sans-serif" },
    mono:    { label: 'JetBrains Mono',     css: "'JetBrains Mono', monospace" }
  };

  // 4. Corner Radius
  const RADIUS_OPTIONS = {
    none: { label: '⊘', val: '0rem' },
    sm:   { label: 'SM', val: '0.375rem' },
    md:   { label: 'MD', val: '0.5rem' },
    lg:   { label: 'LG', val: '0.75rem' }
  };

  // 5. Default Configuration
  const DEFAULT_CONFIG = {
    preset: 'default',
    font: 'geist',
    mode: 'dark', // 'light' | 'dark' | 'system'
    radius: 'md', // 'none' | 'sm' | 'md' | 'lg'
    layout: 'compact', // 'compact' | 'full'
    scale: 'md', // 'sm' | 'md' | 'lg'
    sidebarVariant: 'default', // 'default' | 'inset' | 'floating'
    sidebarMode: 'default' // 'default' | 'icon' | 'full'
  };

  // 6. Config Accessors
  function getThemeConfig() {
    try {
      const raw = localStorage.getItem('saptix_theme_customizer') || localStorage.getItem('saptix-theme-config');
      if (!raw) return { ...DEFAULT_CONFIG };
      const p = JSON.parse(raw);
      return {
        preset: p.preset || DEFAULT_CONFIG.preset,
        font: p.font || DEFAULT_CONFIG.font,
        mode: p.mode || DEFAULT_CONFIG.mode,
        radius: p.radius || DEFAULT_CONFIG.radius,
        layout: p.layout || DEFAULT_CONFIG.layout,
        scale: p.scale || DEFAULT_CONFIG.scale,
        sidebarVariant: p.sidebarVariant || DEFAULT_CONFIG.sidebarVariant,
        sidebarMode: p.sidebarMode || DEFAULT_CONFIG.sidebarMode
      };
    } catch {
      return { ...DEFAULT_CONFIG };
    }
  }

  function saveThemeConfig(cfg) {
    try {
      const str = JSON.stringify(cfg);
      localStorage.setItem('saptix_theme_customizer', str);
      localStorage.setItem('saptix-theme-config', str);

      // Determine resolved mode
      let activeMode = cfg.mode;
      if (activeMode === 'system') {
        activeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      // Sync across *.saptix.tech via cookies
      document.cookie = `saptix_theme=${activeMode};path=/;domain=.saptix.tech;max-age=31536000;SameSite=Lax`;
      document.cookie = `saptix_theme_config=${encodeURIComponent(str)};path=/;domain=.saptix.tech;max-age=31536000;SameSite=Lax`;
      
      window.dispatchEvent(new CustomEvent('saptix:theme-change', { detail: cfg }));
    } catch (e) {}
  }

  // 7. Live DOM Application
  function applyTheme() {
    const cfg = getThemeConfig();
    const root = document.documentElement;

    // Color Mode (Light / Dark / System)
    let isDark = true;
    if (cfg.mode === 'light') {
      isDark = false;
    } else if (cfg.mode === 'system') {
      isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }

    // Color Preset
    const preset = COLOR_PRESETS[cfg.preset] || COLOR_PRESETS.default;
    root.style.setProperty('--primary', preset.primary);
    root.style.setProperty('--primary-foreground', preset.fg);
    root.style.setProperty('--ring', preset.ring);
    root.style.setProperty('--brand', preset.primary);
    root.style.setProperty('--brand-foreground', preset.fg);
    root.style.setProperty('--sidebar-primary', preset.primary);
    root.style.setProperty('--sidebar-primary-foreground', preset.fg);
    root.style.setProperty('--color-primary-main', preset.hex);
    root.style.setProperty('--color-primary-light', preset.light);
    root.style.setProperty('--color-primary-border', preset.border);
    root.style.setProperty('--color-primary-glow', preset.glow);
    root.setAttribute('data-theme-preset', cfg.preset);

    // Font Family
    const fontOpt = FONT_OPTIONS[cfg.font] || FONT_OPTIONS.geist;
    root.style.setProperty('--font-sans', fontOpt.css);
    root.setAttribute('data-font', cfg.font);

    // Corner Radius
    const radOpt = RADIUS_OPTIONS[cfg.radius] || RADIUS_OPTIONS.md;
    root.style.setProperty('--radius', radOpt.val);
    root.setAttribute('data-radius', cfg.radius);

    // Content Layout (Compact vs Full)
    root.setAttribute('data-layout', cfg.layout);
    if (cfg.layout === 'compact') {
      root.style.setProperty('--content-max-width', '1280px');
    } else {
      root.style.setProperty('--content-max-width', '100%');
    }

    // Interface Scale
    root.setAttribute('data-scale', cfg.scale);
    let scaleMultiplier = 1;
    if (cfg.scale === 'sm') scaleMultiplier = 0.925;
    else if (cfg.scale === 'lg') scaleMultiplier = 1.05;
    root.style.setProperty('--interface-scale', String(scaleMultiplier));

    // Sidebar Variant & Mode
    root.setAttribute('data-sidebar-variant', cfg.sidebarVariant);
    root.setAttribute('data-sidebar-mode', cfg.sidebarMode);

    // Update Quick Theme Sun/Moon Icon in Topbar
    const themeBtn = document.getElementById('saptix-theme-btn');
    if (themeBtn) {
      const iconSpan = themeBtn.querySelector('.saptix-theme-icon');
      if (iconSpan) iconSpan.textContent = isDark ? '☀️' : '🌙';
    }
  }

  // Initial immediate application
  applyTheme();

  // Watch for system OS theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const cfg = getThemeConfig();
      if (cfg.mode === 'system') {
        applyTheme();
      }
    });
  }

  // 8. Render Universal Header & Shadcn Theme Customizer Sheet
  function renderUniversalHeader() {
    if (document.getElementById('saptix-global-header')) return;

    // Load Fonts
    if (!document.getElementById('saptix-nav-fonts')) {
      const link = document.createElement('link');
      link.id = 'saptix-nav-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }

    const hostname = window.location.hostname;
    let currentApp = SAPTIX_APPS.find(a => hostname.includes(a.sub.toLowerCase()));
    if (!currentApp) {
      if (hostname === 'saptix.tech' || hostname.endsWith('.saptix.tech')) {
        currentApp = SAPTIX_APPS[0]; // Core Hub
      } else {
        currentApp = { name: 'Saptix Suite', sub: 'Platform', icon: '⚡' };
      }
    }
    const cfg = getThemeConfig();

    // Create Topbar Header
    const header = document.createElement('header');
    header.id = 'saptix-global-header';
    header.className = 'saptix-enterprise-topbar';
    header.innerHTML = `
      <div class="saptix-topbar-inner">
        <!-- Left: Brand Cluster -->
        <div class="saptix-brand-cluster">
          <a href="https://saptix.tech" class="saptix-brand-link" title="Saptix Platform Hub">
            <div class="saptix-logo-icon">S</div>
            <span class="saptix-brand-title">Saptix</span>
          </a>
          <span class="saptix-divider">/</span>
          <div class="saptix-app-badge">
            <span class="saptix-app-icon">${currentApp.icon}</span>
            <span class="saptix-app-name">${currentApp.name}</span>
          </div>
        </div>

        <!-- Center: Global Search Bar & App Launcher -->
        <div class="saptix-nav-center">
          <!-- Quick Command Palette / Search Bar -->
          <div class="saptix-search-wrapper">
            <button id="saptix-search-trigger" class="saptix-search-bar" type="button" title="Quick Search (Cmd+K / Ctrl+K)" aria-label="Search apps, actions and tools">
              <svg class="saptix-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span class="saptix-search-placeholder">Search apps, tools, actions...</span>
              <kbd class="saptix-search-kbd">⌘K</kbd>
            </button>
          </div>

          <!-- App Launcher Switcher -->
          <div class="saptix-app-launcher-wrapper">
            <button id="saptix-launcher-btn" class="saptix-launcher-trigger" type="button" aria-label="Switch Saptix App" title="Saptix Apps">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>
              <span>Apps</span>
              <svg class="saptix-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div id="saptix-launcher-dropdown" class="saptix-launcher-menu">
              <div class="saptix-launcher-header">
                <div class="saptix-launcher-title-box">
                  <span class="saptix-launcher-heading">SAPTIX ENTERPRISE SUITE</span>
                  <span class="saptix-launcher-subheading">Connected Cloud Ecosystem & AI Stakes</span>
                </div>
                <span class="saptix-badge-pill">CONNECTED</span>
              </div>
              <div class="saptix-launcher-body">
                <!-- Group 1: Platform & Governance -->
                <div class="saptix-launcher-group">
                  <div class="saptix-group-label">Platform & Governance</div>
                  <div class="saptix-app-grid">
                    ${SAPTIX_APPS.filter(a => a.category === 'Platform & Governance').map(app => `
                      <a href="${app.url}" class="saptix-app-item ${hostname.includes(app.sub.toLowerCase()) ? 'active' : ''}">
                        <span class="saptix-item-icon">${app.icon}</span>
                        <div class="saptix-item-info">
                          <span class="saptix-item-name">${app.name}</span>
                          <span class="saptix-item-desc">${app.desc}</span>
                        </div>
                      </a>
                    `).join('')}
                  </div>
                </div>

                <!-- Group 2: AI Architecture & Swarms -->
                <div class="saptix-launcher-group">
                  <div class="saptix-group-label">AI Architecture & Swarms</div>
                  <div class="saptix-app-grid">
                    ${SAPTIX_APPS.filter(a => a.category === 'AI Architecture & Swarms').map(app => `
                      <a href="${app.url}" class="saptix-app-item ${hostname.includes(app.sub.toLowerCase()) ? 'active' : ''}">
                        <span class="saptix-item-icon">${app.icon}</span>
                        <div class="saptix-item-info">
                          <span class="saptix-item-name">${app.name}</span>
                          <span class="saptix-item-desc">${app.desc}</span>
                        </div>
                      </a>
                    `).join('')}
                  </div>
                </div>

                <!-- Group 3: Automation & Workflows -->
                <div class="saptix-launcher-group">
                  <div class="saptix-group-label">Automation & Workflows</div>
                  <div class="saptix-app-grid">
                    ${SAPTIX_APPS.filter(a => a.category === 'Automation & Workflows').map(app => `
                      <a href="${app.url}" class="saptix-app-item ${hostname.includes(app.sub.toLowerCase()) ? 'active' : ''}">
                        <span class="saptix-item-icon">${app.icon}</span>
                        <div class="saptix-item-info">
                          <span class="saptix-item-name">${app.name}</span>
                          <span class="saptix-item-desc">${app.desc}</span>
                        </div>
                      </a>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Actions -->
        <div class="saptix-nav-right">
          <!-- Theme Customizer Palette Icon Button -->
          <button id="saptix-palette-btn" class="saptix-icon-btn" title="Open Theme Customizer (Alt+T)" aria-label="Open Theme Customizer (Alt+T)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"/>
            </svg>
          </button>

          <!-- Theme Quick Sun/Moon Toggle -->
          <button id="saptix-theme-btn" class="saptix-icon-btn" title="Toggle Light/Dark Mode" aria-label="Toggle Theme">
            <span class="saptix-theme-icon">☀️</span>
          </button>

          <!-- User Account Menu with Logout -->
          <div class="saptix-user-wrapper" style="position: relative;">
            <button id="saptix-user-btn" class="saptix-user-btn" title="Saptix Account & Sign Out" aria-label="User Menu" type="button">
              <div class="saptix-user-avatar" id="saptix-user-avatar">S</div>
              <span class="saptix-user-name" id="saptix-user-name">Account</span>
              <svg class="saptix-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div id="saptix-user-dropdown" class="saptix-user-dropdown-menu">
              <div class="saptix-user-dropdown-header">
                <div class="saptix-user-dropdown-avatar" id="saptix-menu-avatar">S</div>
                <div class="saptix-user-dropdown-meta">
                  <div class="saptix-user-dropdown-email" id="saptix-menu-email">admin@saptix.tech</div>
                  <div class="saptix-user-dropdown-role" id="saptix-menu-role">Enterprise Administrator</div>
                </div>
              </div>
              <div class="saptix-user-dropdown-divider"></div>
              <a href="https://auth.saptix.tech" class="saptix-user-dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Account Profile & Security</span>
              </a>
              <a href="https://admin.saptix.tech" id="saptix-admin-nav-item" class="saptix-user-dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Admin Governance</span>
              </a>
              <a href="https://auth.saptix.tech" id="saptix-auth-nav-item" class="saptix-user-dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Central Auth & Keys</span>
              </a>
              <div class="saptix-user-dropdown-divider"></div>
              <a href="/logout" id="saptix-logout-link" class="saptix-user-dropdown-item saptix-logout-action">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>Sign Out Everywhere</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Create Saptix Command Palette Modal
    const commandPaletteContainer = document.createElement('div');
    commandPaletteContainer.id = 'saptix-command-palette-container';
    commandPaletteContainer.className = 'saptix-command-modal-wrapper';
    commandPaletteContainer.innerHTML = `
      <div id="saptix-command-backdrop" class="saptix-command-backdrop"></div>
      <div id="saptix-command-dialog" class="saptix-command-dialog" role="dialog" aria-modal="true" aria-label="Command Palette">
        <div class="saptix-command-search-header">
          <svg class="saptix-command-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input id="saptix-command-input" type="text" class="saptix-command-input" placeholder="Type an application, tool, or action name..." autocomplete="off" spellcheck="false">
          <kbd class="saptix-command-esc-badge" id="saptix-command-close-btn" title="Close (Esc)">ESC</kbd>
        </div>
        <div id="saptix-command-results" class="saptix-command-list"></div>
        <div class="saptix-command-footer">
          <div class="saptix-command-hint">
            <span>Navigate <kbd>↑</kbd> <kbd>↓</kbd></span>
            <span>Open <kbd>↵</kbd></span>
            <span>Close <kbd>ESC</kbd></span>
          </div>
          <div class="saptix-command-brand">⚡ Saptix Enterprise OS</div>
        </div>
      </div>
    `;

    // Create Theme Customizer Drawer & Backdrop (Shadcn Studio style)
    const customizerWrapper = document.createElement('div');
    customizerWrapper.id = 'saptix-customizer-container';
    customizerWrapper.innerHTML = `
      <!-- Dimmed Backdrop -->
      <div id="saptix-theme-backdrop" class="saptix-customizer-backdrop"></div>

      <!-- Slide-Over Sheet Drawer (Docked to Right) -->
      <aside id="saptix-theme-drawer" class="saptix-customizer-drawer" role="dialog" aria-modal="true" aria-label="Theme Customizer">
        <!-- Header -->
        <div class="saptix-drawer-header">
          <div class="saptix-header-left">
            <div class="saptix-title-row">
              <h2 class="saptix-drawer-title">Theme Customizer</h2>
              <div class="saptix-tooltip-wrap" title="Customize visual appearance, presets, typography, radius and layout across all Saptix stakes.">
                <span class="saptix-help-icon">?</span>
              </div>
              <button id="saptix-customizer-reset" class="saptix-reset-icon-btn" title="Reset all to defaults" aria-label="Reset to default theme">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
              </button>
            </div>
            <p class="saptix-drawer-subtitle">Customize your theme to your liking.</p>
          </div>
          <button id="saptix-drawer-close" class="saptix-drawer-close-btn" aria-label="Close Theme Customizer (Esc)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Scrollable Content Body -->
        <div class="saptix-drawer-body">
          
          <!-- Control 1: Theme Preset (Dropdown) -->
          <div class="saptix-control-group">
            <label class="saptix-control-label" for="saptix-preset-select">Theme Preset</label>
            <div class="saptix-select-wrapper">
              <div id="saptix-preset-trigger" class="saptix-select-trigger" tabindex="0">
                <span class="saptix-selected-val">
                  <span id="saptix-preset-dot" class="saptix-color-dot" style="background-color: ${COLOR_PRESETS[cfg.preset]?.hex || '#0d9488'};"></span>
                  <span id="saptix-preset-text">${COLOR_PRESETS[cfg.preset]?.name || 'Default'}</span>
                </span>
                <svg class="saptix-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              <div id="saptix-preset-menu" class="saptix-select-dropdown">
                ${Object.entries(COLOR_PRESETS).map(([key, val]) => `
                  <div class="saptix-dropdown-item ${cfg.preset === key ? 'active' : ''}" data-value="${key}">
                    <span class="saptix-color-dot" style="background-color: ${val.hex};"></span>
                    <span>${val.name}</span>
                    ${cfg.preset === key ? '<span class="saptix-item-check">✓</span>' : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Control 2: Font (Dropdown) -->
          <div class="saptix-control-group">
            <label class="saptix-control-label" for="saptix-font-select">Font</label>
            <div class="saptix-select-wrapper">
              <div id="saptix-font-trigger" class="saptix-select-trigger" tabindex="0">
                <span id="saptix-font-text" class="saptix-selected-val">${FONT_OPTIONS[cfg.font]?.label || 'Geist'}</span>
                <svg class="saptix-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              <div id="saptix-font-menu" class="saptix-select-dropdown">
                ${Object.entries(FONT_OPTIONS).map(([key, val]) => `
                  <div class="saptix-dropdown-item ${cfg.font === key ? 'active' : ''}" data-value="${key}">
                    <span style="font-family: ${val.css};">${val.label}</span>
                    ${cfg.font === key ? '<span class="saptix-item-check">✓</span>' : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Control 3: Color Mode (Segmented 3-btn group) -->
          <div class="saptix-control-group">
            <label class="saptix-control-label">Color Mode</label>
            <div class="saptix-segmented-control" data-prop="mode">
              <button type="button" class="saptix-seg-btn ${cfg.mode === 'light' ? 'active' : ''}" data-val="light">Light</button>
              <button type="button" class="saptix-seg-btn ${cfg.mode === 'dark' ? 'active' : ''}" data-val="dark">Dark</button>
              <button type="button" class="saptix-seg-btn ${cfg.mode === 'system' ? 'active' : ''}" data-val="system">System</button>
            </div>
          </div>

          <!-- Control 4: Radius (Segmented 4-btn group) -->
          <div class="saptix-control-group">
            <label class="saptix-control-label">Radius</label>
            <div class="saptix-segmented-control" data-prop="radius">
              <button type="button" class="saptix-seg-btn ${cfg.radius === 'none' ? 'active' : ''}" data-val="none" title="Zero radius">⊘</button>
              <button type="button" class="saptix-seg-btn ${cfg.radius === 'sm' ? 'active' : ''}" data-val="sm">SM</button>
              <button type="button" class="saptix-seg-btn ${cfg.radius === 'md' ? 'active' : ''}" data-val="md">MD</button>
              <button type="button" class="saptix-seg-btn ${cfg.radius === 'lg' ? 'active' : ''}" data-val="lg">LG</button>
            </div>
          </div>

          <!-- Control 5: Content Layout (Segmented 2-btn group) -->
          <div class="saptix-control-group">
            <label class="saptix-control-label">Content Layout</label>
            <div class="saptix-segmented-control" data-prop="layout">
              <button type="button" class="saptix-seg-btn ${cfg.layout === 'compact' ? 'active' : ''}" data-val="compact">Compact</button>
              <button type="button" class="saptix-seg-btn ${cfg.layout === 'full' ? 'active' : ''}" data-val="full">Full</button>
            </div>
          </div>

          <!-- Control 6: Scale (Segmented 3-btn group) -->
          <div class="saptix-control-group">
            <label class="saptix-control-label">Scale</label>
            <div class="saptix-segmented-control" data-prop="scale">
              <button type="button" class="saptix-seg-btn ${cfg.scale === 'sm' ? 'active' : ''}" data-val="sm">SM</button>
              <button type="button" class="saptix-seg-btn ${cfg.scale === 'md' ? 'active' : ''}" data-val="md">MD</button>
              <button type="button" class="saptix-seg-btn ${cfg.scale === 'lg' ? 'active' : ''}" data-val="lg">LG</button>
            </div>
          </div>

          <!-- Control 7: Sidebar Variant (Segmented 3-btn group) -->
          <div class="saptix-control-group">
            <label class="saptix-control-label">Sidebar Variant</label>
            <div class="saptix-segmented-control" data-prop="sidebarVariant">
              <button type="button" class="saptix-seg-btn ${cfg.sidebarVariant === 'default' ? 'active' : ''}" data-val="default">Default</button>
              <button type="button" class="saptix-seg-btn ${cfg.sidebarVariant === 'inset' ? 'active' : ''}" data-val="inset">Inset</button>
              <button type="button" class="saptix-seg-btn ${cfg.sidebarVariant === 'floating' ? 'active' : ''}" data-val="floating">Floating</button>
            </div>
          </div>

          <!-- Control 8: Sidebar Mode (Segmented 3-btn group) -->
          <div class="saptix-control-group">
            <label class="saptix-control-label">Sidebar Mode</label>
            <div class="saptix-segmented-control" data-prop="sidebarMode">
              <button type="button" class="saptix-seg-btn ${cfg.sidebarMode === 'default' ? 'active' : ''}" data-val="default">Default</button>
              <button type="button" class="saptix-seg-btn ${cfg.sidebarMode === 'icon' ? 'active' : ''}" data-val="icon">Icon</button>
              <button type="button" class="saptix-seg-btn ${cfg.sidebarMode === 'full' ? 'active' : ''}" data-val="full">Full</button>
            </div>
          </div>

        </div>

        <!-- Footer / Shortcut Hint -->
        <div class="saptix-drawer-footer">
          <span class="saptix-shortcut-badge">Shortcut: <kbd>Alt</kbd> + <kbd>T</kbd></span>
          <span class="saptix-sync-badge">Auto-Synced Across Saptix</span>
        </div>
      </aside>
    `;

    // Complete Shadcn Studio Theme Stylesheet
    const style = document.createElement('style');
    style.id = 'saptix-customizer-styles';
    style.textContent = `
      /* ═══════════════════════════════════════════════════════════════════
         Saptix Enterprise Unified Topbar
         ═══════════════════════════════════════════════════════════════════ */
      #saptix-global-header {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 48px !important;
        z-index: 999999 !important;
        font-family: var(--font-sans, 'Geist', 'Inter', sans-serif) !important;
        background: var(--card, #0c1017) !important;
        border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1)) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        color: var(--foreground, #fafafa) !important;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25) !important;
        transition: background-color 0.2s ease, border-color 0.2s ease !important;
      }
      .saptix-topbar-inner {
        max-width: 100% !important;
        height: 100% !important;
        padding: 0 16px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        position: relative !important;
      }
      .saptix-brand-cluster { display: flex !important; align-items: center !important; gap: 8px !important; }
      .saptix-brand-link { display: flex !important; align-items: center !important; gap: 8px !important; text-decoration: none !important; color: inherit !important; }
      .saptix-logo-icon {
        width: 28px !important;
        height: 28px !important;
        border-radius: var(--radius, 6px) !important;
        background: linear-gradient(135deg, var(--color-primary-main, #0d9488), #2563eb) !important;
        color: #fff !important;
        font-weight: 800 !important;
        font-size: 14px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: var(--color-primary-glow, 0 2px 8px rgba(13, 148, 136, 0.4)) !important;
      }
      .saptix-brand-title {
        font-family: var(--font-heading, var(--font-sans)) !important;
        font-weight: 700 !important;
        font-size: 14px !important;
        letter-spacing: -0.02em !important;
        color: var(--foreground, #fafafa) !important;
      }
      .saptix-divider { color: var(--muted-foreground, #71717a) !important; opacity: 0.5 !important; font-size: 13px !important; }
      .saptix-app-badge {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 3px 9px !important;
        border-radius: var(--radius, 6px) !important;
        background: var(--color-primary-light, rgba(13, 148, 136, 0.15)) !important;
        border: 1px solid var(--color-primary-border, rgba(13, 148, 136, 0.35)) !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        color: var(--color-primary-main, #0d9488) !important;
      }
      .saptix-app-icon { font-size: 12px !important; }
      .saptix-app-name { font-weight: 600 !important; }

      .saptix-nav-center {
        display: flex !important;
        align-items: center !important;
        position: absolute !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
      }
      .saptix-app-launcher-wrapper { position: relative !important; }
      .saptix-launcher-trigger {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 6px 12px !important;
        border-radius: var(--radius, 6px) !important;
        background: var(--secondary, #151c2c) !important;
        border: 1px solid var(--border, rgba(255, 255, 255, 0.1)) !important;
        color: var(--foreground, #fafafa) !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        transition: all 0.15s ease !important;
      }
      .saptix-launcher-trigger:hover {
        border-color: var(--color-primary-main, #0d9488) !important;
        background: var(--color-primary-light, rgba(13, 148, 136, 0.15)) !important;
        color: var(--color-primary-main, #0d9488) !important;
      }
      .saptix-launcher-menu {
        display: none !important;
        position: absolute !important;
        top: calc(100% + 8px) !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 660px !important;
        max-width: 95vw !important;
        max-height: 85vh !important;
        overflow-y: auto !important;
        background: var(--card, #0c1017) !important;
        border: 1px solid var(--border, rgba(255, 255, 255, 0.15)) !important;
        border-radius: calc(var(--radius, 10px) * 1.3) !important;
        box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.7) !important;
        padding: 16px !important;
        z-index: 1000000 !important;
      }
      .saptix-launcher-menu.open { display: block !important; animation: saptixFadeIn 0.15s ease-out !important; }
      @keyframes saptixFadeIn {
        from { opacity: 0; transform: translate(-50%, -6px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
      .saptix-launcher-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding-bottom: 12px !important;
        margin-bottom: 12px !important;
        border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1)) !important;
      }
      .saptix-launcher-title-box { display: flex !important; flex-direction: column !important; gap: 1px !important; }
      .saptix-launcher-heading { font-size: 12px !important; font-weight: 700 !important; color: var(--foreground, #fafafa) !important; letter-spacing: 0.04em !important; }
      .saptix-launcher-subheading { font-size: 11px !important; color: var(--muted-foreground, #94a3b8) !important; }
      .saptix-badge-pill {
        background: var(--color-primary-light, rgba(13, 148, 136, 0.15)) !important;
        color: var(--color-primary-main, #0d9488) !important;
        border: 1px solid var(--color-primary-border, rgba(13, 148, 136, 0.35)) !important;
        padding: 3px 8px !important;
        border-radius: 9999px !important;
        font-size: 10px !important;
        font-weight: 700 !important;
      }
      .saptix-app-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
      /* ═══════════════════════════════════════════════════════════════════
         Saptix Search Bar & Command Palette Modal
         ═══════════════════════════════════════════════════════════════════ */
      .saptix-search-wrapper {
        display: flex !important;
        align-items: center !important;
        margin-right: 12px !important;
      }
      .saptix-search-bar {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        padding: 5px 12px !important;
        background: var(--secondary, #151c2c) !important;
        border: 1px solid var(--border, rgba(255, 255, 255, 0.1)) !important;
        border-radius: var(--radius, 6px) !important;
        color: var(--muted-foreground, #94a3b8) !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        transition: all 0.15s ease !important;
        width: 260px !important;
      }
      .saptix-search-bar:hover {
        border-color: var(--color-primary-main, #0d9488) !important;
        color: var(--foreground, #fafafa) !important;
        background: var(--color-primary-light, rgba(13, 148, 136, 0.15)) !important;
      }
      .saptix-search-icon { color: var(--muted-foreground, #94a3b8) !important; flex-shrink: 0 !important; }
      .saptix-search-placeholder { flex: 1 !important; text-align: left !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
      .saptix-search-kbd {
        font-size: 10px !important;
        font-family: var(--font-mono, monospace) !important;
        background: rgba(255, 255, 255, 0.08) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        border-radius: 4px !important;
        padding: 1px 5px !important;
        color: var(--muted-foreground, #94a3b8) !important;
      }
      @media (max-width: 900px) {
        .saptix-search-bar { width: auto !important; padding: 5px 8px !important; }
        .saptix-search-placeholder, .saptix-search-kbd { display: none !important; }
      }

      /* Command Palette Dialog & Backdrop */
      .saptix-command-modal-wrapper {
        position: fixed !important;
        inset: 0 !important;
        z-index: 10000010 !important;
        display: none !important;
        align-items: flex-start !important;
        justify-content: center !important;
        padding-top: 10vh !important;
      }
      .saptix-command-modal-wrapper.open {
        display: flex !important;
      }
      .saptix-command-backdrop {
        position: fixed !important;
        inset: 0 !important;
        background: rgba(0, 0, 0, 0.65) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        z-index: 10000011 !important;
      }
      .saptix-command-dialog {
        position: relative !important;
        width: 620px !important;
        max-width: calc(100vw - 32px) !important;
        max-height: 75vh !important;
        background: var(--card, #0c1017) !important;
        border: 1px solid var(--border, rgba(255, 255, 255, 0.15)) !important;
        border-radius: calc(var(--radius, 10px) * 1.3) !important;
        box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8) !important;
        z-index: 10000012 !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        font-family: var(--font-sans, 'Inter', sans-serif) !important;
        animation: saptixCmdZoom 0.15s ease-out !important;
      }
      @keyframes saptixCmdZoom {
        from { opacity: 0; transform: scale(0.97); }
        to { opacity: 1; transform: scale(1); }
      }
      .saptix-command-search-header {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        padding: 14px 18px !important;
        border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1)) !important;
      }
      .saptix-command-icon { color: var(--color-primary-main, #0d9488) !important; flex-shrink: 0 !important; }
      .saptix-command-input {
        flex: 1 !important;
        background: transparent !important;
        border: none !important;
        outline: none !important;
        font-size: 15px !important;
        font-family: inherit !important;
        color: var(--foreground, #fafafa) !important;
      }
      .saptix-command-input::placeholder { color: var(--muted-foreground, #64748b) !important; }
      .saptix-command-esc-badge {
        font-size: 10px !important;
        padding: 2px 6px !important;
        border-radius: 4px !important;
        background: rgba(255, 255, 255, 0.08) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        color: var(--muted-foreground, #94a3b8) !important;
        cursor: pointer !important;
      }
      .saptix-command-list {
        padding: 10px !important;
        overflow-y: auto !important;
        max-height: 420px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 4px !important;
      }
      .saptix-command-category-title {
        font-size: 10.5px !important;
        font-weight: 700 !important;
        letter-spacing: 0.06em !important;
        text-transform: uppercase !important;
        color: var(--muted-foreground, #64748b) !important;
        padding: 8px 10px 4px 10px !important;
      }
      .saptix-command-item {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 9px 12px !important;
        border-radius: var(--radius, 6px) !important;
        cursor: pointer !important;
        text-decoration: none !important;
        color: var(--foreground, #e2e8f0) !important;
        transition: background 0.1s ease !important;
      }
      .saptix-command-item:hover, .saptix-command-item.selected {
        background: var(--color-primary-light, rgba(13, 148, 136, 0.18)) !important;
        color: var(--color-primary-main, #0d9488) !important;
      }
      .saptix-command-item-left {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
      }
      .saptix-command-item-icon { font-size: 16px !important; width: 22px !important; text-align: center !important; }
      .saptix-command-item-texts { display: flex !important; flex-direction: column !important; gap: 1px !important; }
      .saptix-command-item-name { font-size: 13px !important; font-weight: 600 !important; color: inherit !important; }
      .saptix-command-item-desc { font-size: 11px !important; color: var(--muted-foreground, #94a3b8) !important; }
      .saptix-command-item-badge {
        font-size: 10px !important;
        font-weight: 600 !important;
        padding: 2px 7px !important;
        border-radius: 9999px !important;
        background: rgba(255, 255, 255, 0.06) !important;
        color: var(--muted-foreground, #94a3b8) !important;
      }
      .saptix-command-empty {
        padding: 36px 16px !important;
        text-align: center !important;
        font-size: 13px !important;
        color: var(--muted-foreground, #94a3b8) !important;
      }
      .saptix-command-footer {
        padding: 8px 16px !important;
        background: rgba(0, 0, 0, 0.25) !important;
        border-top: 1px solid var(--border, rgba(255, 255, 255, 0.08)) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        font-size: 11px !important;
        color: var(--muted-foreground, #64748b) !important;
      }
      .saptix-command-hint { display: flex !important; gap: 12px !important; }
      .saptix-command-hint kbd {
        background: rgba(255, 255, 255, 0.08) !important;
        padding: 1px 4px !important;
        border-radius: 3px !important;
        font-family: monospace !important;
        font-size: 10px !important;
      }
      .saptix-command-brand { font-weight: 600 !important; }

      /* Launcher Group Styling */
      .saptix-launcher-body { display: flex !important; flex-direction: column !important; gap: 14px !important; }
      .saptix-launcher-group { display: flex !important; flex-direction: column !important; gap: 6px !important; }
      .saptix-group-label {
        font-size: 10.5px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.06em !important;
        color: var(--muted-foreground, #64748b) !important;
        padding-left: 2px !important;
      }

      .saptix-app-item {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        padding: 10px !important;
        border-radius: var(--radius, 8px) !important;
        background: var(--background, #06080d) !important;
        border: 1px solid var(--border, rgba(255, 255, 255, 0.06)) !important;
        text-decoration: none !important;
        color: inherit !important;
        transition: all 0.15s ease !important;
      }
      .saptix-app-item:hover {
        border-color: var(--color-primary-main, #0d9488) !important;
        background: var(--color-primary-light, rgba(13, 148, 136, 0.12)) !important;
        transform: translateY(-1px) !important;
      }
      .saptix-app-item.active {
        border-color: var(--color-primary-main, #0d9488) !important;
        background: var(--color-primary-light, rgba(13, 148, 136, 0.18)) !important;
      }
      .saptix-item-icon { font-size: 18px !important; }
      .saptix-item-info { display: flex !important; flex-direction: column !important; gap: 2px !important; }
      .saptix-item-name { font-size: 13px !important; font-weight: 600 !important; color: var(--foreground, #fafafa) !important; }
      .saptix-item-desc { font-size: 11px !important; color: var(--muted-foreground, #94a3b8) !important; }

      .saptix-nav-right { display: flex !important; align-items: center !important; gap: 8px !important; }
      .saptix-icon-btn {
        width: 32px !important;
        height: 32px !important;
        border-radius: var(--radius, 6px) !important;
        background: var(--secondary, #151c2c) !important;
        border: 1px solid var(--border, rgba(255, 255, 255, 0.1)) !important;
        color: var(--foreground, #fafafa) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        transition: all 0.15s ease !important;
      }
      .saptix-icon-btn:hover {
        border-color: var(--color-primary-main, #0d9488) !important;
        color: var(--color-primary-main, #0d9488) !important;
        background: var(--color-primary-light, rgba(13, 148, 136, 0.15)) !important;
      }
      .saptix-user-btn {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 4px 10px 4px 6px !important;
        border-radius: var(--radius, 6px) !important;
        background: var(--secondary, #151c2c) !important;
        border: 1px solid var(--border, rgba(255, 255, 255, 0.1)) !important;
        text-decoration: none !important;
        color: var(--foreground, #fafafa) !important;
        font-size: 12px !important;
        font-weight: 600 !important;
      }
      .saptix-user-avatar {
        width: 22px !important;
        height: 22px !important;
        border-radius: 50% !important;
        background: var(--color-primary-main, #0d9488) !important;
        color: #fff !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      /* Saptix User Account Dropdown Menu */
      .saptix-user-dropdown-menu {
        position: absolute !important;
        right: 0 !important;
        top: calc(100% + 8px) !important;
        width: 250px !important;
        background: var(--card, #0f1422) !important;
        border: 1px solid var(--border, rgba(255, 255, 255, 0.12)) !important;
        border-radius: var(--radius, 10px) !important;
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5) !important;
        padding: 6px !important;
        z-index: 10000000 !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: translateY(-6px) !important;
        transition: opacity 0.18s ease, transform 0.18s ease !important;
        display: flex !important;
        flex-direction: column !important;
      }
      .saptix-user-dropdown-menu.open {
        opacity: 1 !important;
        pointer-events: auto !important;
        transform: translateY(0) !important;
      }
      .saptix-user-dropdown-header {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        padding: 8px 10px !important;
      }
      .saptix-user-dropdown-avatar {
        width: 32px !important;
        height: 32px !important;
        border-radius: 50% !important;
        background: var(--color-primary-main, #0d9488) !important;
        color: #fff !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-shrink: 0 !important;
      }
      .saptix-user-dropdown-meta {
        overflow: hidden !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 2px !important;
      }
      .saptix-user-dropdown-email {
        font-size: 12px !important;
        font-weight: 600 !important;
        color: var(--foreground, #fafafa) !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      .saptix-user-dropdown-role {
        font-size: 11px !important;
        color: var(--muted-foreground, #94a3b8) !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      .saptix-user-dropdown-divider {
        height: 1px !important;
        background: var(--border, rgba(255, 255, 255, 0.1)) !important;
        margin: 4px 0 !important;
      }
      .saptix-user-dropdown-item {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        padding: 8px 10px !important;
        border-radius: var(--radius, 6px) !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        color: var(--foreground, #e2e8f0) !important;
        text-decoration: none !important;
        transition: background 0.15s ease, color 0.15s ease !important;
        cursor: pointer !important;
      }
      .saptix-user-dropdown-item:hover {
        background: var(--color-primary-light, rgba(13, 148, 136, 0.15)) !important;
        color: var(--color-primary-main, #0d9488) !important;
      }
      .saptix-user-dropdown-item.saptix-logout-action {
        color: #f87171 !important;
        font-weight: 600 !important;
      }
      .saptix-user-dropdown-item.saptix-logout-action:hover {
        background: rgba(239, 68, 68, 0.15) !important;
        color: #ef4444 !important;
      }


      /* ═══════════════════════════════════════════════════════════════════
         Shadcn Studio Theme Customizer Drawer (Right Slide-Over Sheet)
         ═══════════════════════════════════════════════════════════════════ */
      .saptix-customizer-backdrop {
        position: fixed !important;
        inset: 0 !important;
        background: rgba(0, 0, 0, 0.6) !important;
        backdrop-filter: blur(4px) !important;
        -webkit-backdrop-filter: blur(4px) !important;
        z-index: 10000000 !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transition: opacity 0.25s ease !important;
      }
      .saptix-customizer-backdrop.open {
        opacity: 1 !important;
        pointer-events: auto !important;
      }

      .saptix-customizer-drawer {
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 360px !important;
        max-width: calc(100vw - 32px) !important;
        height: 100vh !important;
        background: #090d14 !important;
        border-left: 1px solid rgba(255, 255, 255, 0.12) !important;
        z-index: 10000001 !important;
        display: flex !important;
        flex-direction: column !important;
        transform: translateX(100%) !important;
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
        box-shadow: -15px 0 45px rgba(0, 0, 0, 0.65) !important;
        font-family: var(--font-sans, 'Geist', 'Inter', sans-serif) !important;
        color: #f8fafc !important;
        box-sizing: border-box !important;
      }
      .saptix-customizer-drawer.open {
        transform: translateX(0) !important;
      }

      /* Drawer Header */
      .saptix-drawer-header {
        padding: 20px !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        display: flex !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
        flex-shrink: 0 !important;
      }
      .saptix-header-left { display: flex !important; flex-direction: column !important; gap: 4px !important; }
      .saptix-title-row { display: flex !important; align-items: center !important; gap: 8px !important; }
      .saptix-drawer-title {
        margin: 0 !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        letter-spacing: -0.01em !important;
        color: #fff !important;
      }
      .saptix-tooltip-wrap { display: inline-flex !important; cursor: help !important; }
      .saptix-help-icon {
        width: 16px !important;
        height: 16px !important;
        border-radius: 50% !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: #94a3b8 !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .saptix-reset-icon-btn {
        background: transparent !important;
        border: none !important;
        padding: 2px !important;
        color: #94a3b8 !important;
        cursor: pointer !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 4px !important;
        transition: color 0.15s ease, transform 0.2s ease !important;
      }
      .saptix-reset-icon-btn:hover {
        color: #fff !important;
        transform: rotate(-45deg) !important;
      }
      .saptix-drawer-subtitle {
        margin: 0 !important;
        font-size: 12px !important;
        color: #94a3b8 !important;
      }
      .saptix-drawer-close-btn {
        background: transparent !important;
        border: none !important;
        padding: 4px !important;
        color: #94a3b8 !important;
        cursor: pointer !important;
        border-radius: 6px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.15s ease !important;
      }
      .saptix-drawer-close-btn:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        color: #fff !important;
      }

      /* Drawer Body */
      .saptix-drawer-body {
        padding: 20px !important;
        overflow-y: auto !important;
        flex: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 18px !important;
      }
      .saptix-drawer-body::-webkit-scrollbar { width: 5px !important; }
      .saptix-drawer-body::-webkit-scrollbar-track { background: transparent !important; }
      .saptix-drawer-body::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15) !important; border-radius: 4px !important; }

      .saptix-control-group {
        display: flex !important;
        flex-direction: column !important;
        gap: 7px !important;
      }
      .saptix-control-label {
        font-size: 12px !important;
        font-weight: 600 !important;
        color: #f1f5f9 !important;
        letter-spacing: -0.01em !important;
      }

      /* Shadcn Style Select Dropdown */
      .saptix-select-wrapper {
        position: relative !important;
        width: 100% !important;
      }
      .saptix-select-trigger {
        width: 100% !important;
        height: 38px !important;
        background: #121824 !important;
        border: 1px solid rgba(255, 255, 255, 0.12) !important;
        border-radius: 8px !important;
        padding: 0 12px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        cursor: pointer !important;
        box-sizing: border-box !important;
        transition: border-color 0.15s ease, background-color 0.15s ease !important;
        color: #f8fafc !important;
        font-size: 13px !important;
      }
      .saptix-select-trigger:hover, .saptix-select-trigger:focus {
        border-color: rgba(255, 255, 255, 0.28) !important;
        outline: none !important;
      }
      .saptix-selected-val {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        font-size: 13px !important;
        font-weight: 500 !important;
      }
      .saptix-select-chevron {
        color: #94a3b8 !important;
        transition: transform 0.2s ease !important;
      }
      .saptix-select-wrapper.open .saptix-select-chevron {
        transform: rotate(180deg) !important;
      }
      .saptix-select-wrapper.open {
        z-index: 50 !important;
      }

      .saptix-select-dropdown {
        display: none !important;
        position: absolute !important;
        top: calc(100% + 5px) !important;
        left: 0 !important;
        right: 0 !important;
        max-height: 220px !important;
        overflow-y: auto !important;
        background: #0f1420 !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        border-radius: 8px !important;
        padding: 4px !important;
        z-index: 10000005 !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6) !important;
      }
      .saptix-select-wrapper.open .saptix-select-dropdown {
        display: block !important;
        animation: saptixDropdownIn 0.15s ease-out !important;
      }
      @keyframes saptixDropdownIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .saptix-dropdown-item {
        padding: 8px 10px !important;
        border-radius: 6px !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        font-size: 13px !important;
        color: #cbd5e1 !important;
        cursor: pointer !important;
        transition: all 0.1s ease !important;
      }
      .saptix-dropdown-item:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        color: #fff !important;
      }
      .saptix-dropdown-item.active {
        background: var(--color-primary-light, rgba(13, 148, 136, 0.2)) !important;
        color: var(--color-primary-main, #2dd4bf) !important;
        font-weight: 600 !important;
      }
      .saptix-item-check {
        margin-left: auto !important;
        font-size: 12px !important;
        font-weight: 800 !important;
      }
      .saptix-color-dot {
        width: 10px !important;
        height: 10px !important;
        border-radius: 50% !important;
        flex-shrink: 0 !important;
        display: inline-block !important;
      }

      /* Shadcn Segmented Pill Controls */
      .saptix-segmented-control {
        display: flex !important;
        background: #121824 !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 8px !important;
        padding: 3px !important;
        gap: 3px !important;
        box-sizing: border-box !important;
      }
      .saptix-seg-btn {
        flex: 1 !important;
        border: none !important;
        background: transparent !important;
        padding: 6px 0 !important;
        border-radius: 6px !important;
        color: #94a3b8 !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.15s ease !important;
        user-select: none !important;
      }
      .saptix-seg-btn:hover {
        color: #fff !important;
      }
      .saptix-seg-btn.active {
        background: rgba(255, 255, 255, 0.12) !important;
        color: #fff !important;
        font-weight: 600 !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
      }

      /* Drawer Footer */
      .saptix-drawer-footer {
        padding: 14px 20px !important;
        border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        font-size: 11px !important;
        color: #94a3b8 !important;
        background: #080c12 !important;
        flex-shrink: 0 !important;
      }
      .saptix-shortcut-badge kbd {
        background: rgba(255, 255, 255, 0.12) !important;
        border: 1px solid rgba(255, 255, 255, 0.18) !important;
        border-radius: 4px !important;
        padding: 1px 5px !important;
        font-size: 10px !important;
        font-family: inherit !important;
        color: #f8fafc !important;
      }
      .saptix-sync-badge {
        font-size: 11px !important;
        color: var(--color-primary-main, #0d9488) !important;
        font-weight: 500 !important;
      }

      /* Light Theme Overrides */
      html.light .saptix-customizer-drawer {
        background: #ffffff !important;
        border-left-color: #e2e8f0 !important;
        color: #0f172a !important;
        box-shadow: -15px 0 45px rgba(0, 0, 0, 0.12) !important;
      }
      html.light .saptix-drawer-header, html.light .saptix-drawer-footer {
        border-color: #e2e8f0 !important;
        background: #f8fafc !important;
      }
      html.light .saptix-drawer-title, html.light .saptix-control-label {
        color: #0f172a !important;
      }
      html.light .saptix-select-trigger {
        background: #f1f5f9 !important;
        border-color: #e2e8f0 !important;
        color: #0f172a !important;
      }
      html.light .saptix-select-dropdown {
        background: #ffffff !important;
        border-color: #e2e8f0 !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
      }
      html.light .saptix-dropdown-item {
        color: #475569 !important;
      }
      html.light .saptix-dropdown-item:hover {
        background: #f1f5f9 !important;
        color: #0f172a !important;
      }
      html.light .saptix-segmented-control {
        background: #f1f5f9 !important;
        border-color: #e2e8f0 !important;
      }
      html.light .saptix-seg-btn {
        color: #64748b !important;
      }
      html.light .saptix-seg-btn.active {
        background: #ffffff !important;
        color: #0f172a !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
      }
      html.light .saptix-shortcut-badge kbd {
        background: #e2e8f0 !important;
        border-color: #cbd5e1 !important;
        color: #0f172a !important;
      }

      /* Layout rule support */
      html[data-layout="compact"] main,
      html[data-layout="compact"] .container,
      html[data-layout="compact"] .content-wrapper,
      html[data-layout="compact"] [data-slot="sidebar-inset"] {
        max-width: 1280px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
    `;

    document.head.appendChild(style);
    document.body.prepend(header);
    document.body.appendChild(customizerWrapper);
    document.body.appendChild(commandPaletteContainer);

    // Padding offset for body
    if (document.body) {
      const curPad = parseInt(window.getComputedStyle(document.body).paddingTop || 0);
      if (curPad < 48) {
        document.body.style.paddingTop = '48px';
      }
    }

    // Command Palette Catalog Items
    const COMMAND_ITEMS = [
      { category: 'Applications', name: 'Core Hub', desc: 'Main Marketing & Enterprise Platform', icon: '⚡', url: 'https://saptix.tech', badge: 'App' },
      { category: 'Applications', name: 'Admin Portal', desc: 'Enterprise Administration & Governance', icon: '⚙️', url: 'https://admin.saptix.tech', badge: 'App' },
      { category: 'Applications', name: 'Modeler Studio', desc: 'SAP BTP Architecture & Cloud Modeler', icon: '📊', url: 'https://modeler.saptix.tech', badge: 'App' },
      { category: 'Applications', name: 'AI Chat', desc: 'Intelligent AI Agent Workspace', icon: '💬', url: 'https://chat.saptix.tech', badge: 'App' },
      { category: 'Applications', name: 'Spectra Engine', desc: 'SAP Cognitive Core & Agent Engine', icon: '🛡️', url: 'https://spectra.saptix.tech', badge: 'App' },
      { category: 'Applications', name: 'Agent Platform', desc: 'Autonomous Multi-Agent Swarm Orchestrator', icon: '🤖', url: 'https://agent.saptix.tech', badge: 'App' },
      { category: 'Applications', name: 'Automate Studio', desc: 'Enterprise Fullstack Process Automation', icon: '⚡', url: 'https://automate.saptix.tech', badge: 'App' },
      { category: 'Applications', name: 'Datamachine', desc: 'Data Transformation & Processing', icon: '🔄', url: 'https://datamachine.saptix.tech', badge: 'App' },
      { category: 'Applications', name: 'Workflow', desc: 'Automated Agent Integration Hub', icon: '🔀', url: 'https://workflow.saptix.tech', badge: 'App' },

      { category: 'System Actions', name: 'Customize Theme (Alt+T)', desc: 'Open Theme Customizer Sheet', icon: '🎨', action: 'theme', badge: 'Action' },
      { category: 'System Actions', name: 'Toggle Dark / Light Mode', desc: 'Switch interface color scheme', icon: '🌓', action: 'mode', badge: 'Action' },
      { category: 'System Actions', name: 'Account Profile & Security', desc: 'Manage profile, SSO and sessions', icon: '👤', url: 'https://auth.saptix.tech', badge: 'SSO' },
      { category: 'System Actions', name: 'API Keys & Developer Tokens', desc: 'Security credentials and API access', icon: '🔑', url: 'https://auth.saptix.tech/keys', badge: 'Auth' },
      { category: 'System Actions', name: 'System Health & Status Check', desc: 'Inspect realtime cluster edge health', icon: '🩺', url: '/health', badge: 'System' },

      { category: 'Tools & Intelligence', name: 'SAP Clean Core ROI Calculator', desc: 'Calculate technical debt savings', icon: '🧮', url: 'https://saptix.tech/clean-core-calculator', badge: 'Tool' },
      { category: 'Tools & Intelligence', name: 'Book Architecture Demo', desc: 'Request enterprise advisory session', icon: '📅', url: 'https://saptix.tech/contact', badge: 'Contact' },
      { category: 'Tools & Intelligence', name: 'Open Source GitHub Repository', desc: 'View Saptix public open source code', icon: '🐙', url: 'https://github.com/saptixtech', badge: 'GitHub' },
    ];

    let selectedCommandIndex = 0;
    let filteredCommandItems = [];

    function renderCommandResults(query) {
      const resultsContainer = document.getElementById('saptix-command-results');
      if (!resultsContainer) return;
      const q = (query || '').toLowerCase().trim();

      filteredCommandItems = COMMAND_ITEMS.filter(item => {
        if (!q) return true;
        return item.name.toLowerCase().includes(q) || 
               item.desc.toLowerCase().includes(q) || 
               item.category.toLowerCase().includes(q);
      });

      if (filteredCommandItems.length === 0) {
        resultsContainer.innerHTML = `<div class="saptix-command-empty">No results found for "${query}"</div>`;
        return;
      }

      selectedCommandIndex = 0;
      let html = '';
      let currentCat = '';

      filteredCommandItems.forEach((item, index) => {
        if (item.category !== currentCat) {
          currentCat = item.category;
          html += `<div class="saptix-command-category-title">${currentCat}</div>`;
        }
        html += `
          <div class="saptix-command-item ${index === 0 ? 'selected' : ''}" data-index="${index}">
            <div class="saptix-command-item-left">
              <span class="saptix-command-item-icon">${item.icon}</span>
              <div class="saptix-command-item-texts">
                <span class="saptix-command-item-name">${item.name}</span>
                <span class="saptix-command-item-desc">${item.desc}</span>
              </div>
            </div>
            <span class="saptix-command-item-badge">${item.badge}</span>
          </div>
        `;
      });

      resultsContainer.innerHTML = html;

      // Click to execute
      resultsContainer.querySelectorAll('.saptix-command-item').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.getAttribute('data-index'), 10);
          executeCommand(filteredCommandItems[idx]);
        });
      });
    }

    function executeCommand(item) {
      if (!item) return;
      closeAllOverlays();
      if (item.action === 'theme') {
        openThemeDrawer();
      } else if (item.action === 'mode') {
        const themeBtn = document.getElementById('saptix-theme-btn');
        if (themeBtn) themeBtn.click();
      } else if (item.url) {
        window.location.href = item.url;
      }
    }

    function updateCommandSelection() {
      const items = document.querySelectorAll('#saptix-command-results .saptix-command-item');
      items.forEach((el, idx) => {
        el.classList.toggle('selected', idx === selectedCommandIndex);
        if (idx === selectedCommandIndex) {
          el.scrollIntoView({ block: 'nearest' });
        }
      });
    }

    function openCommandPalette() {
      closeAllOverlays();
      commandPaletteContainer.classList.add('open');
      const input = document.getElementById('saptix-command-input');
      if (input) {
        input.value = '';
        renderCommandResults('');
        setTimeout(() => input.focus(), 60);
      }
    }

    function closeCommandPalette() {
      if (commandPaletteContainer) {
        commandPaletteContainer.classList.remove('open');
      }
    }

    // Dynamic Collision Offset & Overlap Prevention
    function adjustOverlappingElements() {
      try {
        const header = document.getElementById('saptix-global-header');
        if (!header) return;
        if (document.body) {
          const curPad = parseInt(window.getComputedStyle(document.body).paddingTop || 0);
          if (curPad < 48) {
            document.body.style.setProperty('padding-top', '48px', 'important');
          }
        }
        document.querySelectorAll('header, nav, aside, [data-slot="sidebar"], .sidebar, .app-sidebar').forEach(el => {
          if (el === header || header.contains(el)) return;
          if (el.closest('#saptix-customizer-container') || el.closest('#saptix-command-palette-container')) return;
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed' || style.position === 'sticky') {
            const rect = el.getBoundingClientRect();
            if (rect.top < 48 && rect.bottom > 0) {
              el.style.setProperty('top', '48px', 'important');
              if (style.height.includes('100vh') || style.height === `${window.innerHeight}px`) {
                el.style.setProperty('height', 'calc(100vh - 48px)', 'important');
              }
            }
          }
        });
      } catch (_) {}
    }
    adjustOverlappingElements();
    window.addEventListener('resize', adjustOverlappingElements);
    window.addEventListener('load', adjustOverlappingElements);

    // Mutual Exclusivity Controller
    const launcherBtn = document.getElementById('saptix-launcher-btn');
    const launcherMenu = document.getElementById('saptix-launcher-dropdown');
    const userBtn = document.getElementById('saptix-user-btn');
    const userDropdown = document.getElementById('saptix-user-dropdown');
    const drawer = document.getElementById('saptix-theme-drawer');
    const backdrop = document.getElementById('saptix-theme-backdrop');
    const searchTrigger = document.getElementById('saptix-search-trigger');
    const cmdBackdrop = document.getElementById('saptix-command-backdrop');
    const cmdCloseBtn = document.getElementById('saptix-command-close-btn');
    const cmdInput = document.getElementById('saptix-command-input');

    function closeAllOverlays() {
      if (launcherMenu) launcherMenu.classList.remove('open');
      if (userDropdown) userDropdown.classList.remove('open');
      if (commandPaletteContainer) commandPaletteContainer.classList.remove('open');
      if (drawer) drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
    }

    if (searchTrigger) {
      searchTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        openCommandPalette();
      });
    }

    if (cmdBackdrop) cmdBackdrop.addEventListener('click', closeCommandPalette);
    if (cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCommandPalette);

    if (cmdInput) {
      cmdInput.addEventListener('input', (e) => {
        renderCommandResults(e.target.value);
      });
      cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (filteredCommandItems.length > 0) {
            selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommandItems.length;
            updateCommandSelection();
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (filteredCommandItems.length > 0) {
            selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommandItems.length) % filteredCommandItems.length;
            updateCommandSelection();
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredCommandItems[selectedCommandIndex]) {
            executeCommand(filteredCommandItems[selectedCommandIndex]);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeCommandPalette();
        }
      });
    }

    // Bind App Launcher Switcher
    if (launcherBtn && launcherMenu) {
      launcherBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = launcherMenu.classList.contains('open');
        closeAllOverlays();
        if (!isOpen) launcherMenu.classList.add('open');
      });
      document.addEventListener('click', (e) => {
        if (!launcherMenu.contains(e.target) && e.target !== launcherBtn && !launcherBtn.contains(e.target)) {
          launcherMenu.classList.remove('open');
        }
      });
    }

    // Bind Saptix User Menu Dropdown
    const logoutLink = document.getElementById('saptix-logout-link');
    if (userBtn && userDropdown) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = userDropdown.classList.contains('open');
        closeAllOverlays();
        if (!isOpen) userDropdown.classList.add('open');
      });

      document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target) && e.target !== userBtn && !userBtn.contains(e.target)) {
          userDropdown.classList.remove('open');
        }
      });
    }

    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          localStorage.removeItem('saptix_token');
          localStorage.removeItem('saptix_user');
          localStorage.removeItem('saptix_session');
          localStorage.removeItem('saptix_sso_session');
          localStorage.removeItem('access_token');
          sessionStorage.clear();
        } catch (_) {}

        const expired = '=; Domain=.saptix.tech; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        document.cookie = 'saptix_token' + expired;
        document.cookie = 'saptix_session' + expired;
        document.cookie = 'saptix_sso_session' + expired;
        document.cookie = 'saptix_auth' + expired;
        document.cookie = 'token' + expired;

        const targetRedirect = window.location.origin + '/login?logged_out=1';
        window.location.href = 'https://auth.saptix.tech/api/auth/logout?redirect=' + encodeURIComponent(targetRedirect);
      });
    }

    // Dynamic Saptix Auth Session & Access Resolver
    (async function resolveActiveUser() {
      const isLoginPage = window.location.pathname === '/login' || 
                          window.location.pathname.startsWith('/login/') ||
                          document.querySelector('.form-panel') !== null;
      const userWrapper = document.querySelector('.saptix-user-wrapper');

      // If on login page, remove user menu button completely to eliminate non-functional buttons
      if (isLoginPage) {
        if (userWrapper) userWrapper.style.display = 'none';
        return;
      }

      try {
        const res = await fetch('https://auth.saptix.tech/api/auth/me', {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          const user = data.user || data;
          if (user && user.email) {
            const displayName = user.name || user.email.split('@')[0];
            const initial = displayName.charAt(0).toUpperCase();
            const isAdmin = user.role === 'admin';
            const roleName = isAdmin ? 'Enterprise Administrator' : (user.role || 'Member');
            
            const btnName = document.getElementById('saptix-user-name');
            const btnAvatar = document.getElementById('saptix-user-avatar');
            const menuAvatar = document.getElementById('saptix-menu-avatar');
            const menuEmail = document.getElementById('saptix-menu-email');
            const menuRole = document.getElementById('saptix-menu-role');

            if (btnName) btnName.textContent = displayName;
            if (btnAvatar) btnAvatar.textContent = initial;
            if (menuAvatar) menuAvatar.textContent = initial;
            if (menuEmail) menuEmail.textContent = user.email;
            if (menuRole) menuRole.textContent = roleName;

            const adminItem = document.getElementById('saptix-admin-nav-item');
            const authItem = document.getElementById('saptix-auth-nav-item');
            if (isAdmin) {
              if (adminItem) adminItem.style.display = 'flex';
              if (authItem) authItem.style.display = 'flex';
            } else {
              if (adminItem) adminItem.remove();
              if (authItem) authItem.remove();
            }
          }
        }
      } catch (e) {}
    })();

    const paletteBtn = document.getElementById('saptix-palette-btn');
    const closeBtn = document.getElementById('saptix-drawer-close');
    const resetBtn = document.getElementById('saptix-customizer-reset');

    function openThemeDrawer() {
      if (!drawer || !backdrop) return;
      closeAllOverlays();
      syncDrawerState();
      backdrop.classList.add('open');
      drawer.classList.add('open');
    }

    function closeThemeDrawer() {
      if (!drawer || !backdrop) return;
      backdrop.classList.remove('open');
      drawer.classList.remove('open');
      closeAllDropdowns();
    }

    function toggleThemeDrawer() {
      if (drawer && drawer.classList.contains('open')) {
        closeThemeDrawer();
      } else {
        openThemeDrawer();
      }
    }

    if (paletteBtn) {
      paletteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleThemeDrawer();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeThemeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeThemeDrawer);

    // Quick Sun/Moon Toggle Button in Topbar
    const themeBtn = document.getElementById('saptix-theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentCfg = getThemeConfig();
        const isDark = document.documentElement.classList.contains('dark');
        currentCfg.mode = isDark ? 'light' : 'dark';
        saveThemeConfig(currentCfg);
        applyTheme();
        syncDrawerState();
      });
    }

    // Reset All Defaults Button
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        saveThemeConfig({ ...DEFAULT_CONFIG });
        applyTheme();
        syncDrawerState();
      });
    }

    // Custom Select Dropdowns
    const presetTrigger = document.getElementById('saptix-preset-trigger');
    const presetWrapper = presetTrigger?.closest('.saptix-select-wrapper');
    const fontTrigger = document.getElementById('saptix-font-trigger');
    const fontWrapper = fontTrigger?.closest('.saptix-select-wrapper');

    function closeAllDropdowns() {
      document.querySelectorAll('.saptix-select-wrapper').forEach(w => w.classList.remove('open'));
    }

    if (presetTrigger && presetWrapper) {
      presetTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = presetWrapper.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) presetWrapper.classList.add('open');
      });
    }

    if (fontTrigger && fontWrapper) {
      fontTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = fontWrapper.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) fontWrapper.classList.add('open');
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.saptix-select-wrapper')) {
        closeAllDropdowns();
      }
    });

    // Preset Selection
    document.querySelectorAll('#saptix-preset-menu .saptix-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const val = item.getAttribute('data-value');
        const c = getThemeConfig();
        c.preset = val;
        saveThemeConfig(c);
        applyTheme();
        syncDrawerState();
        closeAllDropdowns();
      });
    });

    // Font Selection
    document.querySelectorAll('#saptix-font-menu .saptix-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const val = item.getAttribute('data-value');
        const c = getThemeConfig();
        c.font = val;
        saveThemeConfig(c);
        applyTheme();
        syncDrawerState();
        closeAllDropdowns();
      });
    });

    // Segmented Buttons (Mode, Radius, Layout, Scale, Sidebar)
    document.querySelectorAll('.saptix-segmented-control').forEach(ctrl => {
      const prop = ctrl.getAttribute('data-prop');
      ctrl.querySelectorAll('.saptix-seg-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.getAttribute('data-val');
          const c = getThemeConfig();
          c[prop] = val;
          saveThemeConfig(c);
          applyTheme();
          syncDrawerState();
        });
      });
    });

    // Sync Drawer state with current config
    function syncDrawerState() {
      const c = getThemeConfig();

      // Preset dropdown
      const presetDot = document.getElementById('saptix-preset-dot');
      const presetText = document.getElementById('saptix-preset-text');
      if (presetDot && presetText) {
        const pObj = COLOR_PRESETS[c.preset] || COLOR_PRESETS.default;
        presetDot.style.backgroundColor = pObj.hex;
        presetText.textContent = pObj.name;
      }
      document.querySelectorAll('#saptix-preset-menu .saptix-dropdown-item').forEach(item => {
        const match = item.getAttribute('data-value') === c.preset;
        item.classList.toggle('active', match);
        const check = item.querySelector('.saptix-item-check');
        if (match && !check) item.insertAdjacentHTML('beforeend', '<span class="saptix-item-check">✓</span>');
        else if (!match && check) check.remove();
      });

      // Font dropdown
      const fontText = document.getElementById('saptix-font-text');
      if (fontText) fontText.textContent = FONT_OPTIONS[c.font]?.label || 'Geist';
      document.querySelectorAll('#saptix-font-menu .saptix-dropdown-item').forEach(item => {
        const match = item.getAttribute('data-value') === c.font;
        item.classList.toggle('active', match);
        const check = item.querySelector('.saptix-item-check');
        if (match && !check) item.insertAdjacentHTML('beforeend', '<span class="saptix-item-check">✓</span>');
        else if (!match && check) check.remove();
      });

      // Segmented controls
      ['mode', 'radius', 'layout', 'scale', 'sidebarVariant', 'sidebarMode'].forEach(prop => {
        const container = document.querySelector(`.saptix-segmented-control[data-prop="${prop}"]`);
        if (container) {
          container.querySelectorAll('.saptix-seg-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-val') === c[prop]);
          });
        }
      });
    }

    // 9. ROBUST KEYBOARD SHORTCUT HANDLING: Alt+T / Cmd+K / Esc
    window.addEventListener('keydown', (e) => {
      // Alt+T (Windows/Linux) or Option+T (macOS) opens Theme Customizer
      if (e.altKey && (e.code === 'KeyT' || (e.key && e.key.toLowerCase() === 't'))) {
        e.preventDefault();
        toggleThemeDrawer();
        return;
      }

      // Cmd+K / Ctrl+K opens Command Palette / Quick Search
      if ((e.metaKey || e.ctrlKey) && (e.code === 'KeyK' || (e.key && e.key.toLowerCase() === 'k'))) {
        e.preventDefault();
        const isOpen = commandPaletteContainer.classList.contains('open');
        if (isOpen) closeCommandPalette();
        else openCommandPalette();
        return;
      }

      // Escape closes any open overlay
      if (e.key === 'Escape') {
        if (commandPaletteContainer && commandPaletteContainer.classList.contains('open')) {
          closeCommandPalette();
          return;
        }
        if (drawer && drawer.classList.contains('open')) {
          closeThemeDrawer();
          return;
        }
        if (launcherMenu && launcherMenu.classList.contains('open')) {
          launcherMenu.classList.remove('open');
          return;
        }
        if (userDropdown && userDropdown.classList.contains('open')) {
          userDropdown.classList.remove('open');
          return;
        }
      }
    }, { capture: true, passive: false });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderUniversalHeader);
  } else {
    renderUniversalHeader();
  }
})();
