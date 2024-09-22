var genPrompt, token, url, lastBlob;

//init
fetch("/FLUX/beach.jpg").then((response) => {
	return response.blob();
}).then((b) => {
	lastBlob = b;
})

// Set theme to the user's preferred color scheme
var updateTheme = function () {
	const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches ?
	  "dark" :
	  "light";
	document.querySelector("html").setAttribute("data-bs-theme", colorMode);
}

//run at startup
updateTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);


var urls = {
	"schnell": "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
	"cinestill": "https://api-inference.huggingface.co/models/adirik/flux-cinestill",
	"dev": "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"
}

var checkForm = function() {
	document.querySelector("#form-div").classList.add("was-validated");
	var whatToReturn = true;
	Array.from(document.querySelectorAll(".to-check")).forEach(e => {
		if (!e.checkValidity()) {
			//failed check
			whatToReturn = false;
		}
	});
	if (whatToReturn) {
		genPrompt = document.querySelector("#promptTextarea").value;
		token = document.querySelector("#tokenInput").value;
		model = document.querySelector("#modelSelect").value;
		url = urls[model];
		console.log(`Model selected: ${model}@${url}`);
	}
	return whatToReturn;
};

var generate = function() {
	if (!checkForm()) {
		return;
	}
	disableButton(document.querySelector("#generateButton"));
	console.info("Generating image...");
	query({"inputs": genPrompt}).then((response) => {
		console.info(response);
		return response;
	}).then((b) => {
		lastBlob = b;
		if(checkBlob(b)) {
			try {
				// append blob to image source
				document.querySelector("#generatedImage").src = URL.createObjectURL(b);
			} catch (error) {
				console.error(error);
			}
		}
	}).then(() => {
		// reset #generateButton
		enableButton(document.querySelector("#generateButton"));
	})
};

// buttons
var disableButton = function (b) {
	b.classList.add("btn-warning");
	b.disabled = true;
};
var enableButton = function (b) {
	b.classList.remove("btn-warning");
	b.disabled = false;
};

//save, check
var saveBlob = function () {
	if (checkBlob(lastBlob)) {
		downloadBlob(lastBlob, "generated.jfif");
	}
};
var downloadBlob = function (blob, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
	document.body.removeChild(a);
};
var checkBlob = function (k) {
	if (k && k.type === 'image/jpeg') {
		document.querySelector("#generatedImage").classList.remove("d-none");
		document.querySelector("#generationFailAlert").classList.add("d-none");
		Array.from(document.querySelectorAll(".image-button")).forEach(b => {
			enableButton(b);
		});
		return true;
	} else {
		document.querySelector("#generationFailAlert").classList.remove("d-none");
		document.querySelector("#generatedImage").classList.add("d-none");
		Array.from(document.querySelectorAll(".image-button")).forEach(b => {
			disableButton(b);
		});
		return false;
	}
}

async function query(data) {
	const response = await fetch(
		`${url}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
