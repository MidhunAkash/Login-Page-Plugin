const sLink = document.querySelector("#s-link");
const lLink = document.querySelector("#l-link");
const wrapper = document.querySelector(".wrapper");
const logout = document.querySelector('#lo-button');
sLink.addEventListener('click', function() {
    wrapper.style.top = '-100%';
})

lLink.addEventListener('click', function() {
    wrapper.style.top = '0%';
})
logout.addEventListener('click',function(){
    auth.signOut();
})

const firebaseConfig = {
    apiKey: "AIzaSyAV4na1rL9sJfkCicW2ZA2QH2Brm8jz3Zc",
    authDomain: "login-page-fd3f0.firebaseapp.com",
    databaseURL: "https://login-page-fd3f0-default-rtdb.firebaseio.com",
    projectId: "login-page-fd3f0",
    storageBucket: "login-page-fd3f0.appspot.com",
    messagingSenderId: "496273769063",
    appId: "1:496273769063:web:9291d4150a28258e750ac2",
    measurementId: "G-03G94FYW3R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()

function register() {
  document.getElementById("sbutton").innerHTML = '<i class="fa-config fas fa-spinner fa-spin"></i>'
  const email = document.getElementById('s-email').value
  const password = document.getElementById('s-password').value
  const full_name = document.getElementById('s-name').value
  const cpassword = document.getElementById('c-password').value
    if(email == ""||password==""||full_name==""||cpassword=="") {
        ermsg('All feilds are manitory',"serrmsg")
        document.getElementById("sbutton").innerHTML = '<button onclick="register()" id="s-button">Sign Up</button>'
        return
    }
    // Validate input fields
    if (validate_email(email) == false ) {
      ermsg('Invalid Email',"serrmsg")
      document.getElementById("sbutton").innerHTML = '<button onclick="register()" id="s-button">Sign Up</button>'
      return
      // Don't continue running the code
    }
    if (full_name == "") {
      document.getElementById("sbutton").innerHTML = '<button onclick="register()" id="s-button">Sign Up</button>'
      ermsg('Enter your name',"serrmsg")
      return
    }
    if (validate_pass(password,cpassword) == false) {
      document.getElementById("sbutton").innerHTML = '<button onclick="register()" id="s-button">Sign Up</button>'
        ermsg('confirm password not matched.',"serrmsg")
        return
      }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)

      // DOne
      auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      user = auth.currentUser
      database_ref = database.ref()
      // Create User data
      user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
      window.location.href = "./hom.html"
    })
    .catch(function(error) {
      document.getElementById("sbutton").innerHTML = '<button onclick="register()" id="s-button">Sign Up</button>'
      // Firebase will use this to alert of its errors
      error_code = error.code
      var error_message = error.message
      alert(error_message)
    })
    })
    .catch(function(error) {
      document.getElementById("sbutton").innerHTML = '<button onclick="register()" id="s-button">Sign Up</button>'
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
      if(error_message=="Password should be at least 6 characters"){
        ermsg(error_message,"serrmsg")
      }
      else if(error_message="The email address is already in use by another account."){
          ermsg("User already exist","serrmsg")
      }
      else {
        alert(error_message)
      }
    })
  }

  function login () {
    document.getElementById("lbutton").innerHTML = '<i class="fa-config fas fa-spinner fa-spin"></i>'
    // Get all our input fields
   const email = document.getElementById('l-email').value
   const password = document.getElementById('l-password').value
    // Validate input fields
    if (validate_email(email) == false) {
      document.getElementById("lbutton").innerHTML = '<button onclick="login()" id="l-button">Log In</button>'
      ermsg('Invalid Email',"lerrmsg")
      return
      // Don't continue running the code
    }
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
      window.location.href = "./hom.html"
    })
    .catch(function(error) {
      document.getElementById("lbutton").innerHTML = '<button onclick="login()" id="l-button">Log In</button>'
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
      if(error_message=="The password is invalid or the user does not have a password."){
        ermsg("Invalid password","lerrmsg")
      }
      else if(error_message=="There is no user record corresponding to this identifier. The user may have been deleted."){
          ermsg("User not found","lerrmsg")
      }
      else{
          alert(error_message)
      }
    })
  }



function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
function validate_pass(pass,cpass) {
    if(pass == cpass) {
        return true;
    }
    else {
        return false
    }
}
  
  function ermsg(msg,id) {
    document.getElementById(id).innerHTML = msg;
    setTimeout(() => {document.getElementById(id).innerHTML = ""}, 3000);
}
