---
title: "Home"
tags: [home]
icon: material/home
hide:
  - toc
  - navigation
---

Welcome to my Documentation Hub! This is a collection of guides, tutorials, and notes on various topics related to my home lab setup and experiments.

Feel free to explore and learn from the documentation. If you have any questions or suggestions, please [contact me](mailto:abhilashreddy723@gmail.com).

## Quick Links

#### Setup Guides

- [Local DNS Setup](homelab/dnsmasq.md)
- [Samba File Share Setup](homelab/sambasetup.md)
- [Transmission BitTorrent Setup](homelab/transmissionBTsetup.md)

#### Understanding Linux

- [Cron Jobs](linux/crontab.md)
- [Linux File Permission](linux/linuxfilepermission.md)
- [Logical Volume Manager](linux/lvm.md)

---

## Latest Github Open Issues

<ol id="issues-list"></ol>
<script>
  fetch("https://api.github.com/repos/abhilashreddysh/wiki/issues")
    .then(response => response.json())
    .then(issues => {
        const groupedIssues = groupIssuesByTags(issues);
        displayGroupedIssues(groupedIssues);
    })
    .catch(error => {
        console.error('Error fetching GitHub issues:', error);
    });
    function groupIssuesByTags(issues) {
        const groupedIssues = {};
        issues.forEach(issue => {
            issue.labels.forEach(label => {
                const labelName = label.name.toUpperCase();
                if (!groupedIssues[labelName]) {
                    groupedIssues[labelName] = [];
                }
                groupedIssues[labelName].push(issue);
            });
        });
        return groupedIssues;
    }
    function displayGroupedIssues(groupedIssues) {
        const issuesList = document.getElementById('issues-list');
        for (const label in groupedIssues) {
            const labelIssues = groupedIssues[label];
            // Create a section for each label
            const labelSection = document.createElement('div');
            labelSection.innerHTML = `<h2>${label}</h2>`;
            // Create a list for the issues within each label section
            const labelList = document.createElement('ul');
            labelIssues.forEach(issue => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${issue.html_url}" target="_blank">${issue.title}</a>`;
                labelList.appendChild(listItem);
            });
            labelSection.appendChild(labelList);
            issuesList.appendChild(labelSection);
        }
    }
</script>

---

## Wiki Tags

[TAGS]
