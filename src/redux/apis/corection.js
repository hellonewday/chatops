export const callCorrection = async (data) => {
  let response = await fetch("http://203.171.21.65:3001/activities", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: data.authorization,
    },
    body: JSON.stringify({
      actType: "Correction",
      content: data.text,
    }),
  });
  let result = response.json();
  return result;
};
