const baseURL = "/cars";
const dialog = document.querySelector("dialog");

function renderErrorMessage(message, action) {
  document.getElementById(`error-div-${action}`).classList.remove("d-none");
  document.getElementById(`error-div-${action}`).innerHTML = `
      <h4 class="d-inline text-danger">${message}</h4>`;
}

async function parkCar(registration_no) {
  let action = "park";
  try {
    let res = await fetch(`${baseURL}/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registration_no }),
    });

    const status = res.status;
    res = await res.json();

    if (status !== 200) {
      renderErrorMessage(res.message, action);
      return;
    }
    document.getElementById(`error-div-${action}`).classList.add("d-none");
    document.getElementById("slot-div").classList.remove("d-none");
    document.getElementById("slot-id").innerText = res.slot;
    document.getElementById(
      "modal-div"
    ).innerHTML = `${res.message}: ${res.slot}`;

    dialog.showModal();

    document.querySelectorAll("[id=car-form]").forEach((form) => form.reset());
  } catch (e) {
    console.log(e);
    alert("Something went wrong");
  }
}

async function unparkCar(registration_no) {
  let action = "unpark";
  try {
    let res = await fetch(`${baseURL}/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registration_no }),
    });

    const status = res.status;
    res = await res.json();

    if (status !== 200) {
      renderErrorMessage(res.message, action);
      return;
    }
    document.getElementById(`error-div-${action}`).classList.add("d-none");

    document.getElementById(`success-div-${action}`).classList.remove("d-none");
    document.getElementById(
      `success-div-${action}`
    ).innerHTML = `<h4 class="d-inline text-success">Car has been unparked</h4>`;
    document.getElementById(
      "modal-div"
    ).innerHTML = `Your Car has been unparked`;

    dialog.showModal();

    document.querySelectorAll("[id=car-form]").forEach((form) => form.reset());
  } catch (e) {
    console.log(e);
    alert("Something went wrong");
  }
}

async function findCar(registration_no) {
  try {
    let action = "unpark";
    let res = await fetch(`${baseURL}/${registration_no}`);
    let status = res.status;
    res = await res.json();
    if (status !== 200) {
      renderErrorMessage(res.message, action);
      return;
    }
    document.getElementById(`error-div-${action}`).classList.add("d-none");

    document.getElementById(`success-div-${action}`).classList.remove("d-none");
    document.getElementById(
      `success-div-${action}`
    ).innerHTML = `<div class = "d-flex flex-column align-items-center"><p class=" fs-4 my-1">Car has been parked :-<strong class="d-inline text-success">${res.slot}</strong></p><button type="button" class="btn btn-outline-danger d-block my-2 mx-auto" onclick="unparkCar('${registration_no}')">Unpark</button></div>`;
  } catch (e) {
    console.log(e);
    alert("Something went wrong !");
  }
}

const formSubmit = async (event, action) => {
  event.preventDefault();
  const registration_no = document.getElementById(
    `registration-no-${action}`
  ).value;
  if (action === "park") {
    await parkCar(registration_no);
  } else {
    await findCar(registration_no);
  }
};

dialog.addEventListener("close", () => {
  window.location.reload();
});
