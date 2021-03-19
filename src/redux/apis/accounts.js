export const callRegister = async (data) => {
  console.log("Hello data");
  console.log(data);
  let response = await fetch("http://localhost:3001/accounts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });
  let result = response.json();
  return result;
};

export const callLogin = async (data) => {
  let response = await fetch("http://localhost:3001/accounts/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });
  let result = response.json();
  return result;
};

export const callUser = async (data) => {
  let response = await fetch(`http://localhost:3001/accounts/${data}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  let result = response.json();
  return result;
};

export const callEditUser = async (data) => {
  let response = await fetch(`http://localhost:3001/accounts/${data.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: data.authorization,
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });
  let result = response.json();
  return result;
};
