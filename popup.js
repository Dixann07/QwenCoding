// popup.js - Handles job display and follow-up email generation

// Calculate days since application
function getDaysSince(dateStr) {
    const appDate = new Date(dateStr);
    const today = new Date();
    const diffTime = today - appDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Format days for display
function formatDays(days) {
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
}

// Load and display jobs
function loadJobs() {
    const jobsDiv = document.getElementById('jobs');
    const totalCount = document.getElementById('total-count');
    const pendingCount = document.getElementById('pending-count');
    const draftBtn = document.getElementById('draft-btn');

    chrome.storage.local.get(['jobs'], (data) => {
        const jobs = data.jobs || [];

        // Update stats
        totalCount.textContent = jobs.length;
        const needFollowUp = jobs.filter(job => getDaysSince(job.date) >= 7).length;
        pendingCount.textContent = needFollowUp;

        if (jobs.length === 0) {
            jobsDiv.innerHTML = `
        <div class="empty-state">
          <div class="icon">📋</div>
          <p>No jobs tracked yet.<br>Apply on LinkedIn, Indeed, or other job sites to get started!</p>
        </div>
      `;
            draftBtn.disabled = true;
            return;
        }

        draftBtn.disabled = false;

        // Sort by date (newest first for display, but oldest first for follow-up)
        const sortedJobs = [...jobs].sort((a, b) => new Date(b.date) - new Date(a.date));

        jobsDiv.innerHTML = '';
        sortedJobs.forEach((job, index) => {
            const days = getDaysSince(job.date);
            const isUrgent = days >= 7;

            const div = document.createElement('div');
            div.className = 'job-card';
            div.innerHTML = `
        <button class="delete-btn" data-index="${jobs.indexOf(job)}" title="Remove">❌</button>
        <div class="role">${escapeHtml(job.role)}</div>
        <div class="company">${escapeHtml(job.company)}</div>
        <div class="meta">
          <span class="days-badge ${isUrgent ? 'urgent' : ''}">${formatDays(days)}</span>
          ${isUrgent ? '<span>⚠️ Follow up!</span>' : ''}
        </div>
      `;

            // Add click to open job URL
            div.addEventListener('click', (e) => {
                if (!e.target.classList.contains('delete-btn')) {
                    chrome.tabs.create({ url: job.url });
                }
            });
            div.style.cursor = 'pointer';

            jobsDiv.appendChild(div);
        });

        // Add delete handlers
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                deleteJob(index);
            });
        });
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Delete a job
function deleteJob(index) {
    chrome.storage.local.get(['jobs'], (data) => {
        const jobs = data.jobs || [];
        jobs.splice(index, 1);
        chrome.storage.local.set({ jobs }, loadJobs);
    });
}

// Clear all jobs
document.getElementById('clear-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all tracked applications?')) {
        chrome.storage.local.set({ jobs: [] }, loadJobs);
        showStatus('All applications cleared', 'success');
    }
});

// Generate follow-up email (using local template for MVP)
document.getElementById('draft-btn').addEventListener('click', () => {
    chrome.storage.local.get(['jobs'], (data) => {
        const jobs = data.jobs || [];
        if (jobs.length === 0) {
            showStatus('No jobs to follow up on!', 'error');
            return;
        }

        // Get oldest job that needs follow-up (7+ days)
        const sortedJobs = [...jobs].sort((a, b) => new Date(a.date) - new Date(b.date));
        const oldest = sortedJobs.find(job => getDaysSince(job.date) >= 7) || sortedJobs[0];
        const days = getDaysSince(oldest.date);

        // Generate email draft
        const draft = generateFollowUpEmail(oldest, days);

        // Copy to clipboard
        navigator.clipboard.writeText(draft).then(() => {
            showStatus(`✅ Follow-up email for ${oldest.company} copied to clipboard!`, 'success');
        }).catch(err => {
            console.error('Clipboard error:', err);
            showStatus('Failed to copy to clipboard', 'error');
        });
    });
});

// Generate follow-up email template
function generateFollowUpEmail(job, daysSince) {
    const timeFrame = daysSince <= 7 ? 'recently' :
        daysSince <= 14 ? 'about two weeks ago' :
            daysSince <= 30 ? 'about a month ago' : 'some time ago';

    return `Subject: Following Up – ${job.role} Application

Hi Hiring Team,

I hope this message finds you well! I applied for the ${job.role} position at ${job.company} ${timeFrame} and wanted to express my continued enthusiasm for this opportunity.

I'm very excited about the possibility of contributing to ${job.company} and believe my skills and experience align well with what you're looking for in this role.

I'd welcome the chance to discuss how my background could benefit your team. Please let me know if you need any additional information from me or if there are any updates on the hiring process.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Phone]
[Your LinkedIn]`;
}

// Show status message
function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = type;

    setTimeout(() => {
        status.className = '';
        status.textContent = '';
    }, 4000);
}

// Load jobs on popup open
document.addEventListener('DOMContentLoaded', loadJobs);
