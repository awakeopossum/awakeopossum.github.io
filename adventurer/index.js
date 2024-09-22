var onDataReady = function (data) {
    compileStoriesListGroup(data);
};

var compileStoriesListGroup = function (data) {
    // reset #stories-list-group
    const listGroup = document.querySelector("#stories-list-group");
    listGroup.innerHTML = "";
    for (const id of Object.keys(data)) {
        addStoryToListGroup(id);
        // TODO: CHANGE INPUT TO NORMAL TEXT
        listGroup.querySelector(`#story-${id}-name-input`).value = DOMPurify.sanitize(adventurerData[id]['title']);
    }
};

// TODO: CHECK EVERYTHING AFTER THIS POINT

var addStoryToListGroup = function (id) {
    id = DOMPurify.sanitize(id);
    document.querySelector("#stories-list-group").insertAdjacentHTML('beforeend',
        `<a href="play.html?story=${id}" class="list-group-item list-group-item-action container" id="story-${id}-link">
    <div class="container">
        <div class="row justify-content-between">
            <input type="text" class="border border-0 background-transparent col-5" name="story-${id}-name" id="story-${id}-name-input" value="Story ${id}" />
            <p class="m-0 p-1 col-1 text-end">></p>
        </div>
    </div>
</a>`);
};

var addNewStoryToListGroup = function () {
    document.querySelector("#stories-list-group").insertAdjacentHTML('beforeend',
        `<a href="create.html" class="list-group-item list-group-item-action container">
    <div class="container">
        <div class="row justify-content-between">
            <input type="text" class="border border-0 background-transparent col-5" value="New Story" />
            <p class="m-0 p-1 col-1 text-end">></p>
        </div>
    </div>
</a>`);
}

var uploadStoryFile = function (file) {
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (evt) {
            try {
                data = JSON.parse(evt.target.result);
                for (const key of Object.keys(data)) {
                    addStoryToData(data[key]);
                }
                saveDataToMemory();
                onDataReady(adventurerData);
            } catch (e) {
                // throw alert: file is not suitable
                // TODO: CHANGE
                alert("[Error]: file is not suitable");
                console.error(e);
            }
        }
        reader.onerror = function (evt) {
            // throw alert
            // TODO: CHANGE
            alert("[Error]: reader error: ", evt);
            console.error(evt);
        }
    }
}

var downloadStoryFile = function (data = adventurerData) {
    //CAREFUL: DOWNLOADS CAN BE DANGEROUS
    downloadFile(
        'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)),
        "my-stories.json"
    );
};