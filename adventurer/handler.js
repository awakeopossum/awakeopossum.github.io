let adventurerData;

var loadDataFromMemory = function () {
    var stringData = localStorage.getItem("adventurerStringData");
    if (stringData) {
        try {
            adventurerData = JSON.parse(stringData);
        } catch (e) {
            // TODO: WRITE FUNCTION
            errorOccurred("Impossible to convert stored data to JSON");
            // TODO: sleep and retry?
        }
        onDataReady(adventurerData);
    } else {
        // fetch default JSON
        try {
            fetch('adventurerData.JSON')
            .then(response => response.json())
            .then(data => { 
                adventurerData = data;
                onDataReady(adventurerData);
             });
        } catch (e) {
            // TODO: WRITE FUNCTION
            errorOccurred("Impossible to retrieve any data. Please make sure your connection's okay and reload.");
        }
        
    }
};

var saveDataToMemory = function () {
    try {
        var stringData = JSON.stringify(adventurerData);
        localStorage.setItem("adventurerStringData", stringData);
        return true;
    } catch (e) {
        // TODO: THROW ERROR
        errorOccurred("Impossible to save data to memory");
        return false;
    }
};

var getHighestStoryIDUsed = function (data = adventurerData) {
    var lastStoryID = 0;
    for (var key of Object.keys(data)) {
        //TODO: trycatch parseInt
        if (parseInt(key) > lastStoryID) {
            lastStoryID = key;
        }
    }
    return parseInt(lastStoryID);
};

var getStoryNumberFromParameter = function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const storyNumber = DOMPurify.sanitize(urlParams.get("story"));
        return parseInt(storyNumber);
    } catch (e) {
        // TODO: WRITE FUNCTION
        errorOccurred("Impossible to retrieve story number from parameter");
        return false;
    }
};

var addStoryToData = function (story) {
    try {
       last = getHighestStoryIDUsed(adventurerData);
       adventurerData[`${last + 1}`] = story;
    } catch (e) {
        // TODO: WRITE ALTERNATIVE
        console.log(e);
        errorOccurred("Impossible to add retrieved story data to adventurerData");
    }
};

var downloadFile = function (content, filename) {
        // TODO: THROW INPUT ALERT FOR FILENAME
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
    
        // TODO: CAREFUL: DOWNLOADS CAN BE DANGEROUS
        a.href = content;
        a.download = filename;
        a.click();
        document.body.removeChild(a);
}