---
layout: default
title: Upgrade & Release management
permalink: /upgrade-and-release-management/
group: "navigation"
navigation-title: Release 
weight: 3
---

# Release process
The release process covers all parts from the Code freeze until the release is in production for all customers. Release test & packaging is the Development organizations process to create a release development items. Cloud Deployment is Cloud Operations process to deploy the release to all cloud environments.

![release-process]({{ site.url }}/assets/upgrade-and-release-management/release-process.png)

## Validating deployment of the release

- **Subset of QA Deployments**: The release candidate is deployed to a subset of customers’ QA environments. The environments are monitored by Cloud Operations team (application & server metrics, logs, etc.). Potential errors or question marks are examined based on a checklist. 

- **Subset Production Deployment**: The release candidate is deployed to a subset of customers’ Prod environments. The examination process is similar as for the subset of QA deployments. 

- **Remaining Deployment**: After successful validation of Subset of Production deployments the release is deployed to the remaining deployments.

# Release planning

| Area | Guideline |
|-------------|---------------|
| Time | Should always be planned outside office hours. |
| Months end | Upgrades should NEVER be planned (-5) to 5 work days around months end. <br/> E.g. NOT 22th January - 8rd February 2016. <br/><br/> It is RECOMMENDED not to plan updates (-7) to 7 work days arounds months end. <br/> E.g. NOT 20th January - 10th February 2016.
| Information |	Date and time should be announced on external dashboard at least 7 days in advance. <br/><br/> Information mail should be sent at least 7 days in advance to subscribing users.
