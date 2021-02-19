export const callCorrection = async (data) => {
  let response = await fetch("http://localhost:3001/activities", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      actType: "Correction",
      content: data,
      user: "5fed577b2ee1c426209dbb94",
    }),
  });
  let result = response.json();
  return result;
};
