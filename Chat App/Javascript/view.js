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
      model.getConversation();
      const sendMessageForm = document.getElementById("send-message-form");
      sendMessageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(sendMessageForm.message.value);
        const message = {
          content: sendMessageForm.message.value,
          owner: model.currentUser.email,
          createAt: new Date().toISOString(),
        };
        if (sendMessageForm.message.value.trim() !== "") {
          model.addMessage(message);
        }
        sendMessageForm.message.value = "";
      });
      model.listenConversationChange();
      break;
    case "createNewConversation":
      document.getElementById("app").innerHTML =
        component.createNewConversation;
      const redirectChatPage = document.getElementById("redirect-to-chat");
      redirectChatPage.addEventListener("click", () => {
        view.setActiveScreen("chatPage");
      });
      const newConversation = document.getElementById(
        "create-conversation-form"
      );
      newConversation.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
          title: newConversation.title.value,
          email: newConversation.email.value,
        };
        controller.newConversation(data);
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
  document.querySelector(".list-messages").appendChild(messageWrapper);
};
view.showCurrentConversation = () => {
  document.querySelector(".conversation-title").innerHTML =
    model.currentConversation.title;
  document.querySelector(".list-messages").innerHTML = "";
  for (message of model.currentConversation.messages) {
    view.addMessage(message);
  }
  view.scrollToEndElement();
};
view.scrollToEndElement = () => {
  const element = document.querySelector(".list-messages");
  element.scrollTop = element.scrollHeight;
};
view.showConversations = () => {
  for (conversation of model.conversations) {
    view.addConversation(conversation);
  }
};
view.addConversation = (conversation) => {
  const conversationWrapper = document.createElement("div");
  conversationWrapper.classList.add("conversation");
  conversationWrapper.classList.add("cursor-pointer");
  if (conversation.id === model.currentConversation.id) {
    conversationWrapper.classList.add("current");
  }
  conversationWrapper.innerHTML = `
    <div class='left-conversation-title'>${conversation.title}</div>
    <div class='num-of-user'>${conversation.users.length} users</div>
  `;
  conversationWrapper.addEventListener("click", () => {
    model.currentConversation = model.conversations.filter(
      (item) => item.id === conversation.id
    )[0];
    view.showCurrentConversation();
    document.querySelector(".conversation.current").classList.remove("current");
    conversationWrapper.classList.add("current");
  });
  document
    .querySelector(".list-conversations")
    .appendChild(conversationWrapper);
};
