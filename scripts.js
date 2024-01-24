const elements = {
  textContent: document.querySelector("textarea[name='text_input']"),
  cryptoButton: document.querySelector("#encrypt-button"),
  decryptoButton: document.querySelector("#decrypt-button"),
  outputArea: document.querySelector(".container__output"),
};

elements.cryptoButton.onclick = () => {
  console.log("a");
  displayOutputContent("crypt");
};
elements.decryptoButton.onclick = () => displayOutputContent("decrypt");

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

function displayOutputContent(action) {
  let text = elements.textContent.value;
  if (text == "") return;

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
