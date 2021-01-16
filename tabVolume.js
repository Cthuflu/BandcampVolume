var audioTag = document.getElementsByTagName("audio")[0];
var properties = {type: "range",
					min: 0,
					max: 1, 
					step: 0.01,
					value: 0.7,
					id: "VolumeSlider"};

function makeSlider() {
	console.log("BandcampVolume Loaded: Adding Slider");
	var volumeControl = document.createElement("input");

	for(prop in properties) {
		volumeControl[prop] = properties[prop];
	}

	if (document.getElementById("VolumeSlider")) { // I left this in to not refresh for every change while editing
		document.getElementById("VolumeSlider").parentNode.replaceChild(volumeControl, document.getElementById("VolumeSlider"));
	} else {
		var genRow = document.createElement("tr");
		var volHold = document.createElement("td");
		var label = document.createElement("td");

		label.innerText = "Volume"; // TODO: We'll put something else in this box later
		label.className = "VolumeSliderLabel";

		volHold.appendChild(volumeControl);
		genRow.appendChild(label);
		genRow.appendChild(volHold);
		document.getElementById("trackInfoInner").children[0].children[0].children[0].appendChild(genRow);
	}
	volumeControl.addEventListener("input", function(){setVolume(volumeControl.value)});
	volumeControl.addEventListener("change", function(){setVolume(volumeControl.value)});
}

function setVolume(someValue) {
	audioTag.volume = someValue;
}

makeSlider();