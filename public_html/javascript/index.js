// Initialize JPDB API parameters
const baseURL = "http://api.login2explore.com:5577";
const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";
const empDBName = "STUDENT-DB"; // Update with your actual database name
const empRelationName = "STUDENT-TABLE"; // Update with your actual relation name
const connToken = "90934458|-31949229087438669|90957001"; // Your actual connection token

// Function to reset form fields
function resetForm() {
    $("#rollNo").val("").prop("disabled", false);
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $("#save").prop("disabled", false);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", false);
    $("#rollNo").focus();
}

// Function to validate input data
function validateData() {
    const rollNo = $("#rollNo").val();
    const fullName = $("#fullName").val();
    const classVal = $("#class").val();
    const birthDate = $("#birthDate").val();
    const address = $("#address").val();
    const enrollmentDate = $("#enrollmentDate").val();

    if (rollNo === "") {
        alert("Roll Number is missing");
        $("#rollNo").focus();
        return "";
    }
    if (fullName === "") {
        alert("Full Name is missing");
        $("#fullName").focus();
        return "";
    }
    if (classVal === "") {
        alert("Class is missing");
        $("#class").focus();
        return "";
    }
    if (birthDate === "") {
        alert("DOB is missing");
        $("#birthDate").focus();
        return "";
    }
    if (address === "") {
        alert("Address is missing");
        $("#address").focus();
        return "";
    }
    if (enrollmentDate === "") {
        alert("Enrollment Date is missing");
        $("#enrollmentDate").focus();
        return "";
    }

    const jsonStrObj = {
        rollNo: rollNo,
        fullName: fullName,
        class: classVal,
        birthDate: birthDate,
        address: address,
        enrollmentDate: enrollmentDate
    };

    return JSON.stringify(jsonStrObj);
}

// Function to fetch student data from JPDB
function getEmp() {
    const rollNo = $("#rollNo").val();
    if (rollNo === "") {
        alert("Please enter a Roll Number");
        $("#rollNo").focus();
        return;
    }

    const rollNoJsonObj = { rollNo: rollNo };
    const getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, JSON.stringify(rollNoJsonObj));

    jQuery.ajaxSetup({ async: false });
    const resJsonObj = executeCommandAtGivenBaseUrl(getRequest, baseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 200) {
        fillData(resJsonObj);
        localStorage.setItem("rec_no", JSON.parse(resJsonObj.data).rec_no); // Store rec_no
        $("#rollNo").prop("disabled", true);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#fullName").focus();
    } else {
        alert("Roll Number not found. You can save new data.");
        $("#fullName").focus();
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
    }
}

// Function to fill form data from the fetched record
function fillData(jsonObj) {
    const data = JSON.parse(jsonObj.data).record;
    $("#fullName").val(data.fullName);
    $("#class").val(data.class);
    $("#birthDate").val(data.birthDate);
    $("#address").val(data.address);
    $("#enrollmentDate").val(data.enrollmentDate);
}

// Function to save new student data
function saveData() {
    const jsonStrObj = validateData();
    if (jsonStrObj === "") return;

    const putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);

    jQuery.ajaxSetup({ async: false });
    const resJsonObj = executeCommandAtGivenBaseUrl(putRequest, baseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 200) {
        alert("Data saved successfully!");
        resetForm();
    } else {
        alert("Error saving data!");
    }
}

// Function to update existing student data
function changeData() {
    const jsonChg = validateData();
    if (jsonChg === "") return;

    const recNo = localStorage.getItem("rec_no");
    if (!recNo) {
        alert("Record number missing. Cannot update.");
        return;
    }

    const updateRequest = createUPDATERecordRequest(connToken, jsonChg, empDBName, empRelationName, recNo);

    jQuery.ajaxSetup({ async: false });
    const resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, baseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 200) {
        alert("Data updated successfully!");
        resetForm();
    } else {
        alert("Error updating data!");
    }
}

// Initialize form on page load
$(document).ready(() => {
    resetForm();
});
