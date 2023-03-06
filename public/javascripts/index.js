const baseURL = "http://localhost:3000/cars";
const dialog = document.querySelector("dialog");

const formSubmit = async (event, action) => {
  event.preventDefault();
  const registration_no = document.getElementById(
    `registration-no-${action}`
  ).value;
  try {
    let res = await fetch(`${baseURL}/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registration_no }),
    });
    let status = res.status;
    res = await res.json();
    if (status !== 200) {
      document.getElementById(`error-div-${action}`).classList.remove("d-none");
      document.getElementById(`error-div-${action}`).innerHTML = `
      <h4 class="d-inline text-danger">${res.message}</h4>`;
      return;
    }
    document.getElementById(`error-div-${action}`).classList.add("d-none");
    if (action === "park") {
      document.getElementById("slot-div").classList.remove("d-none");
      document.getElementById("slot-id").innerText = res.slot;
      document.getElementById(
        "modal-div"
      ).innerHTML = `Your Car has been parked: ${res.slot}`;
    } else {
      document
        .getElementById(`success-div-${action}`)
        .classList.remove("d-none");
      document.getElementById(
        `success-div-${action}`
      ).innerHTML = `<h4 class="d-inline text-success">Car has been unparked</h4>`;
      document.getElementById(
        "modal-div"
      ).innerHTML = `Your Car has been unparked`;
    }
    dialog.showModal();

    document.querySelectorAll("[id=car-form]").forEach((form) => form.reset());
  } catch (e) {
    console.log(e);
    alert("Something went wrong");
  }
};

dialog.addEventListener("close", () => {
  window.location.reload();
});
