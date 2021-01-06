let str1 = "test123";
let str2 = "test123";

function advancedValidatePassword(username, password) {
  let pattern = 0;
  let compareLength;
  if (username.length > password.length) {
    compareLength = username.length;
  } else {
    compareLength = password.length;
  }

  for (let i = 0; i < compareLength - 1; i++) {
    if (username[i] === password[i]) pattern += 1;
  }

  return pattern > parseInt((compareLength * 60) / 100);
}

console.log(advancedValidatePassword("test123", "test134"));
