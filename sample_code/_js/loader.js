/* Media Loader Javascript */
var csoundNames = new Array();
csoundNames[0] = "dirsLang.mp3";
csoundNames[1] = "dirsEnglish.mp3";
csoundNames[2] = "dirsSpanish.mp3";
csoundNames[3] = "dirsQLang.mp3";

/*
$(video).bind("progress", function(){
	updateLoadProgress();
});
$(video).bind("loadeddata", function(){
	updateLoadProgress();
});
$(video).bind("canplaythrough", function(){
	updateLoadProgress();
});
$(video).bind("playing", function(){
	updateLoadProgress();
});
*/

function updateLoadProgress() {
	if (audio.buffered.length > 0) {
		var percent = (audio.buffered.end(0) / audio.duration) * 100;
		$("#load_progress").css({ width: percent + "%" })
	}
}

$(document).ready(function(){
	alert( "OKAY" /*"Start: "+$('#a').buffered.start(0)+" End: "+$('#a').buffered.end(0)*/ );
	//$('#load_progress').html($('#a').buffered.length);
});