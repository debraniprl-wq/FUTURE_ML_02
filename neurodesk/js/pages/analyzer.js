const AnalyzerPage = {
  render() {
    return `
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="margin-bottom: 32px;">
          <h2 class="card-title" style="font-size:1.5rem;margin-bottom:8px">AI Ticket Analyzer</h2>
          <p style="color:var(--text-secondary)">Test the classification engine in real-time. Paste a support ticket below.</p>
        </div>

        <div class="analyzer-grid">
          <div class="analyze-input-section">
            <div class="card animate-hover">
              <div class="form-group">
                <label class="form-label">Customer Message</label>
                <textarea id="analyze-input" class="form-control" placeholder="E.g. Hi, I've been trying to process a payment but the system keeps crashing with a 500 error. This is urgent as we are blocked."></textarea>
              </div>
              <button class="btn btn-primary" style="width:100%" onclick="AnalyzerPage.runAnalysis()">
                <i data-lucide="cpu"></i> Analyze Ticket
              </button>
            </div>
            
            <div style="margin-top:24px;display:flex;gap:8px;flex-wrap:wrap">
              <span style="font-size:0.75rem;color:var(--text-muted);width:100%;margin-bottom:4px">Try examples:</span>
              <button class="btn btn-secondary" style="font-size:0.75rem;padding:4px 8px" onclick="AnalyzerPage.loadExample('billing')">Billing</button>
              <button class="btn btn-secondary" style="font-size:0.75rem;padding:4px 8px" onclick="AnalyzerPage.loadExample('bug')">Urgent Bug (Angry)</button>
              <button class="btn btn-secondary" style="font-size:0.75rem;padding:4px 8px" onclick="AnalyzerPage.loadExample('feature')">Feature Req (Happy)</button>
            </div>
          </div>

          <div class="analyze-results-section">
            <div class="result-card" id="result-container">
              <div class="result-header">
                <div style="display:flex;align-items:center;gap:12px">
                  <div style="padding:10px;background:rgba(0,212,255,0.1);color:var(--accent-color);border-radius:var(--radius-md)">
                    <i data-lucide="zap"></i>
                  </div>
                  <div>
                    <div style="font-weight:600;font-size:1.125rem">Analysis Complete</div>
                    <div style="font-size:0.75rem;color:var(--text-muted)">Processed in 42ms</div>
                  </div>
                </div>
                <div class="result-score" style="min-width: 120px;">
                  <div class="score-value" id="res-confidence">94%</div>
                  <progress id="res-conf-bar" max="100" value="94" class="conf-high" style="margin-top:4px;height:4px"></progress>
                </div>
              </div>

              <div class="result-grid">
                <div>
                  <div class="result-item-label">Category & Routing</div>
                  <div class="result-item-value" id="res-category">Billing</div>
                </div>
                <div>
                  <div class="result-item-label">SLA Priority</div>
                  <div class="result-item-value"><span class="badge" id="res-priority-badge">High</span></div>
                </div>
                <div>
                  <div class="result-item-label">Sentiment</div>
                  <div class="result-item-value" style="display:flex;align-items:center;gap:6px">
                    <span id="res-sentiment-emoji" class="sentiment-emoji">😐</span>
                    <span id="res-sentiment-text">Neutral</span>
                  </div>
                </div>
                <div>
                  <div class="result-item-label">Extracted Tags</div>
                  <div id="res-tags" style="display:flex;gap:6px;flex-wrap:wrap;">
                    <!-- Tags -->
                  </div>
                </div>
              </div>

              <div class="explanation-panel" style="margin-bottom:16px;">
                <div class="explanation-title"><i data-lucide="info" style="width:16px;height:16px"></i> AI Reasoning</div>
                <div class="explanation-text" id="res-explanation">
                  Explanation goes here.
                </div>
              </div>

              <div class="explanation-panel" style="background:rgba(108,99,255,0.05);border-color:rgba(108,99,255,0.2)">
                <div class="explanation-title" style="color:var(--primary-color)"><i data-lucide="message-square" style="width:16px;height:16px"></i> Suggested Agent Reply</div>
                <div class="explanation-text" id="res-suggested-reply" style="white-space:pre-wrap;font-family:var(--font-sans);font-size:0.875rem;line-height:1.5;">
                </div>
                <button class="btn btn-secondary" style="font-size:0.75rem;padding:4px 8px;margin-top:12px;" onclick="App.showToast('Copied', 'Reply copied to clipboard', 'info')"><i data-lucide="copy" style="width:12px;height:12px"></i> Copy</button>
              </div>
              
              <button class="btn btn-secondary" style="width:100%;margin-top:24px" onclick="App.showToast('Saved', 'Added to dataset', 'success')">Save to Database</button>
            </div>
            
            <div id="empty-state" style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text-muted);border:2px dashed var(--border-color);border-radius:var(--radius-lg);padding:32px;text-align:center">
              <i data-lucide="sparkles" style="width:48px;height:48px;margin-bottom:16px;color:var(--border-color)"></i>
              <p>Enter text to see the AI classification<br>and reasoning in action.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {},

  loadExample(type) {
    const examples = {
      'billing': "Hello, I noticed I was charged twice for my subscription this month. Can you please check my invoice and issue a refund for the duplicate charge? Thanks.",
      'bug': "This is absolutely unacceptable and ridiculous! The production server is down! We keep getting a 500 error every time someone tries to login. We are completely blocked right now and losing money.",
      'feature': "I love the app, it's really amazing! But it would be really great if you could add a dark mode feature. Thanks for the awesome work!"
    };
    const input = document.getElementById('analyze-input');
    input.value = examples[type];
    
    // Auto run after brief delay
    setTimeout(() => this.runAnalysis(), 300);
  },

  runAnalysis() {
    const text = document.getElementById('analyze-input').value.trim();
    if (!text) {
      App.showToast('Error', 'Please enter some text to analyze', 'error');
      return;
    }

    const btn = document.querySelector('.analyze-input-section .btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader" class="spin"></i> Analyzing...';
    lucide.createIcons({root: btn});

    // Simulate network delay
    setTimeout(() => {
      const result = Classifier.analyze(text);
      this.displayResult(result);
      
      btn.innerHTML = originalText;
      lucide.createIcons({root: btn});
      App.showToast('Success', 'Classification complete', 'success');
    }, 600);
  },

  displayResult(res) {
    document.getElementById('empty-state').style.display = 'none';
    const container = document.getElementById('result-container');
    container.classList.remove('active');
    
    // Force reflow
    void container.offsetWidth;
    
    document.getElementById('res-confidence').textContent = `${res.confidence}%`;
    const confBar = document.getElementById('res-conf-bar');
    confBar.value = res.confidence;
    confBar.className = res.confidence > 85 ? 'conf-high' : (res.confidence > 70 ? 'conf-med' : 'conf-low');
    
    document.getElementById('res-category').innerHTML = `${res.category} <span class="text-muted" style="font-size:0.75rem;margin-left:4px">→ Route to ${MockData.teams[res.category]||'Support'}</span>`;
    
    const badge = document.getElementById('res-priority-badge');
    badge.className = `badge badge-${res.priority.toLowerCase()}`;
    badge.textContent = res.priority;

    let emoji = res.sentiment === 'Angry' ? '😡' : (res.sentiment === 'Happy' ? '😊' : '😐');
    let color = res.sentiment === 'Angry' ? 'var(--danger-color)' : (res.sentiment === 'Happy' ? 'var(--success-color)' : 'var(--text-secondary)');
    
    document.getElementById('res-sentiment-emoji').textContent = emoji;
    document.getElementById('res-sentiment-text').textContent = res.sentiment;
    document.getElementById('res-sentiment-text').style.color = color;
    
    document.getElementById('res-tags').innerHTML = res.tags.map(t => `<span class="tag-chip">#${t}</span>`).join('');
    
    document.getElementById('res-explanation').innerHTML = res.explanation;
    document.getElementById('res-suggested-reply').textContent = res.suggestedReply;
    
    container.classList.add('active');
  }
};
