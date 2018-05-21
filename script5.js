// ANIMATIONS

function fourmousedown() {
  document.getElementById("firstfour");
  firstfour.setAttribute("transform", "translate(0,5)");
  document.getElementById("fourshadow");
  fourshadow.setAttribute("fill", "#efefef" );
}

function fourmouseup() {
  document.getElementById("firstfour");
  firstfour.setAttribute("transform", "translate(0,0)");
  document.getElementById("fourshadow");
  fourshadow.setAttribute("fill", "#c6c7c7" );
}

function zeromousedown() {
  document.getElementById("firstzero");
  firstzero.setAttribute("transform", "translate(0,5)");
  document.getElementById("zeroshadow");
  zeroshadow.setAttribute("fill", "#efefef" );
}

function zeromouseup() {
  document.getElementById("firstzero");
  firstzero.setAttribute("transform", "translate(0,0)");
  document.getElementById("zeroshadow");
  zeroshadow.setAttribute("fill", "#c6c7c7");
  
}function fourtwomousedown() {
  document.getElementById("second");
  second.setAttribute("transform", "translate(0,5)");
  document.getElementById("fourtwoshadow");
  fourtwoshadow.setAttribute("fill", "#efefef" );
}

function fourtwomouseup() {
  document.getElementById("second");
  second.setAttribute("transform", "translate(0,0)");
  document.getElementById("fourtwoshadow");
  fourtwoshadow.setAttribute("fill", "#c6c7c7" );
}

document.ondblclick = function() { return false; }

// ANIMATIONS END

//alert("SCRIPT 4 LOADED!");

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};


// audiocontext reference
// source
// buffer
// gainnode
// filter
// context.destintation

	var context = new AudioContext(); // Create and Initialize the Audio Context
	var four; // Create the Sound 
	var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSound.open("GET", "http://cookywook.co.uk/404/FOUR.mp3", true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function() {
		context.decodeAudioData(getSound.response, function(buffer){
			four = buffer; // Decode the Audio Data and Store it in a Variable
		});
	}
	getSound.send(); // Send the Request and Load the File
	
	window.addEventListener("keydown",onKeyDown); // Create Event Listener for KeyDown
	window.addEventListener("keyup",onKeyUp); // Create Event Listener for KeyUp
	window.addEventListener("onclick",whenClicked);
	
	function onKeyDown(e){
		switch (e.keyCode) {
			// 4
			case 52:
			case 100:

				fourmousedown();
				fourtwomousedown();

				var playSound = context.createBufferSource(); // Declare a New Sound
				playSound.buffer = four; // Attatch our Audio Data as it's Buffer

				// GAIN NODE
				gainNode = context.createGain(); // Create gain node
				var gainval = document.getElementById('range1').value;   //define the gainNode value (from the input slider)
				gainNode.gain.value = gainval; // Set gain node value
				
					
				// FILTER NODE
				filter = context.createBiquadFilter();
				var filterval = document.getElementById('range2').value;
				// Create and specify parameters for the low-pass filter.
				filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
				filter.frequency.value = filterval; // Set cutoff to 440 HZ
				//filter.gain.value = 100;
				
				// DISTORTION NODE
				distortion = context.createWaveShaper();
				//check to see if button is checked
				function distortionamount()	{
					if (document.getElementById('distortvalue').checked) {
						distortion.curve = makeDistortionCurve(1000);
						// alert("DISTORTION ACTIVATED");
					}
					else {
						distortion.curve = makeDistortionCurve(0);
						// alert("DISTORTION NOT ACTIVATED");
					}
				}
				
				distortionamount();
				
				//connect it up
				playSound.connect(gainNode);  
				gainNode.connect(filter);
				filter.connect(distortion);
				distortion.connect(context.destination); //link to output

				// Playback the sound.
				var playbackRateVal = document.getElementById('range3').value; // definte the playback rate from input 3
				playSound.playbackRate.value = playbackRateVal;
				
				playSound.start(0); // Play the Sound Immediately

				break;
			// 0
			case 48:
			case 96:

				zeromousedown();

				var playSound = context.createBufferSource(); // Declare a New Sound
				playSound.buffer = zero; // Attatch our Audio Data as it's Buffer

				// GAIN NODE
				gainNode = context.createGain(); // Create gain node
				var gainval = document.getElementById('range1').value;   //define the gainNode value (from the input slider)
				gainNode.gain.value = gainval; // Set gain node value
				
					
				// FILTER NODE
				filter = context.createBiquadFilter();
				var filterval = document.getElementById('range2').value;
				// Create and specify parameters for the low-pass filter.
				filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
				filter.frequency.value = filterval; // Set cutoff to 440 HZ
				//filter.gain.value = 100;
				
				// DISTORTION NODE
				distortion = context.createWaveShaper();
				//check to see if button is checked
				function distortionamount()	{
					if (document.getElementById('distortvalue').checked) {
						distortion.curve = makeDistortionCurve(300);
						// alert("DISTORTION ACTIVATED");
					}
					else {
						distortion.curve = makeDistortionCurve(0);
						// alert("DISTORTION NOT ACTIVATED");
					}
				}
				distortionamount();
				
				//connect it up
				playSound.connect(gainNode);  
				gainNode.connect(filter);
				filter.connect(distortion);
				distortion.connect(context.destination); //link to output

				// Playback the sound.
				var playbackRateVal = document.getElementById('range3').value; // definte the playback rate from input 3
				playSound.playbackRate.value = playbackRateVal;
				playSound.start(0); // Play the Sound Immediately
			break;			
		}
 	}

 	function onKeyUp(f){
		switch (f.keyCode) {
			// 4
			case 52:
			case 100:
			fourmouseup();
			fourtwomouseup();
			break;
		// 0
			case 48:
			case 96:
			zeromouseup();
			break;
	}
	}	

 	function whenClicked(){
 		var playSound = context.createBufferSource(); // Declare a New Sound
				playSound.buffer = four; // Attatch our Audio Data as it's Buffer
				
				// GAIN NODE
				gainNode = context.createGain(); // Create gain node
				var gainval = document.getElementById('range1').value;   //define the gainNode value (from the input slider)
				gainNode.gain.value = gainval; // Set gain node value
				
					
				// FILTER NODE
				filter = context.createBiquadFilter();
				var filterval = document.getElementById('range2').value;
				// Create and specify parameters for the low-pass filter.
				filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
				filter.frequency.value = filterval; // Set cutoff to 440 HZ
				//filter.gain.value = 100;
				
				// DISTORTION NODE
				distortion = context.createWaveShaper();
				//check to see if button is checked
				function distortionamount()	{
					if (document.getElementById('distortvalue').checked) {
						distortion.curve = makeDistortionCurve(10000);
						// alert("DISTORTION ACTIVATED");
					}
					else {
						distortion.curve = makeDistortionCurve(0);
						// alert("DISTORTION NOT ACTIVATED");
					}
				}
				distortionamount();
				
				//connect it up
				playSound.connect(gainNode);  
				gainNode.connect(filter);
				filter.connect(distortion);
				distortion.connect(context.destination); //link to output

				// Playback the sound.
				var playbackRateVal = document.getElementById('range3').value; // definte the playback rate from input 3
				playSound.playbackRate.value = playbackRateVal;
				playSound.start(0); // Play the Sound Immediately
 	}
	

	//
	//
	// OK LETS DO IT ALLLL AGAIN FOR ZERO!
	//
	//

	var context = new AudioContext(); // Create and Initialize the Audio Context
	var zero; // Create the Sound 
	var getSoundZero = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSoundZero.open("GET", "http://cookywook.co.uk/404/OH.mp3", true); // Path to Audio File
	getSoundZero.responseType = "arraybuffer"; // Read as Binary Data
	getSoundZero.onload = function() {
		context.decodeAudioData(getSoundZero.response, function(buffer){
			zero = buffer; // Decode the Audio Data and Store it in a Variable
		});
	}
	getSoundZero.send(); // Send the Request and Load the File
	

 	function whenClicked2(){
 		var playSound = context.createBufferSource(); // Declare a New Sound
				playSound.buffer = zero; // Attatch our Audio Data as it's Buffer

				// GAIN NODE
				gainNode = context.createGain(); // Create gain node
				var gainval = document.getElementById('range1').value;   //define the gainNode value (from the input slider)
				gainNode.gain.value = gainval; // Set gain node value
				
					
				// FILTER NODE
				filter = context.createBiquadFilter();
				var filterval = document.getElementById('range2').value;
				// Create and specify parameters for the low-pass filter.
				filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
				filter.frequency.value = filterval; // Set cutoff to 440 HZ
				//filter.gain.value = 100;
				
				// DISTORTION NODE
				distortion = context.createWaveShaper();
				//check to see if button is checked
				function distortionamount()	{
					if (document.getElementById('distortvalue').checked) {
						distortion.curve = makeDistortionCurve(10000);
						// alert("DISTORTION ACTIVATED");
					}
					else {
						distortion.curve = makeDistortionCurve(0);
						// alert("DISTORTION NOT ACTIVATED");
					}
				}
				distortionamount();
				
				//connect it up
				playSound.connect(gainNode);  
				gainNode.connect(filter);
				filter.connect(distortion);
				distortion.connect(context.destination); //link to output

				// Playback the sound.
				var playbackRateVal = document.getElementById('range3').value; // definte the playback rate from input 3
				playSound.playbackRate.value = playbackRateVal;
				playSound.start(0); // Play the Sound Immediately
 	}

////
 /// DRUM SAMPLE INCOMING!!!
////

var context = new AudioContext(); // Create and Initialize the Audio Context
	var drums; // Create the Sound 
	var getSoundDrums = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSoundDrums.open("GET", "http://cookywook.co.uk/404/drums.mp3", true); // Path to Audio File
	getSoundDrums.responseType = "arraybuffer"; // Read as Binary Data
	getSoundDrums.onload = function() {
		context.decodeAudioData(getSoundDrums.response, function(buffer){
			drums = buffer; // Decode the Audio Data and Store it in a Variable
		});
	}
	getSoundDrums.send(); // Send the Request and Load the File

var playSound = context.createBufferSource(); // Declare a New Sound	


function drumsgo()	{
					if (document.getElementById('drumvalue').checked) {
						playSound = context.createBufferSource();
						playSound.buffer = drums; // Attatch our Audio Data as it's Buffer
						playSound.connect(context.destination); 
						playSound.start(0); // Play the Sound Immediately
						playSound.loop = true;
						//alert("drums go!");
					}
					else {				
						//alert("trying to stop");
						//playSound.buffer = drums; // Attatch our Audio Data as it's Buffer
						//playSound.connect(context.destination); 
						playSound.stop();
					}
				}