/* Media Loader Javascript */
/*var csoundNames = new Array();
csoundNames[0] = "dirsLang.mp3";
csoundNames[1] = "dirsEnglish.mp3";
csoundNames[2] = "dirsSpanish.mp3";
csoundNames[3] = "dirsQLang.mp3";
*/

$(document).ready(function(){

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
	

	
	function createAudioElement(path_and_name){ 
		$("#media_buffer").append('<audio id="au" controls preload="none">'
		+'<source src="'+path_and_name+'.m4a" type="audio/mp4" />'
		+'<source src="'+path_and_name+'.ogg" type="audio/ogg" />'
		+'<source src="'+path_and_name+'.mp3" type="audio/mpeg" />'
		+'<p>Your browser does not support the audio element.</p>'
		+'</audio>');
	}
	
	function createLanguageButtons(){
		
		createAudioElement("_media/_audio/dirsLang-iPad");
		
		var audio = document.getElementById("au");
		
		// If HTML5 <audio> is supported
		if(document.createElement("audio").canPlayType){
			// Play Progress ============================//
			$(audio).bind("timeupdate", function(){
				var timePercent = (this.currentTime / this.duration) * 100;
				//$("#play_progress").css({ width: timePercent + "%" })
				$('#load_progress').html(Math.round(timePercent) +'%');
				
				if(timePercent > 49 && timePercent < 68){ $('#eng_btn').addClass('glow'); } else { $('#eng_btn').removeClass('glow'); }
				if(timePercent > 68 && timePercent < 92){ $('#spn_btn').addClass('glow'); } else { $('#spn_btn').removeClass('glow'); }
				
			});
			
			// Load Progress ============================//
			$(audio).bind({
				progress: function(){
					updateLoadProgress();
				},
				loadeddata: function(){
					updateLoadProgress();
				},
				playing: function(){
					updateLoadProgress();
				},
				canplaythrough: function(){
					updateLoadProgress();
				}
			});
			
			function updateLoadProgress(){
				if(audio.buffered.length > 0){
						var percent = Math.round((audio.buffered.end(0) / audio.duration) * 100);
						
						//$('#load_progress').html(percent +'%');
				}
			}
			 
		} else { /* If HTML 5 <audio> is not support */ }
	}

	// Click handler for web app START button
	$("#start_btn").bind({
		click: function(){

			/* 
			 * Create instructional language selection buttons
			 * add them to the DOM (current page), and add
			 * event listeners.
			 */
			$('#main_content').append('<div class="box"><p>Please select your language:</p></div>'
				+'<div id="lang_wrapper" class="box" disable="disabled">'
				+'<div id="eng_btn" class="lang_button">English</div>'
				+'<div id="spn_btn" class="lang_button">Espa&ntilde;ol</div>'
				+'</div>');
			
			createLanguageButtons();
			
			// Remove me from the DOM (remove start button from screen).
			$(this).remove();
			
			// Add application tools to DOM (in tool_bar container at bottom of UI).
			$('#tool_bar').append('<div id="help_btn" class="btn_S">?</div><div id="close_btn" class="btn_S">X</div>');
			
			/*
			 * Play audio instructions for selecting a language.
			 */
			var audio = document.getElementById("au");
			// If HTML5 <audio> is supported
			if(document.createElement("audio").canPlayType){
				audio.load();
				audio.play();
				
				// Handlers for language selection buttons
				$("#eng_btn").bind({ // English button
					click: function() {
						$(this).addClass("glow");
					}
				});
				
				$("#spn_btn").bind({ // Spanish button
					click: function() {
						$(this).addClass("glow");
					}
				});
				
				$("#help_btn").bind({ // Spanish button
					click: function() {
						audio.play();
					}
				});
			}
			
			$('#lang_wrapper').removeAttr('disabled');
			$('#eng_btn').removeClass("glow");
			$('#spn_btn').removeClass("glow");
		}
	});
	
});