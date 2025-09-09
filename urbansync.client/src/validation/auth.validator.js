const requiredFieldMessage = "This field is required";
export const isValidEmail = (email) => {
  if (!email || email.length < 1) {
    return requiredFieldMessage;
  }
  if (!email.match(/@/)) {
    return "Invalid email address, must contain @.";
  }
  return true;
};

export const isValidUsername = (username) => {
  if (!username) {
    return requiredFieldMessage;
  }
  if (username.length < 6) {
    return "Username must be at least 6 characters long.";
  }

  return true;
};

export const isValidPassword = (password) => {
  if (!password) {
    return requiredFieldMessage;
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Must be at least 8 characters long, include 1 uppercase, 1 number, 1 special character.";
  }
  return true;
};

export const isValidName = (name) => {
  if (!name) {
    return requiredFieldMessage;
    
  }
  if (name.length <= 3) {
   return "Name must be more than 3 characters long.";
    
  }

  return true;
};
