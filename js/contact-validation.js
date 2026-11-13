const VALIDATION_RULES = {
  name: {
    required: true,
    errorEmpty: "Please enter your name."
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorEmpty: "Please enter your email.",
    errorPattern: "That doesn't look like a valid email address."
  },
  "item-details": {
    required: true,
    minLength: 5,
    errorEmpty: "Let us know what you'd like to order or ask about.",
    errorMinLength: "Please add a few more details (at least 5 characters)."
  }
};

function showError(fieldId, message) {
  const errorEl = document.getElementById(fieldId + "-error");
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearError(fieldId) {
  showError(fieldId, "");
}

function validateField(fieldId) {
  const rules = VALIDATION_RULES[fieldId];
  const field = document.getElementById(fieldId);
  const value = field.value.trim();

  if (rules.required && value === "") {
    showError(fieldId, rules.errorEmpty);
    return false;
  }

  if (rules.minLength && value.length < rules.minLength) {
    showError(fieldId, rules.errorMinLength);
    return false;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    showError(fieldId, rules.errorPattern);
    return false;
  }

  clearError(fieldId);
  return true;
}

function validateForm() {
  const fieldIds = Object.keys(VALIDATION_RULES);
  let allValid = true;

  fieldIds.forEach(function (fieldId) {
    const fieldIsValid = validateField(fieldId);
    if (!fieldIsValid) {
      allValid = false;
    }
  });

  return allValid;
}

function rememberContactInfo() {
  const info = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim()
  };
  localStorage.setItem("bakeryContactInfo", JSON.stringify(info));
}

function prefillContactInfo() {
  const stored = localStorage.getItem("bakeryContactInfo");
  if (!stored) {
    return;
  }
  const info = JSON.parse(stored);
  if (info.name) {
    document.getElementById("name").value = info.name;
  }
  if (info.email) {
    document.getElementById("email").value = info.email;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const successMessage = document.getElementById("form-success");
  successMessage.hidden = true;

  if (!validateForm()) {
    return;
  }

  rememberContactInfo();
  successMessage.hidden = false;
}

document.addEventListener("DOMContentLoaded", function () {
  prefillContactInfo();
  document.getElementById("contact-form").addEventListener("submit", handleSubmit);
});
