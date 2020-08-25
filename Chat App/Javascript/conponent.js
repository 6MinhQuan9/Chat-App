const component = {}
component.welcomePage = `
    <h1>Welcome To My Chat App</h1>
`
component.registerPage = `
<div class="register-container">
<form id="register-form">
  <div id="register-header">MindX Chat</div>
  <div class="name-wrapper">
    <div class="input-wrapper">
      <input type="text" placeholder="First Name" name="firstName" />
      <div class="error" id="first-name-error"></div>
    </div>
    <div class="input-wrapper">
      <input type="text" placeholder="Last Name" name="lastName" />
      <div class="error" id="last-name-error"></div>
    </div>
  </div>
  <div class="input-wrapper">
    <input type="email" placeholder="Email" name="email" />
    <div class="error" id="email-error"></div>
  </div>
  <div class="input-wrapper">
    <input type="password" placeholder="Password" name="password" />
    <div class="error" id="password-error"></div>
  </div>
  <div class="input-wrapper">
    <input
      type="password"
      placeholder="Comfirm Password"
      name="comfirmPassword"
    />
    <div class="error" id="comfirm-password-error"></div>
  </div>
  <div class="form-action">
    <div>Already have an account ? <span class="cursor-pointer " id='login-btn'>Login</span></div>
    <button class="btn cursor-pointer" type="submit">Register</button>
  </div>
</form>
</div>
`
component.loginPage = `
<div class="login-container">
      <form id="login-form">
        <div id="login-header">MindX Chat</div>
        <div class="input-wrapper">
          <input type="email" placeholder="Email" name="email">
          <div id="email-error" class="error" ></div>
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="Password" name="password">
          <div id="password-error" class="error" ></div>
        </div>
        <div class="form-action">
          <div>Don't have an account? <span class="cursor-pointer " id='register-btn' >Register</span></div>
          <button class="btn cursor-pointer btn-login" type="submit">Login</button> 
        </div>
      </form>
    </div>
    `
    component.chatPage = `\
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link
      href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
      rel="stylesheet"
    />
    <link href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Nanum+Myeongjo&family=Vollkorn:ital@1&display=swap" rel="stylesheet">
    <div class="chat-container">
      <div class="header">Time To Get Some Chick</div>
      <div class="main">
        <div class="conversation-detail">
          <div class="conversation-title">Fisrt Chick</div>
          <div class="list-messages">
          </div>
        </div>
          <form id="send-message-form">
            <div class="input-wrapper">
              <input type="text" placeholder="Nhắn hay nghỉ đây!!!?" name="message" />
            </div>
            <button type="submit"><i class="far fa-paper-plane "></i></button>
          </form>
        </div>
      </div>
    </div>
    `