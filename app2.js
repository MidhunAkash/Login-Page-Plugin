
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
  var fullName = "";
  auth.onAuthStateChanged((user)=> {
    if(user) {
        database.ref('/users/' + user.uid).once('value').then(function(snapshot) {
            let userData = snapshot.val();
            console.log(userData.full_name);
            fullName = userData.full_name
            document.getElementById("user-name").innerHTML = "Hello, "+ fullName
            document.getElementById("luser-name").innerHTML = "Hello, "+ fullName
        })
    } else {
        window.location.href = "./index.html"
    }
})
function logout() {
    auth.signOut()
    window.location.href = "./index.html"
}
