export const callIntention = async (data) => {
  let response = await fetch("SOME_API_HERE", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      sequence: data,
    }),
  });
  let result = response.json();
  return result;
};
