export const callCorrection = async (data) => {
  let response = await fetch("SOME_API_HERE", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sequence: data,
    }),
  });
  let result = response.json();
  return result;
};
