---
title: Github Open Issues
description: Latest github open issues
tags: [github, issues]
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