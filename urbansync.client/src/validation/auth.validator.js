const requiredFieldMessage = "This field is required";
const isValidEmail = (email, setEmailError) => {
  if (!email || email.length < 1) {
    setEmailError(requiredFieldMessage);
    return false;
  }
  if (!email.match(/@/)) {
    setEmailError("Invalid email address, must contian the @.");
    return false;
  }
  return true;
};
const isValidUsername = (username, setUsernameError) => {
  if (!username) {
    setUsernameError(requiredFieldMessage);
    return false;
  }
  if (username.length < 6) {
    setUsernameError("Usernmae must be atleast 6 characters long.");
    return false;
  }
  return true;
};

const isValidPassword = (password, setPasswordError) => {
  if (!password) {
    setPasswordError(requiredFieldMessage);
    false;
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    setPasswordError(
      "Must be atleast 8 characters long,1 upper case, 1 special character: Somthing.1"
    );
    return false;
  }
  return true;
};

const isValidName = (name, setNameError) => {
  if (!name) {
    setNameError(requiredFieldMessage);
    return false;
  }
  if (name.length <= 3) {
    setNameError("Name must be more then 3 characters long.");
    return false;
  }
};
