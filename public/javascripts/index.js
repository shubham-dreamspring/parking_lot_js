const baseURL = "http://localhost:3000/cars";
const formSubmit = async (e, action) => {
  e.preventDefault();
  const registration_no = document.getElementById(
    `registration-no-${action}`
  ).value;
  let res = await fetch(`${baseURL}/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ registration_no }),
  });
  res = await res.json();
  console.log(res);
};
