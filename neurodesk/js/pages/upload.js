const UploadPage = {
  render() {
    return `
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="margin-bottom: 32px;">
          <h2 class="card-title" style="font-size:1.5rem;margin-bottom:8px">Bulk Upload</h2>
          <p style="color:var(--text-secondary)">Upload a CSV of tickets to process them in bulk.</p>
        </div>

        <div class="card">
          <div class="upload-zone" id="drop-zone">
            <input type="file" id="file-input" accept=".csv" />
            <i data-lucide="upload-cloud" class="upload-icon" style="width:48px;height:48px"></i>
            <div class="upload-text">Drag & Drop CSV File</div>
            <div class="upload-subtext">or click to browse from your computer</div>
            <button class="btn btn-secondary" onclick="document.getElementById('file-input').click()">Select File</button>
            <div style="margin-top:16px;font-size:0.75rem;color:var(--text-muted)">Max 5,000 rows. Must contain a "description" or "text" column.</div>
          </div>

          <div class="upload-results" id="upload-results">
            <div class="results-header">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="padding:8px;background:rgba(0,229,160,0.1);color:var(--success-color);border-radius:var(--radius-full)">
                  <i data-lucide="check"></i>
                </div>
                <div>
                  <div style="font-weight:600">Processing Complete</div>
                  <div style="font-size:0.875rem;color:var(--text-secondary)">Processed <span id="res-count">0</span> rows successfully.</div>
                </div>
              </div>
              <button class="btn btn-primary" onclick="App.showToast('Exporting...', 'Downloading CSV', 'info')"><i data-lucide="download"></i> Export Results</button>
            </div>
            
            <div class="table-container" style="max-height:400px;overflow-y:auto;border:1px solid var(--border-color);border-radius:var(--radius-md)">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Original Text (Truncated)</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Conf.</th>
                  </tr>
                </thead>
                <tbody id="csv-results-body">
                  <!-- Rows injected here -->
                </tbody>
              </table>
            </div>
            
            <button class="btn btn-secondary" style="margin-top:24px" onclick="UploadPage.reset()">Upload Another</button>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    // Handle Drag Events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length) this.handleFile(files[0]);
    });

    // Handle File Input
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) this.handleFile(e.target.files[0]);
    });
  },

  handleFile(file) {
    if (!file.name.endsWith('.csv')) {
      App.showToast('Invalid File', 'Please upload a CSV file.', 'error');
      return;
    }

    App.showToast('Uploading', 'Processing CSV file...', 'info');
    document.getElementById('drop-zone').style.display = 'none';

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        this.processData(results.data);
      },
      error: (err) => {
        App.showToast('Parse Error', err.message, 'error');
        this.reset();
      }
    });
  },

  processData(data) {
    // Find text column
    const keys = Object.keys(data[0] || {});
    const textCol = keys.find(k => k.toLowerCase().includes('text') || k.toLowerCase().includes('desc') || k.toLowerCase().includes('subject')) || keys[0];

    const results = [];
    data.forEach(row => {
      const text = row[textCol] || '';
      if(text) {
        const analysis = Classifier.analyze(text);
        results.push({ text, ...analysis });
      }
    });

    document.getElementById('res-count').textContent = results.length;
    
    const tbody = document.getElementById('csv-results-body');
    // Display max 100 rows for perf
    tbody.innerHTML = results.slice(0, 100).map(r => {
      const trunc = r.text.length > 50 ? r.text.substring(0, 50) + '...' : r.text;
      return `
        <tr>
          <td><div style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.text}">${trunc}</div></td>
          <td>${r.category}</td>
          <td><span class="badge badge-${r.priority.toLowerCase()}">${r.priority}</span></td>
          <td>${r.confidence}%</td>
        </tr>
      `;
    }).join('');

    document.getElementById('upload-results').classList.add('active');
    App.showToast('Success', `Processed ${results.length} rows successfully.`, 'success');
  },

  reset() {
    document.getElementById('file-input').value = '';
    document.getElementById('upload-results').classList.remove('active');
    document.getElementById('drop-zone').style.display = 'block';
  }
};
