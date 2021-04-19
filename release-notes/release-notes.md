<h1>Release notes Appointment Booking App 4.0.0</h1>

----------

<h2>Introduction</h2>

This document describes the new features, bug corrections, known issues and recommendations for Appointment Blocking App 2.0.0. If you want to know about connector changes details or similar, this document is for you.

**Note:** Several of the remarks refer to a Jira number (Jira is Qmatic&#39;s internal registration system for bugs), or Pivotal Tracker (internal system for improvements and other issues).


<!--Add new update section after each release

<h2>Version UPDATE_VERSION_NUMBER</h2>

**Date:**
 
**Build number:**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **xxx** | **Story header** Solution text |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **xxx** | **Bug header** Solution text |

<h3>Known issues</h3>

| **Id/Jira** | **Description** |
| --- | --- |
| **xxx** | **Bug header** Bug text |

<h3>Upgrade instructions</h3> 

------------>

<h2>Original release</h2>

**Date: 09/04/2021** 
 
**Build number: 001** 

<h3>Upgrade Instructions</h3>
- Please use following steps to use Appointment Blocking module

1. Add a record in application and application_modules table
INSERT INTO qp_central.applications
(id,branch_app,is_distributed,enabled,icon_url,url,version,view_index)
VALUES('appointmentblocking',true,false,1,'images/icons/application.png','appointmentblocking',1,120)

INSERT INTO qp_central.application_modules     
     (id,is_distributed,enabled,icon_url,privilege_level,url,view_index,application_id)
     VALUES ('appointmentblocking',0,1,NULL,20,NULL,110,'appointmentblocking')

2. Add new section to commonMessages.properties 
application.appointmentblocking                  = Appointment Blocking
application.appointmentblocking.description      = Appointment Blocking Workstation
module.appointmentblocking                       = Appointment Blocking

3. Create new role for Appointment Blocking and add Appointment Blocking module, Appointment, Calendar Admin and Connector EntryPoint

4. Restart the Orchestra

----------


<h3>Copyright notice</h3>

The information in this document is subject to change without prior notice and does not represent a commitment on the part of Q-MATIC AB. All efforts have been made to ensure the accuracy of this manual, but Q-MATIC AB cannot assume any responsibility for any errors and their consequences. 

This manual is copyrighted and all rights are reserved. 
Qmatic and Qmatic Orchestra are registered trademarks or trademarks of Q-MATIC AB. 
Reproduction of any part of this manual, in any form, is not allowed, unless written permission is given by Q-MATIC AB.
COPYRIGHT (c) Q-MATIC AB, 2018.

