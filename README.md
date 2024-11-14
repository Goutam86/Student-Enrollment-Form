# Student Enrollment Form using JPDB

## Description

This project is a simple **Student Enrollment Form** built using **JsonPowerDB (JPDB)**, which allows users to store, fetch, and update student enrollment details. The form includes fields for roll number, student name, class, date of birth, address, and enrollment date. JPDB serves as the backend database, providing a fast and efficient way to manage student data.

### Benefits of using JsonPowerDB
- **Real-time Data Operations**: JPDB provides instant responses for create, read, update, and delete operations.
- **NoSQL Database**: JPDB is based on a NoSQL architecture, which is highly flexible and scalable.
- **REST API**: Provides a RESTful interface to interact with the database.
- **Simplicity and Speed**: JPDB has built-in support for rapid development without complex configurations.

---

## Table of Contents
- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Release History](#release-history)
- [Scope of Functionalities](#scope-of-functionalities)
- [Examples of Use](#examples-of-use)
- [Project Status](#project-status)
- [Sources](#sources)
- [Other Information](#other-information)

---

## Release History

- **v1.0.0** - Initial release with basic functionality (Date: 2024-11-15)
- **v1.1.0** - Added update and reset functionality (Date: 2024-11-20)

---

## Scope of Functionalities
- **Add Student**: Allows adding new student details into the database.
- **Edit Student**: Modify existing student data by entering the roll number.
- **Delete Student**: Option to remove student details.
- **View Student**: Fetch and display student information by roll number.

---

## Examples of Use

### 1. Add a Student
To add a student, simply enter the roll number and fill in the other details like name, class, and enrollment date. Once submitted, the data will be saved in the database.

### 2. Update a Student's Information
If you need to update an existing student record, enter the roll number and modify the fields that need updating.

```bash
# Save student details
POST /api/iml
{
  "rollNo": "1234",
  "fullName": "John Doe",
  "class": 10,
  "birthDate": "2005-05-15",
  "address": "123 Main St",
  "enrollmentDate": "2024-11-15"
}
