const elements = {
  textContent: document.querySelector(".text_input"),
  cryptoButton: document.querySelector("#encrypt-button"),
  decryptoButton: document.querySelector("#decrypt-button"),
  outputArea: document.querySelector(".container__output"),
};

elements.cryptoButton.addEventListener("click", () =>
  displayOutputContent("crypt")
);
elements.decryptoButton.addEventListener("click", () =>
  displayOutputContent("decrypt")
);

function handleEncryption(text) {
  let encryptedText = text
    .replaceAll("e", "enter")
    .replaceAll("i", "imes")
    .replaceAll("a", "ai")
    .replaceAll("o", "ober")
    .replaceAll("u", "ufat");

  return encryptedText;
}

function handleDecryption(text) {
  let decryptedText = text
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ai", "a")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");

  return decryptedText;
}

function isInputValid(text) {
  const regex = /[^a-z\s]/gi;
  if (text == text.toLowerCase() && !regex.test(text)) return true;
  else return false;
}

function displayOutputContent(action) {
  let text = elements.textContent.value;
  if (text == "") return displayAlert("Campo de texto vazio", 0);
  if (!isInputValid(text)) return displayAlert("Campo de texto inválido", -1);

  const outputContent = document.createElement("textarea");
  outputContent.className = "output__content";
  outputContent.disabled = true;

  const copyButton = document.createElement("button");
  copyButton.id = "copy-button";
  copyButton.type = "button";
  copyButton.innerText = "Copiar";

  if (action == "crypt") {
    outputContent.value = handleEncryption(text);
    displayAlert("Criptografia concluida", 1);
  } else if (action == "decrypt") {
    outputContent.value = handleDecryption(text);
    displayAlert("Descriptografia concluida", 2);
  }

  copyButton.addEventListener("click", () => {
    console.log(document.querySelector(".output__content"));
    navigator.clipboard.writeText(outputContent.value);
    displayAlert("Copiado para área de transferência", 3);
  });

  elements.outputArea.innerHTML = "";
  elements.outputArea.append(outputContent, copyButton);
}

let lastType = 0;

function displayAlert(text, type) {
  if (document.querySelector(".modal__alert") && lastType == type) return;
  if (document.querySelectorAll(".modal__alert"))
    document.querySelectorAll(".modal__alert").forEach(removeAlert);

  const alert = document.createElement("div");
  alert.className = "modal__alert";
  alert.classList.add(
    (type == -1 && "error") || (type == 0 && "attention") || "sucess"
  );
  lastType = type;

  const alertText = document.createElement("span");
  alertText.textContent = text;

  const alertClose = document.createElement("span");
  alertClose.textContent = "✕";
  alertClose.addEventListener("click", () => removeAlert(alert));

  alert.append(alertText, alertClose);

  document.body.appendChild(alert);

  setTimeout(() => {
    if (alert) removeAlert(alert);
  }, 4000);
}

function removeAlert(modal) {
  if (!document.body.contains(modal)) return;
  modal.style.opacity = 0;
  setTimeout(() => {
    document.body.removeChild(modal);
  }, 300);
}
