// Function to block sites
function blockSites(sites) {
  const rules = sites.map((site, index) => ({
    id: index + 1,  // Ensure unique rule IDs
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: site,  // Matches the provided site
      resourceTypes: ["main_frame"]
    }
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: rules,
    removeRuleIds: Array.from({ length: rules.length }, (_, i) => i + 1)
  });
}

// Fetch blocked websites from server and block them
async function fetchAndBlockSites() {
  try {
    const response = await fetch('http://localhost:5000/blocked-websites/12345');
    if (response.ok) {
      const blockedWebsites = await response.json();
      blockSites(blockedWebsites);
    } else {
      console.error('Failed to fetch blocked websites');
    }
  } catch (error) {
    console.error('Error fetching blocked websites:', error);
  }
}

// Fetch and block sites for user "12345" every 10 seconds
setInterval(fetchAndBlockSites, 10000);
