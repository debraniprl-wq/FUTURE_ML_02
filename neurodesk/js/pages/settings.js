const SettingsPage = {
  render() {
    const settings = Storage.get('settings');
    const isDark = settings.theme === 'dark';
    const notifs = settings.notifications;

    return `
      <div style="max-width: 800px; margin: 0 auto;">
        <div style="margin-bottom: 32px;">
          <h2 class="card-title" style="font-size:1.5rem;margin-bottom:8px">Settings</h2>
          <p style="color:var(--text-secondary)">Manage your preferences and workspace configuration.</p>
        </div>

        <div class="card" style="margin-bottom:24px">
          <div class="card-title">Appearance</div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid var(--border-color)">
            <div>
              <div style="font-weight:500;margin-bottom:4px">Theme Mode</div>
              <div style="font-size:0.875rem;color:var(--text-secondary)">Toggle between Dark and Light mode.</div>
            </div>
            <button class="btn btn-secondary" onclick="document.getElementById('theme-toggle').click()">
              Toggle Theme
            </button>
          </div>
        </div>

        <div class="card" style="margin-bottom:24px">
          <div class="card-title">Notifications</div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid var(--border-color)">
            <div>
              <div style="font-weight:500;margin-bottom:4px">Enable Alerts</div>
              <div style="font-size:0.875rem;color:var(--text-secondary)">Receive popups for critical SLA warnings.</div>
            </div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;">
              <input type="checkbox" id="notif-toggle" style="opacity:0;width:0;height:0" ${notifs ? 'checked' : ''} onchange="SettingsPage.toggleNotifs(this.checked)">
              <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:${notifs ? 'var(--primary-color)' : 'var(--text-muted)'};transition:.4s;border-radius:34px;">
                <span style="position:absolute;content:'';height:18px;width:18px;left:3px;bottom:3px;background-color:white;transition:.4s;border-radius:50%;transform:${notifs ? 'translateX(20px)' : 'translateX(0)'}"></span>
              </span>
            </label>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="color:var(--danger-color)">Danger Zone</div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 0;">
            <div>
              <div style="font-weight:500;margin-bottom:4px">Reset Mock Data</div>
              <div style="font-size:0.875rem;color:var(--text-secondary)">Clear local storage and regenerate seed tickets.</div>
            </div>
            <button class="btn" style="background:var(--danger-color);color:white" onclick="SettingsPage.resetData()">Reset Data</button>
          </div>
        </div>
      </div>
    `;
  },

  init() {},

  toggleNotifs(val) {
    const settings = Storage.get('settings');
    settings.notifications = val;
    Storage.set('settings', settings);
    App.showToast('Settings Updated', 'Notification preferences saved.', 'success');
    
    // Re-render settings to update toggle visually
    setTimeout(() => App.navigate('settings', false), 100);
  },

  resetData() {
    if(confirm('Are you sure? This will wipe all generated tickets and recreate them.')) {
      localStorage.removeItem('neurodesk_tickets');
      MockData.init();
      App.showToast('Data Reset', 'Mock data has been regenerated.', 'info');
      setTimeout(() => App.navigate('dashboard'), 1000);
    }
  }
};
