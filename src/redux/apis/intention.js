export const callIntention = async (data) => {
  let response = await fetch("http://localhost:3001/activities", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": data.authorization
    },
    method: "POST",
    body: JSON.stringify({
      actType: "Intention",
      content: data.text,
    }),
  });
  let result = response.json();
  return result;
};
