// content.js - Runs on job sites to detect application confirmations

function isApplicationConfirmation() {
  const url = window.location.href;
  const text = document.body.innerText.toLowerCase();

  // LinkedIn - check various confirmation messages
  if (url.includes('linkedin.com/jobs') &&
    (text.includes('your application was sent') ||
      text.includes('application sent') ||
      text.includes('you applied for this job'))) return true;

  // Greenhouse
  if (url.includes('greenhouse.io') && text.includes('thank you for applying')) return true;

  // Lever
  if (url.includes('lever.co') && text.includes('thanks for applying')) return true;

  // Indeed
  if (url.includes('indeed.com') && text.includes('application completed')) return true;

  // Workday
  if (url.includes('workday.com') && text.includes('application submitted')) return true;

  return false;
}

function extractJobInfo() {
  let title = document.title;

  // Clean title (e.g., "Software Engineer at Google | LinkedIn")
  if (title.includes(' at ')) {
    const parts = title.split(' at ');
    const role = parts[0].replace(' | LinkedIn', '').replace(' - Greenhouse', '').trim();
    const company = parts[1].split(' | ')[0].split(' - ')[0].trim();
    return { role, company };
  }

  // Try to extract from page content
  const h1 = document.querySelector('h1');
  if (h1) {
    return { role: h1.innerText.trim(), company: "Unknown Company" };
  }

  // Fallback
  return { role: "Unknown Role", company: "Unknown Company" };
}

function injectTrackButton() {
  // Check if button already exists
  if (document.getElementById('jobtrack-button')) return;

  const { role, company } = extractJobInfo();

  // Create the tracking button
  const button = document.createElement('button');
  button.id = 'jobtrack-button';
  button.innerText = '✅ Track This Job';
  button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    padding: 12px 20px;
    background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(10, 102, 194, 0.4);
    transition: all 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  button.onmouseenter = () => {
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 6px 16px rgba(10, 102, 194, 0.5)';
  };

  button.onmouseleave = () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.4)';
  };

  button.onclick = () => {
    const jobData = {
      role,
      company,
      url: window.location.href,
      date: new Date().toISOString().split('T')[0]
    };

    // Save to chrome storage
    chrome.storage.local.get(['jobs'], (data) => {
      const jobs = data.jobs || [];

      // Check for duplicates
      const exists = jobs.some(job => job.url === jobData.url);
      if (exists) {
        button.innerText = '⚠️ Already Tracked';
        button.style.background = '#ffc107';
        setTimeout(() => button.remove(), 2000);
        return;
      }

      jobs.push(jobData);
      chrome.storage.local.set({ jobs }, () => {
        button.innerText = '✅ Saved!';
        button.style.background = 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)';
        setTimeout(() => button.remove(), 2000);
      });
    });
  };

  document.body.appendChild(button);
}

// Check every 2 seconds (in case page loads slowly)
let checkCount = 0;
const maxChecks = 30; // Stop after 1 minute

const checkInterval = setInterval(() => {
  checkCount++;

  if (isApplicationConfirmation()) {
    clearInterval(checkInterval);
    injectTrackButton();
  }

  if (checkCount >= maxChecks) {
    clearInterval(checkInterval);
  }
}, 2000);

// Also check immediately
if (isApplicationConfirmation()) {
  clearInterval(checkInterval);
  injectTrackButton();
}
