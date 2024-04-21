USE bqhd9nbafrpsvzpzrgvc;

CREATE TABLE `UserType` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(32)
);

CREATE TABLE `User` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Username` varchar(64),
  `Password` varchar(256),
  `Salt` varchar(256),
  `PersonID` int,
  `UserTypeID` int
);

CREATE TABLE `Person` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Photo` blob,
  `Email` varchar(64),
  `PhoneNumber` varchar(32),
  `Name` varchar(64)
);

CREATE TABLE `Treatment` (
  `ID` int(11) PRIMARY NOT NULL AUTO_INCREMENT,
  `Name` varchar(64) DEFAULT NULL,
  `Description` text,
  `Price` decimal(15,2) DEFAULT NULL,
  `Includes` text,
  `ProcedureDuration` text,
  `EffectDuration` text,
  `Information` text,
  `CategoryID` int(11) DEFAULT NULL,
  `IsActive` tinyint(4) DEFAULT '1',
);

CREATE TABLE `TreatmentCategory` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(64)
);

CREATE TABLE `StatusType` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `StatusName` varchar(32)
);

CREATE TABLE `StudentApplication` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `StudentName` varchar(64),
  `PaymentReceipt` blob,
  `Date` datetime,
  `Email` varchar(64),
  `PhoneNumber` varchar(32),
  `Name` varchar(64),
  `StatusID` int,
  `GroupID` int
);

CREATE TABLE `Course` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Name` varchar(64),
  `Description` text,
  `Topics` text,
  `Includes` text,
  `Duration` text,
  `Price` decimal(15,2),
  `UserTarget` text
  `isActive` bool
);

CREATE TABLE `GroupsByUser` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `UserID` int,
  `GroupID` int,
  `isActive` bool
);

CREATE TABLE `Group` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `StartingDate` date,
  `ScheduleDate` varchar(255),
  `ScheduleHour` time,
  `Capacity` int,
  `CourseID` int,
  `isActive` bool
);

CREATE TABLE `News` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Title` varchar(64),
  `Content` text,
  `PublishedDate` date,
  `GroupID` int
);

CREATE TABLE `Review` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Name` varchar(32),
  `ReviewContent` text,
  `PublishedDate` date,
  `Stars` int,
  `Response` text,
  `TreatmentID` int
);

ALTER TABLE `User` ADD FOREIGN KEY (`UserTypeID`) REFERENCES `UserType` (`ID`);

ALTER TABLE `GroupsByUser` ADD FOREIGN KEY (`UserID`) REFERENCES `User` (`ID`);

ALTER TABLE `Person` ADD FOREIGN KEY (`ID`) REFERENCES `User` (`PersonID`);

ALTER TABLE `StudentApplication` ADD FOREIGN KEY (`StatusID`) REFERENCES `StatusType` (`ID`);

ALTER TABLE `StudentApplication` ADD FOREIGN KEY (`GroupID`) REFERENCES `Group` (`ID`);

ALTER TABLE `Group` ADD FOREIGN KEY (`CourseID`) REFERENCES `Course` (`ID`);

ALTER TABLE `GroupsByUser` ADD FOREIGN KEY (`GroupID`) REFERENCES `Group` (`ID`);

ALTER TABLE `News` ADD FOREIGN KEY (`GroupID`) REFERENCES `Group` (`ID`);

ALTER TABLE `Treatment` ADD FOREIGN KEY (`CategoryID`) REFERENCES `TreatmentCategory` (`ID`);

ALTER TABLE `Review` ADD FOREIGN KEY (`TreatmentID`) REFERENCES `Treatment` (`ID`);

ALTER TABLE `TreatmentImage` ADD FOREIGN KEY (`TreatmentID`) REFERENCES `Treatment` (`ID`);

ALTER TABLE `CourseImage` ADD FOREIGN KEY (`CourseID`) REFERENCES `Course` (`ID`);

ALTER TABLE `CourseImage` ADD FOREIGN KEY (`ImageTypeID`) REFERENCES `ImageType` (`ID`);

ALTER TABLE `TreatmentImage` ADD FOREIGN KEY (`ImageTypeID`) REFERENCES `ImageType` (`ID`);


