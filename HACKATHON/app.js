import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

import {
  getDatabase,
  set,
  ref,
  onValue, 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const auth = getAuth();
const database = getDatabase();


let role = document.getElementById("signup-role").value;
// let role = roleSelect.value;

let signup_btn = document.getElementById("signup-btn");
if( role == "user" && signup_btn){

  const Signup = () => {
    let username = document.getElementById("username").value; 
    let email = document.getElementById("signup-email").value; 
    let password = document.getElementById("signup-password").value; 
    createUserWithEmailAndPassword(auth, email, password)
      .then((resolve) => {
        alert("successfully Signup");
        console.log(resolve);
        let userId = auth.currentUser.uid;
        console.log(userId);
        let usersReference = ref(database, "users/" + userId );
        let usersObj = {
          username: username,
          email: email,
          password: password,
        };
        set(usersReference, usersObj);
      })
      .catch((reject) => {
        alert("Signup failed!", reject);
      });
  };

  signup_btn.addEventListener("click", Signup);
}

else if( role == "admin" && signup_btn){
  const adminSignup = () => {
    let adminEmail = document.getElementById("email").value;
    let adminPassword = document.getElementById("password").value;

    // Create admin account
    createUserWithEmailAndPassword(auth, adminEmail, adminPassword)
        .then((resolve) => {
            alert("Admin account created successfully");
            console.log(resolve);
            let adminUserId = auth.currentUser.uid;
            console.log(adminUserId);

            // Store admin data in the "admins" node
            let adminsReference = ref(database, "admin/" + adminUserId);
            let adminObj = {
                email: adminEmail,
                password: adminPassword, 
                isAdmin: true // You can include other admin-specific data as needed
            };
            set(adminsReference, adminObj);
        })
        .catch((reject) => {
            alert("Admin account creation failed!", reject);
        });
};

let adminSignupBtn = document.getElementById("signup-btn");
adminSignupBtn.addEventListener("click", adminSignup);
}
  
  let login_btn = document.getElementById("login-btn");

      if(login_btn){
        const login = () => {
          let email = document.getElementById("login-email");
          let password = document.getElementById("login-password");
          signInWithEmailAndPassword(auth, email.value, password.value)
            .then((resolve) => {
              alert("successfully Login");
              let userId = auth.currentUser.uid;
              let usernameRef = ref(database, "users/" + userId);
              onValue(usernameRef, (data)=> {
                  let userData = data.val().username;
                  console.log(userData);
                  window.location.assign('admin.html')
                  document.getElementById("username").innerHTML = userData;
              })
            })
            .catch((reject) => {
              alert(reject);
            });
        };
      
        let login_btn = document.getElementById("login-btn");
        login_btn.addEventListener("click", login);
      }


    // SIGNUP -- LOGIN 
const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      loginLink = document.querySelector(".login-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    loginLink.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });


    function readData(classID) {
      const classRef = ref(database, "classes/" + classID);
      onValue(classRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          document.getElementById("Class-Timings").value = data.classTimings;
          document.getElementById("Schedule-of-Classes").value =
            data.scheduleOfClasses;
          document.getElementById("Teacher's-name").value = data.teachersName;
          document.getElementById("Section-name").value = data.sectionName;
          document.getElementById("Course-Name").value = data.courseName;
          document.getElementById("Batch-Number").value = data.batchNumber;
        } else {
          alert("Class not found.");
        }
      });
    }

    // Function to insert or update data
    function insertOrUpdateData(classID) {
      const classTimings = document.getElementById("Class-Timings").value;
      const scheduleOfClasses = document.getElementById("Schedule-of-Classes")
        .value;
      const teachersName = document.getElementById("Teacher's-name").value;
      const sectionName = document.getElementById("Section-name").value;
      const courseName = document.getElementById("Course-Name").value;
      const batchNumber = document.getElementById("Batch-Number").value;

      const classRef = ref(database, "classes/" + classID);
      set(classRef, {
        classTimings,
        scheduleOfClasses,
        teachersName,
        sectionName,
        courseName,
        batchNumber,
      }).then(() => {
        alert("Data inserted/updated successfully.");
      });
    }

    // Function to delete data
    function deleteData(classID) {
      const classRef = ref(database, "classes/" + classID);
      remove(classRef)
        .then(() => {
          alert("Data deleted successfully.");
          clearForm();
        })
        .catch((error) => {
          alert("Error deleting data: " + error.message);
        });
    }

    // Function to clear the form
    function clearForm() {
      document.getElementById("Class-Timings").value = "";
      document.getElementById("Schedule-of-Classes").value = "";
      document.getElementById("Teacher's-name").value = "";
      document.getElementById("Section-name").value = "";
      document.getElementById("Course-Name").value = "";
      document.getElementById("Batch-Number").value = "";
    }

    // Event listeners for buttons
    document.getElementById("insert").addEventListener("click", () => {
      const classID = document.getElementById("ClassID").value;
      insertOrUpdateData(classID);
    });

    document.getElementById("read").addEventListener("click", () => {
      const classID = document.getElementById("ClassID").value;
      readData(classID);
    });

    document.getElementById("update").addEventListener("click", () => {
      const classID = document.getElementById("ClassID").value;
      insertOrUpdateData(classID);
    });

    document.getElementById("delete").addEventListener("click", () => {
      const classID = document.getElementById("ClassID").value;
      deleteData(classID);
    });