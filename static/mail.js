const sendMail = async (payload) => {
  try {
    const res = await fetch("api/email", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const jsonRes = await res.json();

    if (jsonRes.success) {
      window.location.replace("/agradecimiento");
    }
  } catch (e) {
    console.log(e);
  }
};
window.addEventListener("load", () => {
  const form = document.getElementById("frmenviar");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const check = formData.get("terminos");
    const firstName = formData.get("name");
    const email = formData.get("email");

    if (!firstName || !email) {
      alert("Favor llena todos los campos");
      return;
    }

    if (!check) {
      alert("Favor acepta recibir los emails");
      return;
    }

    const payload = {
      email,
      firstName,
    };

    sendMail(payload);
  });
});
