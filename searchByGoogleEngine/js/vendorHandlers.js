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
    
    const searchUrl = response.items[1].link;
    const order = response.queries.request[0].searchTerms;
    
    const searchClass = ".pictureArea";
    
    getElement(searchUrl, searchClass, function (element) {
        let newDiv = document.createElement("div");
        newDiv.appendChild(element);
    
        let cxArr = cxList.filter((item) => {
            return item.cx === response.queries.request[0].cx;
        });
        let cxAbbr = cxArr[0].abbr;
    
        const imgUrl = corsUrl + newDiv.querySelector('.productPicture').src;
        startDownload(imgUrl, cxAbbr + "." + order);
    });
}


function hndlrSCH(response) {   // *.schneider-electric
    
    if (errSearchEngine(response)) return;
    
    const searchUrl = response.items[0].link;
    const order = response.queries.request[0].searchTerms;
    
    const searchClass = ".product-main-info__main-product.js-product-main-info__main-product";
    
    getElement(searchUrl, searchClass, function (divElement) {
        let cxArr = cxList.filter((item) => {
            return item.cx === response.queries.request[0].cx;
        });
        let cxAbbr = cxArr[0].abbr;
    
        const imgUrl = corsUrl + divElement.querySelector('img').src;
        startDownload(imgUrl, cxAbbr + "." + order);
    });
}


function hndlrWEI(response) {   // *.catalog.weidmueller.com
    
    const WEIDomen = 'https://catalog.weidmueller.com';
    
    if (errSearchEngine(response)) return;
    
    const searchUrl = response.items[0].link;
    const order = response.queries.request[0].searchTerms;
    
    const searchClass = "#rondellGallery .elevatezoom-gallery";

    getElement(searchUrl, searchClass, function (divElement) {
        let cxArr = cxList.filter((item) => {
            return item.cx === response.queries.request[0].cx;
        });
        let cxAbbr = cxArr[0].abbr;
        
        const imgUrl = corsUrl + WEIDomen + divElement.querySelector('img').src.replace('http://pln', '');
        startDownload(imgUrl, cxAbbr + "." + order);
    });
}

function hndlrRIT(response) {   // *.rittal.com
    
    if (errSearchEngine(response)) return;
    
    const searchUrl = response.items[0].link;
    const order = response.queries.request[0].searchTerms;
    
    const searchClass = "*";

    getElement(searchUrl, searchClass, function (divElement) {
        let cxArr = cxList.filter((item) => {
            return item.cx === response.queries.request[0].cx;
        });
        let cxAbbr = cxArr[0].abbr;
        
        const imgUrl = corsUrl + divElement.querySelector('img').src;
        startDownload(imgUrl, cxAbbr + "." + order);
    });
}
