const model = {};
model.currentUser = undefined;
model.conversations = [];
model.currentConversation = undefined;
model.register = async (data) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);
    firebase.auth().currentUser.updateProfile({
      displayName: data.firstName + "" + data.lastName,
    });
    firebase.auth().currentUser.sendEmailVerification();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
model.login = async ({ email, password }) => {
  try {
    firebase.auth().signInWithEmailAndPassword(email, password);

    // if (response && response.user.emailVerified) {
    //   model.currentUser = {
    //     email: response.user.email,
    //     displayName: response.user.displayName,
    //     };
    //     view.setActiveScreen('chatPage')
    // } else {
    //   alert("Kiểm tra mail đi thằng dbrr!!!");
    // }
  } catch (err) {
    err.message;
    console.log(err);
  }
};
model.getConversation = async () => {
  const response = await firebase
    .firestore()
    .collection("conversations")
    .where("users", "array-contains", model.currentUser.email)
    .get();
  model.conversations = getManyDocument(response);
  if (model.conversations.length > 0) {
    model.currentConversation = model.conversations[0];
    view.showCurrentConversation();
    view.showConversations()
  }
};
model.addMessage = (message) => {
  dataToUpdate = {
    messages: firebase.firestore.FieldValue.arrayUnion(message),
  };
  firebase
    .firestore()
    .collection("conversations")
    .doc(model.currentConversation.id)
    .update(dataToUpdate);
};
model.listenConversationChange = () => {
  let isFisrtRun = true;
  firebase
    .firestore()
    .collection("conversations")
    .where("users", "array-contains", model.currentUser.email)
    .onSnapshot((snapshot) => {
      if (isFisrtRun) {
        isFisrtRun = false;
        return;
      }
      console.log(snapshot);
      for (oneChange of snapshot.docChanges()) {
        const docData = getOneDocument(oneChange.doc);
        if (docData.id === model.currentConversation.id) {
          model.currentConversation = docData;
          view.addMessage(
            model.currentConversation.messages[
              model.currentConversation.messages.length - 1
            ]
          );
          view.scrollToEndElement()
        }
        for( let i = 0; i< model.conversations.length;i++){
          if(model.conversations[i].id === docData.id){
            model.conversations[i] = docData
          }
        }
      }
    });
};
model.newConversation = (data)=>{
  firebase.firestore().collection('conversations').add(data)
  view.setActiveScreen('chatPage')
}
