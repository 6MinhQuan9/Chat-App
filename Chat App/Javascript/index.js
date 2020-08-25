window.onload = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyBRjded2v5fDlpMn5nq95cUDn_jZK8fDYk",
    authDomain: "chat-app-9c1d5.firebaseapp.com",
    databaseURL: "https://chat-app-9c1d5.firebaseio.com",
    projectId: "chat-app-9c1d5",
    storageBucket: "chat-app-9c1d5.appspot.com",
    messagingSenderId: "470623710598",
    appId: "1:470623710598:web:6795505ebbac9f156fd007",
  };
  firebase.initializeApp(firebaseConfig);
  console.log(firebase.app());
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      console.log(user)
      model.currentUser = {
        displayName: user.displayName,
        email: user.email
      }
      if(user.emailVerified){
        view.setActiveScreen('chatPage')
      }else{
        alert('check mail con me may di')
        firebase.auth().signOut()
        view.setActiveScreen('loginPgae')
      }
    } else {
      view.setActiveScreen("registerPage");
    }
  });
};
