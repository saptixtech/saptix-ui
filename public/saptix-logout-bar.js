/**
 * Saptix Enterprise Unified Topbar & Design System
 * Dynamic Theme Customizer Integration (No Hardcoded Colors)
 * Expanded Enterprise Suite App Launcher (Full Width & Length)
 */
(function() {
  if (window.__SAPTIX_NAV_LOADED__) return;
  window.__SAPTIX_NAV_LOADED__ = true;

  // Saptix Enterprise Apps Catalog
  const SAPTIX_APPS = [
    { name: 'Core Hub', sub: 'Platform', url: 'https://saptix.tech', desc: 'Main Marketing & Enterprise Hub', icon: '⚡' },
    { name: 'AI Chat', sub: 'Chat', url: 'https://chat.saptix.tech', desc: 'Intelligent AI Agent Workspace', icon: '💬' },
    { name: 'Spectra', sub: 'Spectra', url: 'https://spectra.saptix.tech', desc: 'SAP Cognitive Core & Agent Engine', icon: '🛡️' },
    { name: 'Modeler', sub: 'Modeler', url: 'https://modeler.saptix.tech', desc: 'SAP BTP Architecture & Cloud Modeler', icon: '📊' },
    { name: 'Admin Portal', sub: 'Admin', url: 'https://admin.saptix.tech', desc: 'Enterprise Administration & Security', icon: '⚙️' },
    { name: 'Account & SSO', sub: 'Account', url: 'https://account.saptix.tech', desc: 'User Profile, Tokens & System Settings', icon: '👤' },
    { name: 'Datamachine', sub: 'Datamachine', url: 'https://datamachine.saptix.tech', desc: 'Data Transformation & Processing', icon: '🔄' },
    { name: 'Workflow', sub: 'Workflow', url: 'https://workflow.saptix.tech', desc: 'Automated Agent Orchestration', icon: '🔀' },
    { name: 'Agent Platform', sub: 'Agent', url: 'https://agent.saptix.tech', desc: 'Hermes Multi-Agent Autonomous Swarm', icon: '🤖' },
  ];

  // Primary color preset definitions (aligned with Theme Customizer)
  const COLOR_PRESETS = {
    cyan: { primary: 'oklch(0.78 0.14 200)', hex: '#06b6d4', light: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.35)', glow: '0 0 15px rgba(6, 182, 212, 0.35)' },
    mint: { primary: 'oklch(0.7 0.1192 165)', hex: '#10b981', light: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.35)', glow: '0 0 15px rgba(16, 185, 129, 0.35)' },
    royal: { primary: 'oklch(0.52 0.23 275)', hex: '#4338ca', light: 'rgba(67, 56, 202, 0.18)', border: 'rgba(67, 56, 202, 0.4)', glow: '0 0 15px rgba(67, 56, 202, 0.4)' },
    sky: { primary: 'oklch(0.68 0.16 230)', hex: '#0284c7', light: 'rgba(2, 132, 199, 0.15)', border: 'rgba(2, 132, 199, 0.35)', glow: '0 0 15px rgba(2, 132, 199, 0.35)' },
    indigo: { primary: 'oklch(0.62 0.21 280)', hex: '#6366f1', light: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.35)', glow: '0 0 15px rgba(99, 102, 241, 0.35)' },
    emerald: { primary: 'oklch(0.65 0.19 155)', hex: '#059669', light: 'rgba(5, 150, 105, 0.15)', border: 'rgba(5, 150, 105, 0.35)', glow: '0 0 15px rgba(5, 150, 105, 0.35)' },
    rose: { primary: 'oklch(0.65 0.22 15)', hex: '#e11d48', light: 'rgba(225, 29, 72, 0.15)', border: 'rgba(225, 29, 72, 0.35)', glow: '0 0 15px rgba(225, 29, 72, 0.35)' },
    violet: { primary: 'oklch(0.65 0.22 300)', hex: '#7c3aed', light: 'rgba(124, 58, 237, 0.15)', border: 'rgba(124, 58, 237, 0.35)', glow: '0 0 15px rgba(124, 58, 237, 0.35)' },
    amber: { primary: 'oklch(0.75 0.18 75)', hex: '#d97706', light: 'rgba(217, 119, 6, 0.15)', border: 'rgba(217, 119, 6, 0.35)', glow: '0 0 15px rgba(217, 119, 6, 0.35)' },
    teal: { primary: 'oklch(0.72 0.14 180)', hex: '#0d9488', light: 'rgba(13, 148, 136, 0.15)', border: 'rgba(13, 148, 136, 0.35)', glow: '0 0 15px rgba(13, 148, 136, 0.35)' },
    blue: { primary: 'oklch(0.62 0.19 250)', hex: '#2563eb', light: 'rgba(37, 99, 235, 0.15)', border: 'rgba(37, 99, 235, 0.35)', glow: '0 0 15px rgba(37, 99, 235, 0.35)' },
  };

  // Sync Theme Customizer state
  function syncThemeCustomizer() {
    try {
      const saved = localStorage.getItem('saptix_theme_customizer');
      const custom = saved ? JSON.parse(saved) : {};
      const presetKey = custom.preset || 'cyan';
      const preset = COLOR_PRESETS[presetKey] || COLOR_PRESETS.cyan;
      const root = document.documentElement;

      // Apply preset CSS variables
      root.style.setProperty('--primary', preset.primary);
      root.style.setProperty('--ring', preset.primary);
      root.style.setProperty('--sidebar-primary', preset.primary);
      root.style.setProperty('--color-primary-main', preset.hex);
      root.style.setProperty('--color-primary-light', preset.light);
      root.style.setProperty('--color-primary-border', preset.border);
      root.style.setProperty('--color-primary-glow', preset.glow);

      // Apply radius
      if (custom.radius) {
        root.style.setProperty('--radius', custom.radius);
      }

      // Apply scale
      if (custom.scale) {
        const num = custom.scale === '92.5%' ? 0.925 : custom.scale === '105%' ? 1.05 : 1;
        root.style.setProperty('--interface-scale', String(num));
        (root.style).zoom = String(num);
      }

      // Apply mode
      const isDark = custom.mode ? custom.mode !== 'light' : true;
      if (isDark) {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
      }
    } catch(e) {}
  }

  syncThemeCustomizer();

  // Identify current subdomain
  const hostname = window.location.hostname;
  const currentSub = hostname.split('.')[0];
  const currentApp = SAPTIX_APPS.find(a => hostname.includes(a.sub.toLowerCase())) || { name: 'Saptix Enterprise', sub: 'Platform', icon: '⚡' };

  function renderUniversalHeader() {
    if (document.getElementById('saptix-global-header')) return;

    // Inject fonts if missing
    if (!document.getElementById('saptix-nav-styles')) {
      const link = document.createElement('link');
      link.id = 'saptix-nav-styles';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }

    const header = document.createElement('header');
    header.id = 'saptix-global-header';
    header.className = 'saptix-enterprise-topbar';
    header.innerHTML = `
      <div class="saptix-topbar-inner">
        <!-- Left: Brand + Current App Badge -->
        <div class="saptix-brand-cluster">
          <a href="https://saptix.tech" class="saptix-brand-link">
            <div class="saptix-logo-icon">S</div>
            <span class="saptix-brand-title">Saptix</span>
          </a>
          <span class="saptix-divider">/</span>
          <div class="saptix-app-badge">
            <span class="saptix-app-icon">${currentApp.icon}</span>
            <span class="saptix-app-name">${currentApp.name}</span>
          </div>
        </div>

        <!-- Center: App Launcher / Subdomain Switcher Dropdown (Expanded Length & Width) -->
        <div class="saptix-nav-center">
          <div class="saptix-app-launcher-wrapper">
            <button id="saptix-launcher-btn" class="saptix-launcher-trigger" aria-label="Switch Saptix App">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>
              <span>Apps</span>
              <svg class="saptix-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div id="saptix-launcher-dropdown" class="saptix-launcher-menu">
              <div class="saptix-launcher-header">
                <div class="saptix-launcher-title-box">
                  <span class="saptix-launcher-heading">SAPTIX ENTERPRISE SUITE</span>
                  <span class="saptix-launcher-subheading">Connected Cloud Ecosystem</span>
                </div>
                <span class="saptix-badge-pill">CONNECTED</span>
              </div>
              <div class="saptix-app-grid">
                ${SAPTIX_APPS.map(app => {
                  const isActive = hostname.includes(app.sub.toLowerCase());
                  return `
                    <a href="${app.url}" class="saptix-app-item ${isActive ? 'active' : ''}">
                      <span class="saptix-item-icon">${app.icon}</span>
                      <div class="saptix-item-info">
                        <span class="saptix-item-name">${app.name}</span>
                        <span class="saptix-item-desc">${app.desc}</span>
                      </div>
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Theme Customizer Launcher, Theme Toggle & Profile -->
        <div class="saptix-nav-right">
          <!-- Theme Customizer Palette Icon Button -->
          <button id="saptix-palette-btn" class="saptix-icon-btn" title="Open Theme Customizer (Alt+T)" aria-label="Open Theme Customizer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"/>
            </svg>
          </button>

          <!-- Theme Toggle (Sun/Moon) -->
          <button id="saptix-theme-btn" class="saptix-icon-btn" title="Toggle Light/Dark Theme">
            <span class="saptix-theme-icon">🌙</span>
          </button>

          <!-- User Profile Button -->
          <div class="saptix-user-wrapper">
            <a href="https://account.saptix.tech" class="saptix-user-btn" title="Saptix Account & Profile">
              <div class="saptix-user-avatar">
                ${(window.__SAPTIX_USER__?.name || 'A')[0].toUpperCase()}
              </div>
              <span class="saptix-user-name">${window.__SAPTIX_USER__?.name || 'Admin'}</span>
            </a>
          </div>
        </div>
      </div>
    `;

    // Dynamic styles leveraging Theme Customizer variables (No hardcoded colors)
    const style = document.createElement('style');
    style.textContent = `
      #saptix-global-header {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 48px !important;
        z-index: 999999 !important;
        font-family: var(--font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        background: var(--background, #09090b) !important;
        border-bottom: 1px solid var(--border, #27272a) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        color: var(--foreground, #fafafa) !important;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2) !important;
        transition: all 0.2s ease !important;
      }
      .saptix-topbar-inner {
        max-width: 100% !important;
        height: 100% !important;
        padding: 0 16px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
      }
      .saptix-brand-cluster {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }
      .saptix-brand-link {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        text-decoration: none !important;
        color: inherit !important;
      }
      .saptix-logo-icon {
        width: 28px !important;
        height: 28px !important;
        border-radius: var(--radius, 8px) !important;
        background: linear-gradient(135deg, var(--color-primary-main, #06b6d4), #2563eb) !important;
        color: #fff !important;
        font-weight: 800 !important;
        font-size: 14px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: var(--color-primary-glow, 0 2px 8px rgba(6, 182, 212, 0.4)) !important;
      }
      .saptix-brand-title {
        font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif) !important;
        font-weight: 700 !important;
        font-size: 14px !important;
        letter-spacing: -0.02em !important;
        color: var(--foreground, #fafafa) !important;
      }
      .saptix-divider {
        color: var(--muted-foreground, #71717a) !important;
        opacity: 0.5 !important;
        font-size: 13px !important;
      }
      .saptix-app-badge {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 3px 9px !important;
        border-radius: var(--radius, 6px) !important;
        background: var(--color-primary-light, rgba(6, 182, 212, 0.15)) !important;
        border: 1px solid var(--color-primary-border, rgba(6, 182, 212, 0.35)) !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        color: var(--color-primary-main, #06b6d4) !important;
      }
      .saptix-app-icon { font-size: 12px !important; }
      .saptix-app-name { font-weight: 600 !important; }
      
      .saptix-nav-center {
        display: flex !important;
        align-items: center !important;
      }
      .saptix-app-launcher-wrapper {
        position: relative !important;
      }
      .saptix-launcher-trigger {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 6px 12px !important;
        border-radius: var(--radius, 6px) !important;
        background: var(--card, #121215) !important;
        border: 1px solid var(--border, #27272a) !important;
        color: var(--foreground, #fafafa) !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        transition: all 0.15s ease !important;
      }
      .saptix-launcher-trigger:hover {
        border-color: var(--color-primary-main, #06b6d4) !important;
        background: var(--color-primary-light, rgba(6, 182, 212, 0.15)) !important;
        color: var(--color-primary-main, #06b6d4) !important;
      }
      
      /* ─── EXPANDED SAPTIX ENTERPRISE SUITE BOX ─── */
      .saptix-launcher-menu {
        display: none !important;
        position: absolute !important;
        top: calc(100% + 8px) !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 620px !important;
        max-width: 95vw !important;
        max-height: none !important;
        height: auto !important;
        background: var(--card, #121215) !important;
        border: 1px solid var(--border, #27272a) !important;
        border-radius: calc(var(--radius, 12px) * 1.3) !important;
        box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px var(--border, #27272a) !important;
        padding: 16px !important;
        z-index: 1000000 !important;
      }
      .saptix-launcher-menu.open {
        display: block !important;
        animation: saptixFadeIn 0.15s ease-out !important;
      }
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
        border-bottom: 1px solid var(--border, #27272a) !important;
      }
      .saptix-launcher-title-box {
        display: flex !important;
        flex-direction: column !important;
        gap: 1px !important;
      }
      .saptix-launcher-heading {
        font-size: 12px !important;
        font-weight: 700 !important;
        color: var(--foreground, #fafafa) !important;
        letter-spacing: 0.04em !important;
      }
      .saptix-launcher-subheading {
        font-size: 11px !important;
        color: var(--muted-foreground, #a1a1aa) !important;
      }
      .saptix-badge-pill {
        background: var(--color-primary-light, rgba(6, 182, 212, 0.15)) !important;
        color: var(--color-primary-main, #06b6d4) !important;
        border: 1px solid var(--color-primary-border, rgba(6, 182, 212, 0.35)) !important;
        padding: 3px 8px !important;
        border-radius: 9999px !important;
        font-size: 10px !important;
        font-weight: 700 !important;
        letter-spacing: 0.05em !important;
      }
      .saptix-app-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 8px !important;
        max-height: none !important;
        overflow-y: visible !important;
      }
      .saptix-app-item {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        padding: 10px 12px !important;
        border-radius: var(--radius, 8px) !important;
        text-decoration: none !important;
        background: var(--background, #09090b) !important;
        border: 1px solid var(--border, #27272a) !important;
        color: var(--foreground, #fafafa) !important;
        transition: all 0.15s ease !important;
      }
      .saptix-app-item:hover {
        background: var(--color-primary-light, rgba(6, 182, 212, 0.15)) !important;
        border-color: var(--color-primary-border, rgba(6, 182, 212, 0.35)) !important;
        transform: translateY(-1px) !important;
      }
      .saptix-app-item.active {
        background: var(--color-primary-light, rgba(6, 182, 212, 0.15)) !important;
        border: 1px solid var(--color-primary-main, #06b6d4) !important;
        box-shadow: var(--color-primary-glow, 0 0 10px rgba(6, 182, 212, 0.25)) !important;
      }
      .saptix-item-icon {
        font-size: 18px !important;
        flex-shrink: 0 !important;
      }
      .saptix-item-info {
        display: flex !important;
        flex-direction: column !important;
        min-width: 0 !important;
      }
      .saptix-item-name {
        font-size: 12px !important;
        font-weight: 700 !important;
        color: var(--foreground, #fafafa) !important;
      }
      .saptix-item-desc {
        font-size: 11px !important;
        color: var(--muted-foreground, #a1a1aa) !important;
        line-height: 1.25 !important;
        margin-top: 2px !important;
        white-space: normal !important;
        overflow: visible !important;
        text-overflow: clip !important;
      }

      .saptix-nav-right {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }
      .saptix-icon-btn {
        width: 32px !important;
        height: 32px !important;
        border-radius: var(--radius, 6px) !important;
        background: var(--card, #121215) !important;
        border: 1px solid var(--border, #27272a) !important;
        color: var(--muted-foreground, #a1a1aa) !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 14px !important;
        transition: all 0.15s ease !important;
      }
      .saptix-icon-btn:hover {
        background: var(--color-primary-light, rgba(6, 182, 212, 0.15)) !important;
        border-color: var(--color-primary-border, rgba(6, 182, 212, 0.35)) !important;
        color: var(--color-primary-main, #06b6d4) !important;
      }
      .saptix-user-btn {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        padding: 4px 10px !important;
        border-radius: var(--radius, 6px) !important;
        background: var(--card, #121215) !important;
        border: 1px solid var(--border, #27272a) !important;
        text-decoration: none !important;
        color: var(--foreground, #fafafa) !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        transition: all 0.15s ease !important;
      }
      .saptix-user-btn:hover {
        border-color: var(--color-primary-border, rgba(6, 182, 212, 0.35)) !important;
      }
      .saptix-user-avatar {
        width: 22px !important;
        height: 22px !important;
        border-radius: 50% !important;
        background: var(--color-primary-main, #06b6d4) !important;
        color: #000 !important;
        font-weight: 800 !important;
        font-size: 11px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .saptix-user-name { font-size: 12px !important; font-weight: 600 !important; }

      /* Light Theme Mode */
      html.light #saptix-global-header {
        background: rgba(255, 255, 255, 0.95) !important;
        border-bottom-color: #e2e8f0 !important;
        color: #09090b !important;
      }
      html.light .saptix-launcher-menu {
        background: #ffffff !important;
        border-color: #e2e8f0 !important;
        box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
      }
      html.light .saptix-app-item {
        background: #f8fafc !important;
        border-color: #e2e8f0 !important;
      }
      html.light .saptix-app-item:hover {
        background: #f1f5f9 !important;
      }
      html.light .saptix-icon-btn, html.light .saptix-user-btn, html.light .saptix-launcher-trigger {
        background: #f8fafc !important;
        border-color: #e2e8f0 !important;
        color: #09090b !important;
      }
    `;
    document.head.appendChild(style);
    document.body.prepend(header);

    // Padding offset so body doesn't get hidden behind topbar
    if (document.body) {
      const curPad = parseInt(window.getComputedStyle(document.body).paddingTop || 0);
      if (curPad < 48) {
        document.body.style.paddingTop = '48px';
      }
    }

    // Bind Launcher toggle
    const launcherBtn = document.getElementById('saptix-launcher-btn');
    const launcherMenu = document.getElementById('saptix-launcher-dropdown');
    if (launcherBtn && launcherMenu) {
      launcherBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        launcherMenu.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        launcherMenu.classList.remove('open');
      });
    }

    // Bind Theme Customizer Palette Launcher
    const paletteBtn = document.getElementById('saptix-palette-btn');
    if (paletteBtn) {
      paletteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('saptix:open-theme-customizer'));
        const customizerTrigger = document.querySelector('button[aria-label="Theme Customizer"]');
        if (customizerTrigger) {
          customizerTrigger.click();
        }
      });
    }

    // Bind Theme Switcher
    const themeBtn = document.getElementById('saptix-theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const root = document.documentElement;
        const isDark = root.classList.contains('dark');
        const nextMode = isDark ? 'light' : 'dark';
        
        try {
          const saved = localStorage.getItem('saptix_theme_customizer');
          const current = saved ? JSON.parse(saved) : {};
          current.mode = nextMode;
          localStorage.setItem('saptix_theme_customizer', JSON.stringify(current));
        } catch(e) {}

        syncThemeCustomizer();
        themeBtn.querySelector('.saptix-theme-icon').textContent = nextMode === 'dark' ? '☀️' : '🌙';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderUniversalHeader);
  } else {
    renderUniversalHeader();
  }
})();
