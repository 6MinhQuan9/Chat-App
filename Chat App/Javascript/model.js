const model = {};
model.currentUser = undefined;
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
