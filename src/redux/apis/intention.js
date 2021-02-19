export const callIntention = async (data) => {
  let response = await fetch("SOME_API_HERE", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      actType: "Intention",
      content: data,
      user: "5fed577b2ee1c426209dbb94",
    }),
  });
  let result = response.json();
  return result;
};
