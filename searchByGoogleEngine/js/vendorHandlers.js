function errSearchEngine(response) {
    if (response.error && !errorSearchRequest) {
        errorSearchRequest = true;
        let message = response.error.errors[0].reason + ". " + response.error.errors[0].message;
        createAlert(message, 'danger');
        displayAlert();
        return true;
    } else if (response.error && errorSearchRequest) {
        return true;
    } else {
        return false
    }
}

function hndlrSIE(response) {   // *.mall.industry.siemens

    if (errSearchEngine(response)) return;
    
    // if (response.error && !errorSearchRequest) {
    //     errorSearchRequest = true;
    //     let message = response.error.errors[0].reason + ". " + response.error.errors[0].message;
    //     createAlert(message, 'danger');
    //     displayAlert();
    //     return;
    // } else if (response.error && errorSearchRequest) {
    //     return;
    // }
    
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


function hndlrSCH(response) {   // *.schneider-electric
    
    if (errSearchEngine(response)) return;
    
    const searchUrl = response.items[0].link;
    const order = response.queries.request[0].searchTerms;
    
    console.log(`hndlrSCH.searchUrl: ${searchUrl}`);
    
    const searchClass = ".product-main-info__main-product.js-product-main-info__main-product";
    
    getElement(searchUrl, searchClass, function (imgElement) {
        // document.getElementById("content").innerHTML += "<br>" + element.innerHTML;
        // document.getElementById("content").innerHTML += "<br>" + document.querySelector('.productPicture').src;
    
        console.log(`imgElement: ${imgElement}`);
        
        const imgUrl = corsUrl + imgElement.src;
        startDownload(imgUrl, order);
    });
}
