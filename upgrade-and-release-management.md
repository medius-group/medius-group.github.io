---
layout: default
title: Upgrade & Release management
permalink: /upgrade-and-release-management/
group: "navigation"
navigation-title: Upgrade & <br/> Release management
---

# Release process
The release process covers all parts from the Code freeze until the release is in production for all customers. Release test & packaging is the Development organizations process to create a release development items. Cloud Deployment is Cloud Operations process to deploy the release to all cloud environments.

![release-process]({{ site.url }}/assets/upgrade-and-release-management/release-process.png)

## Release test & packaging

The following is done during Release test & packaging:

-	Regression Testing of the release based on test plans
-	Finish Documentation – End-user-, Technical- and Release-Documentation
-	Act on results – fix bugs if needed, document known limitations

Iterate if necessary.
Decision point: Once all the above is done, a summary of all changes is done to make sure that everything is correct before the Release Candidate is made. Content is as follows:

-	Is the release content correct? All changes in GIT is included in Jira and are correct.
-	Workflow followed and done for all Development Items?
-	All automated tests are passing
-	Source code control is correct.
-	Regression tests are passing; any exceptions are carefully documented.
-	No known issues/bugs that prevents further processing.
-	All documentation is correct and available.

Decision is taken by the Director of R&D

## Cloud deployment

Cloud Deployment is the process where the Release Candidate is put into production. 

### Validating deployment of the release

- **Subset of QA Deployments**: The release candidate is deployed to a subset of customers’ QA environments. The environments are monitored by Cloud Operations team (application & server metrics, logs, etc.). Potential errors or question marks are examined based on a checklist. 

- **Subset Production Deployment**: The release candidate is deployed to a subset of customers’ Prod environments. The examination process is similar as for the subset of QA deployments. 

- **Remaining Deployment**: After successful validation of Subset of Production deployments the release is deployed to the remaining deployments.

# Release planning

| Area | Guideline |
|-------------|---------------|
| Time | Should always be planned outside office hours. |
| Months end | Upgrades should NEVER be planned (-5) to 5 work days around months end. <br/> E.g. NOT 22th January - 8rd February 2016. <br/><br/> It is RECOMMENDED not to plan updates (-7) to 7 work days arounds months end. <br/> E.g. NOT 20th January - 10th February 2016.
| Information |	Date and time should be announced on external dashboard at least 7 days in advance. <br/><br/> Information mail should be sent at least 7 days in advance to subscribing users.
