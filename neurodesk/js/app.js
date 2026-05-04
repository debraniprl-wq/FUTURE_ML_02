// Core App Logic & Routing
const App = {
  routes: {
    'landing': { render: () => LandingPage.render(), init: () => LandingPage.init() },
    'dashboard': { render: () => DashboardPage.render(), init: () => DashboardPage.init() },
    'analyze': { render: () => AnalyzerPage.render(), init: () => AnalyzerPage.init() },
    'upload': { render: () => UploadPage.render(), init: () => UploadPage.init() },
    'insights': { render: () => InsightsPage.render(), init: () => InsightsPage.init() },
    'team': { render: () => TeamPage.render(), init: () => TeamPage.init() },
    'integrations': { render: () => IntegrationsPage.render(), init: () => IntegrationsPage.init() },
    'settings': { render: () => SettingsPage.render(), init: () => SettingsPage.init() }
  },

  init() {
    this.bindEvents();
    this.loadSettings();
    
    // Initial Route
    const hash = window.location.hash.replace('#/', '') || 'landing';
    this.navigate(hash, false);

    // Initial Icons
    lucide.createIcons();
    
    // Simulate initial notifications
    this.addNotification('System updated to v2.1', 'info');
    setTimeout(() => {
      if(Storage.get('settings').notifications) {
        this.addNotification('SLA Risk: 3 critical tickets pending', 'warning');
      }
    }, 5000);
  },

  bindEvents() {
    // Hash routing
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#/', '') || 'landing';
      this.navigate(hash, false);
    });

    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    });

    // Menu Toggle
    document.getElementById('menu-toggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });

    // Notifications
    document.getElementById('notif-btn').addEventListener('click', () => {
      document.getElementById('notif-panel').classList.toggle('hidden');
    });
  },

  navigate(page, updateHash = true) {
    if (!this.routes[page]) page = 'landing';
    
    if (updateHash) {
      window.location.hash = `/${page}`;
      return; // hashchange event will trigger actual navigation
    }

    // Update UI
    document.getElementById('page-content').innerHTML = this.routes[page].render();
    
    // Update Sidebar
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navItem = document.getElementById(`nav-${page}`);
    if (navItem) navItem.classList.add('active');

    // Update Breadcrumb
    const labels = {
      'landing': 'Home',
      'dashboard': 'Dashboard',
      'analyze': 'Ticket Analyzer',
      'upload': 'Bulk Upload',
      'insights': 'Insights',
      'team': 'Team Performance',
      'integrations': 'Integrations',
      'settings': 'Settings'
    };
    document.getElementById('page-breadcrumb').textContent = labels[page];

    // Close sidebar on mobile
    document.getElementById('sidebar').classList.remove('open');

    // Run page specific init
    setTimeout(() => {
      this.routes[page].init();
      lucide.createIcons();
    }, 0);
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const settings = Storage.get('settings');
    settings.theme = theme;
    Storage.set('settings', settings);
    
    const icon = document.getElementById('theme-icon');
    icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
    lucide.createIcons();
    
    // Update charts if needed
    Chart.defaults.color = theme === 'dark' ? '#a0a0ab' : '#495057';
    if (window.location.hash.includes('dashboard')) DashboardPage.init();
    if (window.location.hash.includes('insights')) InsightsPage.init();
  },

  setRole(role) {
    const settings = Storage.get('settings');
    settings.role = role;
    Storage.set('settings', settings);
    
    document.getElementById('role-admin-btn').classList.toggle('active', role === 'admin');
    document.getElementById('role-agent-btn').classList.toggle('active', role === 'agent');
    document.getElementById('sidebar-role-badge').textContent = role === 'admin' ? 'Admin' : 'Agent';
    
    this.showToast('Role Switched', `You are now viewing as ${role}.`, 'info');
  },

  loadSettings() {
    const settings = Storage.get('settings');
    this.setTheme(settings.theme);
    this.setRole(settings.role);
  },

  showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'alert-octagon';
    if (type === 'warning') icon = 'alert-triangle';

    toast.innerHTML = `
      <div class="toast-icon ${type}"><i data-lucide="${icon}"></i></div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    container.appendChild(toast);
    lucide.createIcons({root: toast});
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  addNotification(message, type) {
    const list = document.getElementById('notif-list');
    const badge = document.getElementById('notif-badge');
    
    let count = parseInt(badge.textContent) || 0;
    badge.textContent = count + 1;

    const item = document.createElement('div');
    item.className = 'notif-item';
    item.innerHTML = `
      <div class="notif-icon ${type}"><i data-lucide="${type === 'warning' ? 'alert-triangle' : 'info'}"></i></div>
      <div class="notif-content">
        <p>${message}</p>
        <div class="notif-time">Just now</div>
      </div>
    `;
    list.prepend(item);
    lucide.createIcons({root: item});
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
