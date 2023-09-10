// CRUD FUNCTION 
// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let classID; // Declare classID variable here

var classTimings, ScheduleOfClasses, TeachersName, SectionName, CourseName, batchNumber;

function readFom() {
    classID = document.getElementById("ClassID").value;
    classTimings = document.getElementById("Class-Timings").value;
    ScheduleOfClasses = document.getElementById("Schedule-of-Classes").value;
    TeachersName = document.getElementById("Teacher's-name").value;
    SectionName = document.getElementById("Section-name").value;
    CourseName = document.getElementById("Course-Name").value;
    batchNumber = document.getElementById("Batch-Number").value;
    console.log(classTimings, ScheduleOfClasses, TeachersName, SectionName, CourseName, batchNumber);
}

document.getElementById("insert").onclick = function () {
    readFom();

    firebase
        .database()
        .ref("users/" + classID)
        .set({
            classTimings: classTimings,
            ScheduleOfClasses: ScheduleOfClasses,
            TeachersName: TeachersName,
            SectionName: SectionName,
            CourseName: CourseName,
            BatchNo: batchNumber,
        });
    alert("Data Inserted");
    document.getElementById("Class-Timings").value = "";
    document.getElementById("Schedule-of-Classes").value = "";
    document.getElementById("Teacher's-name").value = "";
    document.getElementById("Section-name").value = "";
    document.getElementById("Course-Name").value = "";
    document.getElementById("Batch-Number").value = "";
};

document.getElementById("read").onclick = function () {
    readFom();

    firebase
        .database()
        .ref("users/" + classID)
        .on("value", function (snap) {
            document.getElementById("Class-Timings").value = snap.val().classTimings;
            document.getElementById("Schedule-of-Classes").value = snap.val().ScheduleOfClasses;
            document.getElementById("Teacher's-name").value = snap.val().TeachersName;
            document.getElementById("Section-name").value = snap.val().SectionName;
            document.getElementById("Course-Name").value = snap.val().CourseName;
            document.getElementById("Section-name").value = snap.val().BatchNo;
        });
};

document.getElementById("update").onclick = function () {
    readFom();

    firebase
        .database()
        .ref("users/" + classID)
        .update({
            classTimings: classTimings,
            ScheduleOfClasses: ScheduleOfClasses,
            TeachersName: TeachersName,
            SectionName: SectionName,
            CourseName: CourseName,
            BatchNo: batchNumber,
        });
    alert("Data Update");
    document.getElementById("Class-Timings").value = "";
    document.getElementById("Schedule-of-Classes").value = "";
    document.getElementById("Teacher's-name").value = "";
    document.getElementById("Section-name").value = "";
    document.getElementById("Course-Name").value = "";
    document.getElementById("Batch-Number").value = "";
};

document.getElementById("delete").onclick = function () {
    readFom();

    firebase
        .database()
        .ref("users/" + classID)
        .remove();
    alert("Data Deleted");
    document.getElementById("Class-Timings").value = "";
    document.getElementById("Schedule-of-Classes").value = "";
    document.getElementById("Teacher's-name").value = "";
    document.getElementById("Section-name").value = "";
    document.getElementById("Course-Name").value = "";
    document.getElementById("Batch-Number").value = "";
};
