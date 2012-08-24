/* Media Loader Javascript */
/*var csoundNames = new Array();
csoundNames[0] = "dirsLang.mp3";
csoundNames[1] = "dirsEnglish.mp3";
csoundNames[2] = "dirsSpanish.mp3";
csoundNames[3] = "dirsQLang.mp3";
*/

$(function(){
					 
	var aud = document.getElementById("au");
	
	//aud.play();
	
	$(aud).bind("durationchange",function(){
			//alert( "audio length = "+ this.duration );
	});
	
	var vid = document.getElementById("vi");
	// If HTML5 Video is not supported
	if(document.createElement("video").canPlayType){
		
		//vid.play();
		
		$(vid).bind("durationchange",function(){
			//alert( "video length = "+ this.duration );
		});
		
		$(vid).bind("progress", function(){
			updateLoadProgress();
		});
		
		$(vid).bind("loadeddata", function(){
			updateLoadProgress();
		});
		
		$(vid).bind("playing", function(){
			updateLoadProgress();
		});
		
		$(vid).bind("canplaythrough", function(){
			updateLoadProgress();
		});
		
		function updateLoadProgress(){
			if(vid.buffered.length > 0){
					var percent = Math.round((vid.buffered.end(0) / vid.duration) * 100);
					$('#load_progress').html(percent +'%');
			}
		}
	}
	

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
	
	$("#click_me").click(function(){
			//aud.load();
			aud.play();
	});
	
	$("#click_me").bind("mouseover",function(){
			//aud.play();
			$(this).trigger("click");
	});
	$("#click_me").bind("mouseout",function(){
			aud.pause();
			
	});
	
	function aaa(){ $("#click_me").trigger("click"); }
	
});