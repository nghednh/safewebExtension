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
    const response = await fetch('http://localhost:5000/block_website/nguyenvanb');
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
fetchAndBlockSites()
setInterval(fetchAndBlockSites, 10000);
