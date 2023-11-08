"use strict";

const TELEGRAM_BOT_TOKEN = "6679407808:AAElq8zu0E10JQxiSeUV2IBBY9W1Gx0mG30";
const TELEGRAM_CHAT_ID = "@FrontSendMessage";
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

/*burger*/
document.querySelector(".burger").addEventListener("click", function () {
  this.classList.toggle("active");
  console.log(document.querySelectorAll(".nav"));
  document.querySelectorAll(".nav").forEach((x) => x.classList.toggle("open"));
});

/*send tlg message from form*/
async function sendEmailTelegram(event) {
  event.preventDefault();

  const form = event.target;
  const formBtn = document.querySelector(".footer__submit");
  const formSendRes = document.querySelector(".form__send-result");
  formSendRes.textContent = "";

  const { name, email, message } = Object.fromEntries(
    new FormData(form).entries()
  );

  const text = `Application from ${name}!\nEmail: ${email}\nMessage: ${message}`;

  try {
    formBtn.textContent = "Sending..";

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });
    if (response.ok) {
      formSendRes.textContent = "Your message has been sent";
      form.reset();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    formSendRes.textContent = "The message has not been sent, try again later.";
    formSendRes.style.color = "red";
  } finally {
    formBtn.textContent = "Submit";
  }
}
