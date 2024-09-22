var story;
var rooms = 0;
var storyID;

var onDataReady = function (data) {
    if (getStoryNumberFromParameter()) {
        storyID = getStoryNumberFromParameter();
        loadStoryFromID(storyID);
    } else {
        addNewRoomToStory();
    }
}

var addNewRoomToStory = function () {

    let linkOptions = "";
    for (let c = 0; c < rooms; c++) {
        linkOptions += DOMPurify.sanitize(`
<option value="${c + 1}">${c + 1}</option>`);
    }
    rooms++;

    rooms = parseInt(DOMPurify.sanitize(rooms));
    let accordionHTML = `
<div class="accordion-item" id="room-${rooms}-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${rooms}" aria-expanded="true" aria-controls="collapse-${rooms}">
            Room #${rooms}
        </button>
    </h2>
    <div id="collapse-${rooms}" class="accordion-collapse collapse" >
        <div class="accordion-body">
            <div class="form-floating input-group input-group-sm mb-3">
                <textarea name="room-${rooms}-textarea" class="border border-2 rounded px-3" id="room-${rooms}-textarea" cols="30" placeholder="This is the text for Room #${rooms}"></textarea>
            </div>
            <div>
                <div class="form-floating input-group input-group-sm mb-3">
                    <span class="input-group-text col-8" id="room-${rooms}-choice-1-span">[<input type="text" name="room-${rooms}-choice-1-text" id="room-${rooms}-choice-1-text" class="text-wrap bg-transparent p-1 border border-0" value="Choice 1" />]</span>
                    <select type="number" id="room-${rooms}-choice-1-select" class="form-control p-2 room-choice-select" placeholder="15" aria-label="Choice 1" aria-describedby="room-${rooms}-choice-1-span">
                        ${linkOptions}
                    </select>
                </div>
                <div class="form-floating input-group input-group-sm mb-3">
                    <span class="input-group-text col-8" id="room-${rooms}-choice-2-span">[<input type="text" name="room-${rooms}-choice-2-text" id="room-${rooms}-choice-2-text" class="text-wrap bg-transparent p-1 border border-0" value="Choice 2" />]</span>
                    <select type="number" id="room-${rooms}-choice-2-select" class="form-control p-2 room-choice-select" placeholder="15" aria-label="Choice 2" aria-describedby="room-${rooms}-choice-2-span">
                        ${linkOptions}
                    </select>
                </div>
                <div class="form-floating input-group input-group-sm mb-3">
                    <span class="input-group-text col-8" id="room-${rooms}-timer-duration-span">[Timer duration]</span>
                    <input type="number" id="room-${rooms}-timer-duration-input" name="room-${rooms}-timer-duration-input" class="form-control p-2" value="10" />
                </div>
                <div class="form-floating input-group input-group-sm mb-3">
                    <span class="input-group-text col-8" id="room-${rooms}-timer-dest-span">[Timer destination]</span>
                    <select type="number" id="room-${rooms}-timer-dest-select" class="form-control p-2 room-choice-select" placeholder="15" aria-label="Time-up destination" aria-describedby="room-${rooms}-timer-dest-span">
                        ${linkOptions}
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>`;

    document.querySelector("#rooms-accordion").insertAdjacentHTML('beforeend', accordionHTML);
    updateRooms();

};

var addRoomToStory = function (room, id = rooms) {
    rooms++;

    id = DOMPurify.sanitize(id);

    let accordionHTML = `
<div class="accordion-item" id="room-${id}-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">
            Room #${id}
        </button>
    </h2>
    <div id="collapse-${id}" class="accordion-collapse collapse" >
        <div class="accordion-body">
            <div class="form-floating input-group input-group-sm mb-3">
                <textarea name="room-${id}-textarea" class="border border-2 rounded px-3" id="room-${id}-textarea" cols="30" placeholder="This is the text for Room #${id}">${room.text}</textarea>
            </div>
            <div>
                <div class="form-floating input-group input-group-sm mb-3">
                    <span class="input-group-text col-8" id="room-${id}-choice-1-span">[<input type="text" name="room-${id}-choice-1-text" id="room-${id}-choice-1-text" class="text-wrap bg-transparent p-1 border border-0" value="${room.choice1.text}" />]</span>
                    <select type="number" id="room-${id}-choice-1-select" class="form-control p-2 room-choice-select" placeholder="15" aria-label="Choice 1" aria-describedby="room-${id}-choice-1-span" value="${room.choice1.dest}">
                        
                    </select>
                </div>
                <div class="form-floating input-group input-group-sm mb-3">
                    <span class="input-group-text col-8" id="room-${id}-choice-2-span">[<input type="text" name="room-${id}-choice-2-text" id="room-${id}-choice-2-text" class="text-wrap bg-transparent p-1 border border-0" value="${room.choice2.text}" />]</span>
                    <select type="number" id="room-${id}-choice-2-select" class="form-control p-2 room-choice-select" placeholder="15" aria-label="Choice 2" aria-describedby="room-${id}-choice-2-span" value="${room.choice2.dest}">
                        
                    </select>
                </div>
                <div class="form-floating input-group input-group-sm mb-3">
                    <span class="input-group-text col-8" id="room-${id}-timer-duration-span">[Timer duration]</span>
                    <input type="number" id="room-${id}-timer-duration-input" name="room-${id}-timer-duration-input" class="form-control p-2" value="${room.timer.duration}" />
                </div>
                <div class="form-floating input-group input-group-sm mb-3">
                    <span class="input-group-text col-8" id="room-${id}-timer-dest-span">[Timer destination]</span>
                    <select type="number" id="room-${id}-timer-dest-select" class="form-control p-2 room-choice-select" placeholder="15" aria-label="Time-up destination" aria-describedby="room-${id}-timer-dest-span" value="${room.timer.dest}">
                        
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>`;

    document.querySelector("#rooms-accordion").innerHTML += accordionHTML;
}

var updateRooms = function () {
    for (var i of document.querySelectorAll(".room-choice-select")) {
        i.innerHTML += `<option value="${rooms}">${rooms}</option>`;
    }
}

//TODO: CHECK ALL AFTER THIS POINT
var saveStory = function () {
    console.log(getStoryDataFromPage());
    if (getStoryNumberFromParameter()) {
        storyID = getStoryNumberFromParameter();
        adventurerData[storyID] = getStoryDataFromPage();
    } else {
        addStoryToData(getStoryDataFromPage());
    }
    
    console.log(adventurerData);
    saveDataToMemory();
};

var getStoryDataFromPage = function () {
    var currentRoom = 0;
    try {

        var rooms = {}
        Array.from(document.querySelectorAll(".accordion-item")).forEach(item => {
            currentRoom += 1;
            rooms[`${currentRoom}`] = {};
            rooms[`${currentRoom}`]['text'] =  item.querySelector(`#room-${currentRoom}-textarea`).value;
            rooms[`${currentRoom}`]['choice1'] = {};
            rooms[`${currentRoom}`]['choice2'] = {};
            rooms[`${currentRoom}`]['choice1']['text'] = item.querySelector(`#room-${currentRoom}-choice-1-text`).value;
            rooms[`${currentRoom}`]['choice2']['text'] = item.querySelector(`#room-${currentRoom}-choice-2-text`).value;
            rooms[`${currentRoom}`]['choice1']['dest'] = item.querySelector(`#room-${currentRoom}-choice-1-select`).value;
            rooms[`${currentRoom}`]['choice2']['dest'] = item.querySelector(`#room-${currentRoom}-choice-2-select`).value;
            rooms[`${currentRoom}`]['timer'] = {};
            rooms[`${currentRoom}`]['timer']['duration'] = item.querySelector(`#room-${currentRoom}-timer-duration-input`).value;
            rooms[`${currentRoom}`]['timer']['dest'] = item.querySelector(`#room-${currentRoom}-timer-dest-select`).value;
        });

        data = {
            "title": `${document.querySelector("#story-title").value}`,
            "rooms": rooms
        }

    } catch (e) {
        // TODO: WRITE ALTERNATIVE
        console.error(e);
        errorOccurred("Impossible to retrieve story data from page");
    }
    return data;
};

var deleteCurrentStory = function () {
    if (getStoryNumberFromParameter()) {
        delete adventurerData[`${getStoryNumberFromParameter()}`];
        saveDataToMemory();
    }
    // TODO: THROW SUCCESSFUL ALERT
    window.location.href = "index.html";
};

var loadStoryFromID = function (id) {
    if (id) {
        var story = adventurerData[`${id}`];
        if (story) {
            document.querySelector("#story-title").value = DOMPurify.sanitize(story.title);
            for (var key of Object.keys(story.rooms)) {
                // add room
                addRoomToStory(story.rooms[key], key);
            }
            // updateRooms()
            for (var i of document.querySelectorAll(".room-choice-select")) {
                for (var key of Object.keys(story.rooms)) {
                    i.innerHTML += DOMPurify.sanitize(`<option value="${key}">${key}</option>`);
                }
                //technical: reselect value from 'value' attribute
                i.value = i.getAttribute("value");
                i.removeAttribute("value");
            }
        }
    }
}

var uploadSingleStory = function (file) {
    //TODO: CHECK IF USER WANTS TO OVERWRITE
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (evt) {
            try {
                data = JSON.parse(evt.target.result);
                if (Object.keys(data).length > 1) {
                    //TODO: ask which story to load
                    var preference = 1;
                }
                addStoryToData(data[preference]);
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

var downloadSingleStory = function () {
    //CAREFUL: DOWNLOADS CAN BE DANGEROUS!
    downloadFile(
        'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify({
            "1": getStoryDataFromPage()
        })),
        "story.json"
    );
}