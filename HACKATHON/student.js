// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyDlprsW8KrpS9WucAl5uKUq6hjer-X-HsA",
    authDomain: "attendence-app-hackathon.firebaseapp.com",
    projectId: "attendence-app-hackathon",
    storageBucket: "attendence-app-hackathon.appspot.com",
    messagingSenderId: "683120923324",
    appId: "1:683120923324:web:2acb342da4eed61047f6b9"
  };
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Reference to the "students" node in the database
  const studentsRef = database.ref("students");
  
  // Form submission event listener
  const studentForm = document.getElementById("student-form");
  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Get student data from the form
    const name = document.getElementById("name").value;
    const fatherName = document.getElementById("fatherName").value;
    const rollNumber = document.getElementById("rollNumber").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const cnic = document.getElementById("cnic").value;
    const courseName = document.getElementById("courseName").value;
  
    // Create a new student object
    const newStudent = {
      name,
      fatherName,
      rollNumber,
      contactNumber,
      cnic,
      courseName
    };
  
    // Push the new student data to the database
    studentsRef.push(newStudent);
  
    // Clear the form
    studentForm.reset();
  });
  
  // Read student data from the database and display it
  const studentList = document.getElementById("student-list");
  studentsRef.on("child_added", (snapshot) => {
    const studentData = snapshot.val();
    const studentItem = document.createElement("li");
    studentItem.textContent = `${studentData.name} (Roll: ${studentData.rollNumber})`;
    studentList.appendChild(studentItem);
  });
  