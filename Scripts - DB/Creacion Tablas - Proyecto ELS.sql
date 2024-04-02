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
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Name` varchar(64),
  `Description` text,
  `Price` decimal(15,2),
  `CategoryID` int
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
  `StatusID` int,
  `GroupID` int
);

CREATE TABLE `Course` (
  `ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Name` varchar(64),
  `Description` text,
  `Price` decimal(15,2)
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
  `ScheduleDate` varchar(32),
  `ScheduleHour` time,
  `Capacity` int,
  `CourseID` int
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

ALTER TABLE `User` ADD FOREIGN KEY (`PersonID`) REFERENCES `Person` (`ID`);

ALTER TABLE `StudentApplication` ADD FOREIGN KEY (`StatusID`) REFERENCES `StatusType` (`ID`);

ALTER TABLE `StudentApplication` ADD FOREIGN KEY (`GroupID`) REFERENCES `Group` (`ID`);

ALTER TABLE `Group` ADD FOREIGN KEY (`CourseID`) REFERENCES `Course` (`ID`);

ALTER TABLE `GroupsByUser` ADD FOREIGN KEY (`GroupID`) REFERENCES `Group` (`ID`);

ALTER TABLE `News` ADD FOREIGN KEY (`GroupID`) REFERENCES `Group` (`ID`);

ALTER TABLE `Treatment` ADD FOREIGN KEY (`CategoryID`) REFERENCES `TreatmentCategory` (`ID`);

ALTER TABLE `Review` ADD FOREIGN KEY (`TreatmentID`) REFERENCES `Treatment` (`ID`);
