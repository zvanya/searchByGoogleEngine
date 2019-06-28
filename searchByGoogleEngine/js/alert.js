const alertBox = document.getElementById('alertRow');

function clearAlertBox() {
    alertBox.innerHTML = '';
}

function createAlert(message, msgType) {
    let msgElement = document.createElement("div");
    let textNode = document.createTextNode(message);
    msgElement.classList.add('col', 'border', `border-${msgType}`, 'rounded-sm', 'mb-1', 'pt-2', 'pb-2', `text-dark`, 'd-flex', 'align-items-center');
    msgElement.appendChild(textNode);
    alertBox.appendChild(msgElement);
}

function displayAlert() {
    // alertBox.hidden = !displayValue;
    alertBox.style.display = 'block';
}

function hideAlert() {
    // alertBox.hidden = !displayValue;
    alertBox.style.display = 'none';
}
