const view = {};
view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case "registerPage":
      document.getElementById("app").innerHTML = component.registerPage;
      document.getElementById("login-btn").addEventListener("click", () => {
        view.setActiveScreen("loginPage");
      });
      const registerForm = document.getElementById("register-form");
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          comfirmPassword: registerForm.comfirmPassword.value,
        };
        controller.register(data);
      });
      break;

    case "loginPage":
      document.getElementById("app").innerHTML = component.loginPage;
      document.getElementById("register-btn").addEventListener("click", () => {
        view.setActiveScreen("registerPage");
      });
      const loginForm = document.getElementById("login-form");
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
          email: loginForm.email.value,
          password: loginForm.password.value,
        };
        controller.login(data);
      });
      break;
    case "chatPage":
      document.getElementById("app").innerHTML = component.chatPage;
      const sendMessageForm = document.getElementById("send-message-form");
      sendMessageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(sendMessageForm.message.value);
        if(sendMessageForm.message.value===''){
          
        }else{
          const message = {
            content: sendMessageForm.message.value,
            owner: model.currentUser.email,
          };
          const messageFromBot = {
            content: sendMessageForm.message.value,
            owner: "Mambacita",
          };
          view.addMessage(message);
          view.addMessage(messageFromBot);
        }
      });
      break;
  }
};
view.setErrorMessage = (elementId, content) => {
  document.getElementById(elementId).innerText = content;
};
view.addMessage = (message) => {
  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message");
  if (message.owner === model.currentUser.email) {
    messageWrapper.classList.add("mine");
    messageWrapper.innerHTML = `
    <div class='content'>${message.content}</div>
    `;
  } else {
    messageWrapper.classList.add("their");
    messageWrapper.innerHTML = `
    <div class='owner'>${message.owner}</div>
    <div class='content'>${message.content}</div>
    `;
  }
  document.querySelector('.list-messages').appendChild(messageWrapper)
  
};
