export const LoginService = async (keys) => {
  let formBody = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < Object.keys(keys).length; i++) {
    const encodedKey = encodeURIComponent(Object.keys(keys)[i]);
    const encodedValue = encodeURIComponent(Object.values(keys)[i]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join("&");
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  });
  return res;
};
