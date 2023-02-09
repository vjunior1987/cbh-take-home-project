# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 001 - Update Agents table to include custom Id field

#Description:  The Table for Agents must contain a new column named CUSTOM_ID containing custom Id provided by facilities

#Acceptance Criteria:
     - The column CUSTOM_ID must be Varchar
     - The column CUSTOM_ID must be NotNull
     - The minimum length for CUSTOM_ID must be X, and the maximun length must be Y

#Implementation Strategy:
     - Update Agent table with the new column

#Time estimate: 0.5h

### Ticket 002 - Update Agent Form to include custom Id field

#Description:  The form for including and updating Agents must contain a new column named custom Id containing custom Id provided by facilities

#Ticket dependency: Ticket 001

#Acceptance Criteria:
     - The custom Id value must be a text field
     - The field custom Id is required
     - The minimum length for custom Id must be X, and the maximun length must be Y

#Implementation Strategy:
     - Update Agent form with the new customId field
     - Ensure layout is not impacted, and remains responsive
     - Update submit function with customId
     - Update form validation with rules for customId
     - Add code coverage for customId rules

#Time estimate: 1.5h

### Ticket 003 - Update Function to retrieve shifts to include Agent custom Ids

#Description: The Function that retrieves shifts must include in the Agent metadata their custom Ids.

#Ticket dependency: Ticket 001

#Acceptance Criteria:
     - The metadata for agents must include the custom Id informed by their respective facilities
     - The function must maintain the same return time and format

#Implementation Strategy:
     - Update getShiftsByFacility database query to include Agents Custom Id
     - Update Shifts service with business logic to include Agents Custom Id
     - Update Agents DTO with Agent Custom Id property
     - Add Code Coverage for property Custom Id, including cases when Custom Id is missing

Time estimate: 1h

### Ticket 004 - Update Agent metadata in the report page to include Agent custom Ids

The metadata for agent in the report must display each Agent's custom Id, provided by their respective facilities

#Ticket dependency: Ticket 001, Ticket 003

#Acceptance Criteria:
     - The report must contain a new text field for custom Id
     - Ensure the new field does not interfere with the report layout

#Implementation Strategy:
     - Update generateReport function to include Agent custom Id
     - Add code coverage for custom Id in generateReport function, including cases when its value is missing
     - Update generateReport page with custom Id

Time estimate: 1h
