function hndlrSIE(response) {

    if (response.error && !errorSearchRequest) {
        errorSearchRequest = true;
        let message = response.error.errors[0].reason + ". " + response.error.errors[0].message;
        createAlert(message, 'danger');
        displayAlert();
        return;
    } else if (response.error && errorSearchRequest) {
        return;
    }
    
    const searchUrl = response.items[1].link;
    const order = response.queries.request[0].searchTerms;
    const searchClass = ".pictureArea";
    
    getElement(searchUrl, searchClass, function (element) {
        // document.getElementById("content").innerHTML += "<br>" + element.innerHTML;
        // document.getElementById("content").innerHTML += "<br>" + document.querySelector('.productPicture').src;
        
        let newDiv = document.createElement("div");
        newDiv.appendChild(element);
        
        const imgUrl = corsUrl + newDiv.querySelector('.productPicture').src;
        startDownload(imgUrl, order);
    });
}
