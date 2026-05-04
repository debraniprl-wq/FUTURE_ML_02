// Mock data and storage handlers
const Storage = {
  get(key, defaultVal) {
    const val = localStorage.getItem(`neurodesk_${key}`);
    return val ? JSON.parse(val) : defaultVal;
  },
  set(key, val) {
    localStorage.setItem(`neurodesk_${key}`, JSON.stringify(val));
  }
};

const MockData = {
  categories: ['Billing', 'Technical Issue', 'Account', 'General Query', 'Bug Report', 'Feature Request'],
  priorities: ['Critical', 'High', 'Medium', 'Low'],
  statuses: ['Open', 'In Progress', 'Resolved', 'Closed'],
  
  teams: {
    'Billing': 'Billing',
    'Technical Issue': 'Technical',
    'Bug Report': 'Technical',
    'Feature Request': 'Product',
    'Account': 'Support',
    'General Query': 'Support'
  },

  slaHours: {
    'Critical': 2,
    'High': 6,
    'Medium': 24,
    'Low': 48
  },

  generateTickets(count) {
    const tickets = [];
    for (let i = 0; i < count; i++) {
      const isRecent = i < 15;
      const category = this.categories[Math.floor(Math.random() * this.categories.length)];
      
      // Weight priorities
      let priority;
      const r = Math.random();
      if (r < 0.1) priority = 'Critical';
      else if (r < 0.3) priority = 'High';
      else if (r < 0.7) priority = 'Medium';
      else priority = 'Low';

      const status = this.statuses[Math.floor(Math.random() * this.statuses.length)];
      
      // Fake dates over the last 30 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      if (isRecent) date.setHours(new Date().getHours() - Math.floor(Math.random() * 5));

      // Calculate SLA deadline
      const slaDeadline = new Date(date);
      slaDeadline.setHours(slaDeadline.getHours() + this.slaHours[priority]);

      // Assign team
      const team = this.teams[category] || 'Support';

      // Random sentiment
      const sentiments = ['Neutral', 'Neutral', 'Neutral', 'Happy', 'Angry'];
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

      tickets.push({
        id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: this.generateSubject(category),
        category,
        priority,
        status,
        team,
        sentiment,
        confidence: Math.floor(65 + Math.random() * 34), // 65-99
        date: date.toISOString(),
        slaDeadline: slaDeadline.toISOString(),
        customer: `Customer ${Math.floor(Math.random() * 1000)}`
      });
    }
    // Sort by date desc
    return tickets.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  generateSubject(category) {
    const subjects = {
      'Billing': ['Invoice incorrect', 'Double charged on my card', 'Where is my refund?', 'Payment failing', 'Subscription renewal issue', 'Credit card expired error'],
      'Technical Issue': ['API not responding', 'Dashboard is blank', 'Cannot export data', 'Integration failing', 'System slow', 'High latency on endpoint'],
      'Account': ['Cannot login', 'Reset password', 'Change email address', 'Delete my account', 'Two-factor auth locked', 'Update profile picture'],
      'General Query': ['How to use feature X', 'Pricing question', 'Do you offer enterprise plans?', 'Contact sales', 'Where are the docs?', 'Office hours'],
      'Bug Report': ['App crashes on iOS', 'Typo on homepage', 'Error 500 when saving', 'Layout broken on mobile', 'Search not working', 'Null pointer exception in console'],
      'Feature Request': ['Add dark mode', 'More export options', 'Zapier integration', 'Custom fields', 'Bulk actions needed', 'API webhook support']
    };
    const list = subjects[category];
    return list[Math.floor(Math.random() * list.length)];
  },

  init() {
    if (!Storage.get('tickets')) {
      Storage.set('tickets', this.generateTickets(150));
    }
    if (!Storage.get('settings')) {
      Storage.set('settings', { theme: 'dark', role: 'admin', notifications: true });
    }
  }
};

MockData.init();
