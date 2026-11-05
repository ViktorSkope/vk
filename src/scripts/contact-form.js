const MESSAGES = {
  valueMissing: "Please fill in this field.",
  typeMismatch: "Please enter a valid email address.",
};

function fieldError(field) {
  if (field.validity.valueMissing) return MESSAGES.valueMissing;
  if (field.validity.typeMismatch) return MESSAGES.typeMismatch;
  return "";
}

function showFieldError(field) {
  const error = fieldError(field);
  const output = document.getElementById(`${field.id}-error`);
  output.textContent = error;
  if (error) field.setAttribute("aria-invalid", "true");
  else field.removeAttribute("aria-invalid");
  return !error;
}

// Without a data-endpoint on the form, this simulates success so the states can be
// reviewed. Nothing is sent. Set data-endpoint once a form service is connected.
async function send(form) {
  const endpoint = form.dataset.endpoint;
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return;
  }
  const response = await fetch(endpoint, { method: "POST", body: new FormData(form) });
  if (!response.ok) throw new Error(`Form request failed: ${response.status}`);
}

export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = [...form.querySelectorAll("input[required], select[required], textarea[required]")];
  const submit = form.querySelector("[type=submit]");
  const failure = form.querySelector("[data-form-error]");
  const success = document.getElementById("contact-success");

  fields.forEach((field) => {
    field.addEventListener("blur", () => showFieldError(field));
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) showFieldError(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submit.hasAttribute("aria-busy")) return;

    const invalid = fields.filter((field) => !showFieldError(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    failure.hidden = true;
    submit.setAttribute("aria-busy", "true");

    try {
      await send(form);
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch {
      failure.hidden = false;
    } finally {
      submit.removeAttribute("aria-busy");
    }
  });
}
