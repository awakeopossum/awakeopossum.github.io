var story;
var timer, typewriterInterval, timeout;

var onDataReady = function (data) {
    // retrieve get parameter "story"
    // TODO: WRITE AN 'ELSE'
    if (getStoryNumberFromParameter()) {
        story = getStoryNumberFromParameter();
    } else {
        // TODO: ADVISE THERE IS NO STORY WITH SUCH ID
        // AND REDIRECT TO HOME
        return;
    }
    compileRoom(1, data);
};

var compileRoom = function (n, data = adventurerData) {
    // document.activeElement = null; doesn't work: read-only
    try {

        // 0. typewriter effect on textarea
        // TODO: CHARACTER SPEED DEPENDS ON TEXT LENGTH
        // or LEFT-SECONDS DEPEND ON TEXT LENGTH
        var roomText = document.querySelector("#room-text");
        roomText.innerHTML = "";
        var fullText = DOMPurify.sanitize(data[story]['rooms'][n]['text']);
        var char = 0, l = fullText.length;
        var tipeWriterDeltaTime = 25;
        typewriterInterval = setInterval(() => {
            roomText.innerHTML += fullText[char];
            char++;
            if (char >= l) {
                clearInterval(typewriterInterval);
            }
        }, tipeWriterDeltaTime);

        // 1. show story title
        document.querySelector("#story-name").innerHTML = DOMPurify.sanitize(`  •  ${data[story]['title']}  •  `);

        // 2. set timer
        var seconds = parseInt(data[story]['rooms'][n]['timer']['duration']);
        // ripete con un intervallo di 1 secondo
        var leftSeconds = seconds;
        timer = setInterval(() => {
            leftSeconds--;
            document.querySelector("#left-seconds").innerHTML = DOMPurify.sanitize(leftSeconds);
        }, 1000);
        timeout = setTimeout(() => {
            removeTimingFunctions();
            compileRoom(data[story]['rooms'][n]['timer']['dest'], data);
        }, seconds * 1000);

        // 3. set room text
        // NOT ANYMORE!

        // 4. set choice 1
        document.querySelector("#choice1-button").innerHTML = DOMPurify.sanitize(`[${data[story]['rooms'][n]['choice1']['text']}]`);
        document.querySelector("#choice1-button").onclick = () => {
            removeTimingFunctions();
            compileRoom(data[story]['rooms'][n]['choice1']['dest'], data);
        };

        // 5. set choice 2
        document.querySelector("#choice2-button").innerHTML = DOMPurify.sanitize(`[${data[story]['rooms'][n]['choice2']['text']}]`);
        document.querySelector("#choice2-button").onclick = () => {
            removeTimingFunctions();
            compileRoom(data[story]['rooms'][n]['choice2']['dest'], data);
        };

    } catch (e) {
        console.log(e);
        errorOccurred("Impossible to compile room data");
        window.location.href = "index.html";
    }
};

var restartCurrentStory = function () {
    removeTimingFunctions();
    compileRoom(1);
}

var modifyCurrentStory = function () {
    removeTimingFunctions();
    window.location.href = `create.html?story=${DOMPurify.sanitize((getStoryNumberFromParameter() ? getStoryNumberFromParameter() : '1'))}`;
}

var removeTimingFunctions = function () {
    try {
        clearInterval(typewriterInterval);
    } catch (e) {}
    try {
        clearTimeout(timeout);
    } catch (e) {}
    try {
        clearInterval(timer);
    } catch (e) {}
}