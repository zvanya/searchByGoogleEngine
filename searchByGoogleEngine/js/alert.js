const alertBox = document.getElementById('alertRow');

function clearAlertBox() {
    alertBox.innerHTML = '';
}

function createAlert(message, msgType) {
    let msgElement = document.createElement("div");
    let textNode = document.createTextNode(message);
    msgElement.classList.add('col', 'mb-1', 'pt-2', 'pb-2', 'border', `border-${msgType}`, 'rounded-sm', `text-dark`, 'd-flex', 'align-items-center');
    msgElement.appendChild(textNode);
    alertBox.appendChild(msgElement);
}

function displayAlert() {
    alertBox.classList.remove('d-none');
    alertBox.classList.add('d-flex');
}

function hideAlert() {
    alertBox.classList.remove('d-flex');
    alertBox.classList.add('d-none');
}
