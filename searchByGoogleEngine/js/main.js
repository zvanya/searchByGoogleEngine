const cxList = [];

function startSearch() {
    let queryFileName = csvQueryList;
    let cxFileName = csvCxList;
    
    // Reading csv files:
    // http://learnjsdata.com/read_data.html
    // https://github.com/d3/d3-fetch/tree/v1.1.2
    d3.dsv(",", cxFileName, function(d) {
        return {
            cx: d.cx,
            abbr: d.abbr
        };
    }).then(function(data) {
        data.forEach((item) => {
            cxList.push(item);
        });
    });
    
    d3.dsv(",", queryFileName, function(d) {
        return {
            order: d.Order,
            cxAbbr: d.Vendor
        };
    }).then(function(data) {
        gSearch(data);
    });
}

function gSearch(qList) {
    errorSearchRequest = false;
    clearAlertBox();
    hideAlert();
    for (let i = 0; i < qList.length; i++) {
        let order = qList[i].order;
        let cxAbbr = qList[i].cxAbbr;
        let callback = '';
        
        let isQueryAbbrExistInCXList = cxList.some((cxEl) => {
            return cxEl.abbr === cxAbbr;
        });
        
        if (!isQueryAbbrExistInCXList) {
            let message = `Vendor "${cxAbbr}" not present in vendorList.csv. Check out it.`;
            createAlert(message, 'danger');
            displayAlert();
            continue;
        }
        
        switch (cxAbbr) {
            case "SIE":
                callback = 'hndlrSIE';
                break;
            case "SHN":
                callback = 'hndlrSHN';
                break;
            default:
                let message = `Vendor "${cxAbbr}" present in vendorList.csv, but script don\'t have any handler.`;
                createAlert(message, 'danger')
                displayAlert();
                continue;
        }
        
        let cxArr = cxList.filter((item) => {
            return item.abbr === cxAbbr;
        });
        
        let cx = cxArr[0].cx;
        
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${order}&callback=${callback}`;
        
        let scriptId = 'geSearchScript' + i;
        if (document.getElementById(scriptId)) {
            document.getElementById(scriptId).remove();
        }
        
        let script = document.createElement('script');
        script.id = scriptId;
        script.src = searchUrl;
        document.body.appendChild(script);
    }
}

function getElement(url, selector, c) {
    request(new XMLHttpRequest());
    
    function request(xhr) {
        xhr.open('GET', corsUrl + url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            let html;
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                html = document.createElement('div');
                html.innerHTML = xhr.responseText;
                c(html.querySelector(selector));
            }
        }
    }
}

function startDownload(imageURL, alt) {
    let downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", imageReceived, false);
    downloadedImg.alt = alt;
    downloadedImg.src = imageURL;
}

function imageReceived() {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    
    canvas.width = this.width;
    canvas.height = this.height;
    
    context.drawImage(this, 0, 0);
    
    let imageName = this.alt + '.jpg';
    
    try {
        //localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));
        //var pic = localStorage.getItem("saved-image-example");
        //var pic64 = canvas.toDataURL('image/jpeg', 1.0);
        
        const link = document.createElement("a");
        link.download = imageName;
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.click();
        link.remove();
    }
    catch(err) {
        console.log("Error: " + err);
    }
}

hideAlert();

// displayAlert(false);
// startSearch();
