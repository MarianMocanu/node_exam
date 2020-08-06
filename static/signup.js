function validateForm() {
  const {
    firstname,
    lastname,
    cpr,
    email,
    password,
    cpassword
  } = document.forms.signup;

  // Email validation
  if (email.value) {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regEx.test(String(email.value).toLowerCase());
    if (!valid) {
      alert('Invalid e-mail address!');
      return false;
    };
  };

  // CPR validation
  if (isNaN(cpr.value)) {
    alert('CPR can only contain numbers!')
    return false;
  } else if (string.value.length != 8) {
    alert('CPR has to have 8 numbers')
    return false;
  };

  // First and last name less than 3 characters
  const minNameLength = 3;
  if (firstname.value.length < minNameLength || lastname.value.length < minNameLength) {
    alert('Name has to have at least 3 characters');
    return false;
  };

  // Passwords not matching
  if (password.value !== cpassword.value) {
    alert('Passwords do not match!');
    return false;
  };

  // Passwords have less than 8 characters
  const minPassLength = 8;
  if (password.value.length < minPassLength && cpassword.value.length < minPassLength) {
    alert('Password must have at least 8 characters!');
    return false;
  };

  return validation;
};