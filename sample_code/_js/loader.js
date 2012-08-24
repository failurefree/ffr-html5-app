/* Media Loader Javascript */
/*var csoundNames = new Array();
csoundNames[0] = "dirsLang.mp3";
csoundNames[1] = "dirsEnglish.mp3";
csoundNames[2] = "dirsSpanish.mp3";
csoundNames[3] = "dirsQLang.mp3";
*/

$(function(){

	/*
	 * Example how to preload HTML5 video on the iPad (iOS 3.2+)
	 * @author Miller Medeiros
	 * Released under WTFPL
	 */
	
	//this function should be called on a click event handler otherwise video won't start loading
	function initVideo(){
		vid.play(); //start loading, didn't used `vid.load()` since it causes problems with the `ended` event
	
		if(vid.readyState !== 4){ //HAVE_ENOUGH_DATA
			vid.addEventListener('canplaythrough', onCanPlay, false);
			vid.addEventListener('load', onCanPlay, false); //add load event as well to avoid errors, sometimes 'canplaythrough' won't dispatch.
			setTimeout(function(){
				vid.pause(); //block play so it buffers before playing
			}, 1); //it needs to be after a delay otherwise it doesn't work properly.
		}else{
			//video is ready
		}
	}
	
	function onCanPlay(){
		vid.removeEventListener('canplaythrough', onCanPlay, false);
		vid.removeEventListener('load', onCanPlay, false);
		//video is ready
		vid.play();
	}
	

	
	function directions(){ 
		$("#media_buffer").append('<audio id="au" controls preload="none">'
		+'<source src="_media/_audio/dirsEnglish.m4a" type="audio/mp4" />'
		+'<source src="_media/_audio/dirsEnglish.ogg" type="audio/ogg" />'
		+'<source src="_media/_audio/dirsEnglish.mp3" type="audio/mpeg" />'
		+'<p>Your browser does not support the audio element.</p>'
		+'</audio>'); 
	
		var audio = document.getElementById("au");
		// If HTML5 <audio> is supported
		if(document.createElement("audio").canPlayType){
			
			$(audio).bind("progress", function(){
				updateLoadProgress();
			});
			
			$(audio).bind("loadeddata", function(){
				updateLoadProgress();
			});
			
			$(audio).bind("playing", function(){
				updateLoadProgress();
			});
			
			$(audio).bind("canplaythrough", function(){
				updateLoadProgress();
			});
			
			function updateLoadProgress(){
				if(audio.buffered.length > 0){
						var percent = Math.round((audio.buffered.end(0) / audio.duration) * 100);
						$('#load_progress').html(percent +'%');
				}
			}
		}
		$("#start_but").click(function(){
				audio.load();
				audio.play();
				$('#lang_wrapper').removeClass('hidden').addClass('box');
				// make audio player visible
				
				$(this).addClass('hidden');
		});
	}
	
	directions();
});