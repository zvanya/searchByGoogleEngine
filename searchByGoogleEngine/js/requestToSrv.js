function reqToNodeSrv() {
    const url = `http://localhost:3001`;
    request(new XMLHttpRequest());
    
    function request(xhr) {
        xhr.open('POST', url, true);
        // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        // xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
        // xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({name:"John Rambo", time:"2pm"}));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(`xhr.responseText: ${xhr.responseText}`);
            }
        }
    }
}
