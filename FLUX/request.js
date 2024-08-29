var genPrompt, token, url;

var urls = {
	"schnell": "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
	"cinestill": "https://api-inference.huggingface.co/models/adirik/flux-cinestill",
	"dev": "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"
}

var generate = function() {
	genPrompt = document.querySelector("#promptTextarea").value;
	token = document.querySelector("#tokenInput").value;
	model = document.querySelector("#modelSelect").value;
	url = urls[model];
	console.log(`Model selected: ${model}@${url}`);
	document.querySelector("#generateButton").classList.add("btn-warning");
	//todo: add timer
	//todo: add validation(?)
	console.log("Generating image...");
	query({"inputs": genPrompt}).then((response) => {
		console.info(response);
		return response;
	}).then((b) => {
		try {
			document.querySelector("#generatedImage").src = URL.createObjectURL(b);
		} catch (error) {
			console.error(error);
			document.querySelector("#generateButton").classList.remove("btn-warning");
		}
	}).then(() => {
		document.querySelector("#generateButton").classList.remove("btn-warning");
	})
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