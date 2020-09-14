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
    // hhjjj
  // templateFirestore();
};

const templateFirestore = async () => {
  //get one
  const docId = "c9bXDnu5BKY7yefGlEZJ";
  const response = await firebase
    .firestore()
    .collection("Users")
    .doc(docId)
    .get();
  const user = getOneDocument(response);
  //get many
  const responseMany = await firebase
    .firestore()
    .collection("Users")
    .where("age", "==", 25)
    .get();
  const users = getManyDocument(responseMany);
  console.log(users);
  //create
  const dataToCreate = {
    age: 60,
    name: "Nguyen Thi Nam Phuong",
  };
  // firebase.firestore().collection('Users').add(dataToCreate)
  //update
  const idToUpdate = "7b6UisNbicFFU4H1IiJq";
  const dataToUpdate = {
    address: "HOa Binh",
  };
  firebase.firestore().collection("Users").doc(idToUpdate).update(dataToUpdate);
  //delete
  const idToDelete = 'usvdNAEdkYdf910fFCVH'
  firebase.firestore().collection('Users').doc(idToDelete).delete()
};
const getManyDocument = (response) => {
  const listData = [];
  for (const doc of response.docs) {
    listData.push(getOneDocument(doc));
  }
  return listData;
};
const getOneDocument = (response) => {
  const data = response.data();
  data.id = response.id;
  return data;
};
