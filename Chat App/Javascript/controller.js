const controller = {};
controller.register = (data) => {
  view.setErrorMessage(
    "first-name-error",
    data.firstName === "" ? "Please input your first name" : ""
  );
  view.setErrorMessage(
    "last-name-error",
    data.lastName === "" ? "Please input your last name" : ""
  );
  view.setErrorMessage(
    "email-error",
    data.email === "" ? "Please input your email" : ""
  );
  view.setErrorMessage(
    "password-error",
    data.password === "" ? "Please input your password" : ""
  );
  if (data.comfirmPassword === "") {
    view.setErrorMessage(
      "comfirm-password-error",
      "Please input your comfirm password"
    );
  } else if (data.comfirmPassword !== data.password) {
    view.setErrorMessage("comfirm-password-error", `Password did't match`);
  } else {
    view.setErrorMessage("comfirm-password-error", "");
  }
  if (
    data.firstName !== "" &&
    data.lastName !== "" &&
    data.email !== "" &&
    data.password !== "" &&
    data.password === data.comfirmPassword
  ) {
    model.register(data);
  }
};
controller.login = ({email, password}) => {
  view.setErrorMessage(
    "email-error",
    email === "" ? "Please input your email" : ""
  );
  view.setErrorMessage(
    "password-error",
    password === "" ? "Please input your password" : ""
  );
  if (email !== "" && password !== "") {
    model.login({ email, password });
  }
};
