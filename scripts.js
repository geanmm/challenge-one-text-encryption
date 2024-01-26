const elements = {
  textContent: document.querySelector(".text_input"),
  cryptoButton: document.querySelector("#encrypt-button"),
  decryptoButton: document.querySelector("#decrypt-button"),
  outputArea: document.querySelector(".container__output"),
  popUpAlert: document.querySelector(".modal__alert"),
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
  if (text == "") return;
  if (!isInputValid(text)) return displayAlert();

  const outputContent = document.createElement("textarea");
  outputContent.className = "output__content";
  outputContent.disabled = true;

  const copyButton = document.createElement("button");
  copyButton.id = "copy-button";
  copyButton.type = "button";
  copyButton.innerText = "Copiar";

  if (action == "crypt") {
    outputContent.value = handleEncryption(text);
  } else if (action == "decrypt") {
    outputContent.value = handleDecryption(text);
  }

  copyButton.onclick = () => navigator.clipboard.writeText(outputContent.value);

  elements.outputArea.innerHTML = "";
  elements.outputArea.append(outputContent, copyButton);
}

function displayAlert() {
  const alert = document.createElement("div");
  alert.className = "modal__alert";
  alert.innerText = "Campo de texto inválido";

  const container = document.querySelector(".modal__container");
  container.appendChild(alert);

  setTimeout(() => container.removeChild(alert), 3000);
}
