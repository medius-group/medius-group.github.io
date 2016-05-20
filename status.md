---
layout: default
title: Status
<<<<<<< HEAD
permalink: /status/
group: "navigation"
navigation-title: Status
weight: 1
---

# Status
MediusFlow Cloud is a software as a services solution delivered by Medius. The service is built upon the Microsoft Azure platform from Microsoft. An important part of the MediusFlow Cloud offering is for us to keep the application available to the customers and also be able to restore data. This white paper intends to explain how we leverage the Microsoft Azure platform to deliver High Availability and plan for Disaster Recovery. 
=======
permalink: /high-availability-and-disaster-recovery/
group: "navigation"
navigation-title: Status
---

# MediusFlow overview
MediusFlow Cloud is a software as a services solution delivered by Medius. The service is built upon the Microsoft Azure platform from Microsoft. An important part of the MediusFlow Cloud offering is for us to keep the application available to the customers and also be able to restore data. This white paper intends to explain how we leverage the Microsoft Azure platform to deliver High Availability and plan for Disaster Recovery. 

To provide the best solution possible we have decomposed our solution into two parts. This allows us to implement the best fitting strategy for the characteristics of each part. The two parts are:

- **MediusFlow Application Services**. The MediusFlow Application Services allows end users to connect to and use MediusFlow. Key components of the MediusFlow Application Services are the Web Frontend (managing incoming web requests) and the Application Backend (that runs the business logic).
 
- **MediusFlow Data Services**. The MediusFlow Data Services store the data for the application for each customer. Key components of the MediusFlow Data Services are the Microsoft Azure SQL Database and files (images and other attachments) stored on Microsoft Azure Storage.

![overview]({{ site.url }}/assets/high-availability-and-disaster-recovery/overview.png)


# MediusFlow application services


## High availability
The most important characteristics of this part of the application is that it does not hold any persistent information. The approach to high availability is therefore to allow for each instance running the Web Frontend or application server to fail and be automatically restored. 

### Failure without downtime
The Web Frontend and Application Backend both consists of several (2 or more) instances that are allowed to fail independently. All communication is routed through a load balancer that will redirect data traffic if one of the instances should no longer be responsive. 

![failure-without-downtime]({{ site.url }}/assets/high-availability-and-disaster-recovery/failure-without-downtime.png)

### Unresponsive instances are automatically replaced
The Microsoft Azure Fabric Controller is responsible for provisioning and monitoring the health of the Microsoft Azure compute instances. The Fabric Controller listens for heartbeats from the hardware and software of the host and guest machine instances. When a failure is detected, it enforces SLAs by automatically replace the failing instances by creating new ones. 

![unresponsive-instances-are-automatically-replaced]({{ site.url }}/assets/high-availability-and-disaster-recovery/unresponsive-instances-are-automatically-replaced.png)

### Fault domains ensure no single points of failure
When multiple instances are deployed, Microsoft Azure deploys these instances to different fault domains. A fault domain boundary is basically a different hardware rack in the same datacenter. Fault domains reduce the probability that a localized hardware failure will interrupt the service of an application.

## Disaster recovery
Since no persistent data is ever stored in this part of the application the disaster recovery scenario does not require any data restores. All that will happen is that the application code will be deployed to new machines described in the High Availability scenarios.

In the very unlikely that a complete Microsoft Azure Data Center goes down for an extended period of time all computing instances will be re-created in another data center. This event would require manual steps but the general approach are still the same.

# MediusFlow data services

## High availability
High availability setup for these components are very much delivered by the Microsoft Azure platform.

### Microsoft Azure SQL database
Microsoft Azure SQL Database mitigates outages due to failures of individual devices, such as hard drives, network interface adapters, or even entire servers. Data durability and fault tolerance is enhanced by maintaining multiple copies of all data in different physical nodes located across fully independent physical sub-systems such as server racks and network routers. At any one time, Microsoft Azure SQL Database keeps three replicas of data running—one primary replica and two secondary replicas.

Microsoft Azure SQL Database uses a quorum based commit scheme where data is written to the primary and one secondary replica before we consider the transaction committed. If the hardware fails on the primary replica, the Microsoft Azure SQL Database detects the failure and fails over to the secondary replica. In case of a physical loss of the replica, Microsoft Azure SQL Database creates a new replica automatically. Therefore, there are at least two physical transactionally consistent copies of each database in the data center. 

### Microsoft Azure storage
Data durability for Microsoft Azure Storage is facilitated by maintaining multiple copies of all data on different drives located across fully independent physical storage sub-systems within the region. Data is replicated synchronously and all copies are committed before the write is acknowledged. 

Microsoft Azure Storage is strongly consistent, meaning that reads are guaranteed to reflect the most recent writes. In addition, copies of data are continually scanned to detect and repair bit rot, an often overlooked threat to the integrity of stored data. 

## Disaster recovery
The built-in fault tolerance capabilities of Microsoft Azure protect customer data from individual server, network, and device failures. However, in order to protect customer data against user or application errors, or a total loss of a region, Medius does also create separate backup of the data. 

### Data backup strategy
To protect customer data from disaster Medius copies all data backups to a data center in the same region but separate from the data center where production data is stored. For example, when production data is stored in the North Europe data center, backup data is stored in another the same region (in this case West Europe). For more protection, all data is also replicated to yet another data center by Microsoft Azure Storage geo-replication. 

The table below outlines the intervals when data backups are taken. This intervals is the same as the RPO (Recovery Point Objective) for the data. That is the most data that can be lost in the event of disaster. 

| Type of data    | Backup interval    |
|-------------|---------------|
| Database | Every 1 h |
| File storage | Every 6 h |

In practice, Medius rely on Microsoft's [SQL Database point in time restore](https://azure.microsoft.com/en-us/documentation/articles/sql-database-point-in-time-restore/) for restore of databases during last 14 days.

Medius also take database backups on weekly basis for long time storage. Backups are executed by scheduled jobs during weekends. Separate scheduled jobs validate that the backups have been successfully stored on storage location.

For files, Medius use events for each new file on primary storage that initiate a copy operation to backup storage location. The event is triggered using 
[Microsoft Azure Blob triggers](https://azure.microsoft.com/sv-se/documentation/articles/websites-dotnet-webjobs-sdk-storage-blobs-how-to/).

There is also a scheduled job that validate each file created between the last successful validation to the last full day on primary storage also exists on backup storage. A receipt is generated that the validation has been completed successfully.

### Data backup retention policy
Medius store weekly database backups at least 2 years. Point in time restore is available for the last 14 days.
Medius store all file backups as long as the customer is using MediusFlow.

### Data restore strategy
Medius data restore strategy starts from the sort of issue that cause disaster. If data loss is caused by loss of Microsoft Azure Data Center a full restore of all data will be done in another data center. If data loss is caused by user or application error, a partial restore will be done in the current production data center. 

To verify restore procedures Medius evaluate both full and partial restores at least every year.

# Read more

- [Azure Business Continuity Technical Guidance](http://msdn.microsoft.com/en-us/library/windowsazure/hh873027.aspx)
- [Azure SQL database business continuity](http://msdn.microsoft.com/en-us/library/hh852669.aspx)
- [Disaster Recovery and High Availability for Azure Applications](http://msdn.microsoft.com/en-us/library/windowsazure/dn251004.aspx)
>>>>>>> 0b154fdd2ef86730ca9628cf5bf6919f5120880d
