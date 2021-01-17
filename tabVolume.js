/*
 * tabVolume
 *
 * Creates and manages the volume slider
 */

const VOLUMESTORE = 'bandcampVolume-volume';
var volume = localStorage.getItem(VOLUMESTORE);
volume = volume ? volume : 0.7;

var audioTag = document.getElementsByTagName("audio")[0];
var VolumeSliderPercent, volumeControl; // To store references to our control objects

var extensionRow = makeElement("tr", {id: "BandcampVolumeSlider"});
var rowTemplate = `
	<td class="VolumeSliderCell" rowspan="2">
		<label for="VolumeSliderPercent">Volume</label>
		<span>
			<input id="VolumeSliderPercent" type="number" min="0" max="100" step="1"/>
			%
		</span>
	</td>
	<td colspan="3">
		<input id="VolumeSlider" type="range" min="0" max="1" step="0.01"/>
	</td>
`;

function makeSlider() {
	console.log("BandcampVolume: Adding Slider...");

	// Add template to created element
	extensionRow.innerHTML = rowTemplate;	

	if (document.getElementById("BandcampVolumeSlider")) { 
		// Replaces existing item rather than endlessly appending rows on extension reload
		// Debug only
		document.getElementById("BandcampVolumeSlider").parentNode.replaceChild(extensionRow, document.getElementById("BandcampVolumeSlider"));
	} else {
		// Add element to page
		document.getElementById("trackInfoInner").children[0].children[0].children[0].appendChild(extensionRow);
	}

	VolumeSliderPercent = document.getElementById("VolumeSliderPercent");
	volumeControl = document.getElementById("VolumeSlider");
	setVolume(volume); // Set volume on load, also save the set volume

	VolumeSliderPercent.addEventListener("change", function(){setVolume(VolumeSliderPercent.value/100)});
	volumeControl.addEventListener("input", function(){setVolume(volumeControl.value)});
	volumeControl.addEventListener("change", function(){setVolume(volumeControl.value)});
}

function makeElement(tag, options) {
	return Object.assign(document.createElement(tag), options);
}

function setVolume(num) {
	if (typeof num === 'undefined') return;
	audioTag.volume = num;
	saveVolume(num);

	VolumeSliderPercent.value = percent_string(volume);
	volumeControl.value = volume;
}

function percent_string(num) {
	return `${(num * 100).toFixed(0)}`;
}

function saveVolume(num) {
	if(num === null) return;
	volume = num;
	localStorage.setItem(VOLUMESTORE, num);
}

makeSlider();