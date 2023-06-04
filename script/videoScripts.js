document.addEventListener ('DOMContentLoaded', initialiseWebPage)

function initialiseWebPage()
{
	//Assigning the variables and appropriate listeners to the html elements
	
	const myVideo = document.querySelector ("video") ;
	const playButton = document.getElementById ("playPause") ;
	playButton.addEventListener("click", playPauseVideo) ; 
	const muteButton = document.getElementById ("mute") ;
	muteButton.addEventListener("click", muteVideo) ; 
	const scrubSlider = document.getElementById ("seekBar") ;
	scrubSlider.addEventListener("input", scrubVideo) ;
	myVideo.addEventListener("timeupdate", movePlaySlider) ;
	const scrubVolume = document.getElementById ("volumeBar") ;
	scrubVolume.addEventListener("input", changeVolume) ;
	const percentageAudio = document.getElementById("percentageAudio");
	let rewindVideo10 = document.getElementById("jumpBack");
	rewindVideo10.addEventListener("click" , rewindVideo);
	let forwardVideo10 = document.getElementById("jumpForward") ;
	forwardVideo10.addEventListener("click" , forwardVideo) ;
	const speedSelect = document.getElementById ("speedSelector") ;
	speedSelector.addEventListener("change",changePlaybackSpeed) ;
	document.addEventListener("keydown", keyPress) ;
	const videoTime = document.getElementById ("videoTime") ;
	myVideo.addEventListener("timeupdate", videoLength) ;
	
/*	Functions listed for the eventListeners.
	When the event is triggered e.g "click" the muteVideo functions will be called.
	This technique applies to all the functions and ergo doesn't need describing every time.
*/

function playPauseVideo()
{
	if (myVideo.paused === true) //When the play button is clicked we want to run the following function...
	{
		myVideo.play() ; //That is, play if paused and pause if playing when clicked.
		playButton.innerHTML = "Pause" ;
	}
	else
	{
		myVideo.pause() ;
		playButton.innerHTML = "Play" ;
	}
}

function muteVideo() //The muteVideo function simply switches the boolean value of muted to true or false
{
	if(myVideo.muted === true)
	{
		myVideo.muted = false ;
		muteButton.innerHTML = "Mute" ;
		volumeBar.value = 5 ;
		changeVolume() ;
	}
	else
	{
		myVideo.muted = true ;
		muteButton.innerHTML = "Unmute" ;
		volumeBar.value = 0 ;
		changeVolume() ;
	}
}

function scrubVideo() //This function allows the video scrub bar to match the video duration by converting it to a percentage
{
	const scrubTime = myVideo.duration * (scrubSlider.value / 100 ) ;
	myVideo.currentTime = scrubTime ;
	scrubSlider.value = (myVideo.currentTime / myVideo.duration) * 100 ;
}

function videoLength() //This function displays the time lapsed in the video time span tag.
{
	let videoMinutes = Math.floor(myVideo.currentTime / 60) ; //Converting the video time into minutes by dividing by 60
	let videoSeconds = Math.floor(myVideo.currentTime % 60) ; //converting the video time into seconds by using modulas which assigns the remaining value to the seconds
		
	if (videoMinutes<10)
	{
		videoMinutes = "0" + videoMinutes ;	
	}
	if(videoSeconds<10)
	{
		videoSeconds = "0" + videoSeconds ; 
	}
	videoTime.innerHTML = videoMinutes + ":" + videoSeconds ;
}

function changeVolume() //This function changes the volume to match the volume bar.
{
    const volume = (scrubVolume.value / 10) ; // divide by ten to convert it into decimal
    myVideo.volume = volume ;
	percentageAudio.innerHTML = volumeBar.value ;
	
	if (volume == 0)
	{
		muteVideo = true;
		muteButton.innerHTML = "Unmute" ;
		percentageAudio.innerHTML = 0 ;
	}
	else
	{
		muteVideo = false ;
		muteButton.innerHTML = "Mute";
	}
}

function movePlaySlider()
{
	scrubSlider.value = (myVideo.currentTime/myVideo.duration) * 100 ; //This function turns the scrubSlider value into a percentage rather than a number. enabling it to match the current time.
}

function changePlaybackSpeed(speed)
{
	myVideo.playbackRate = speed.target.value ; 
}

function rewindVideo()
{
	myVideo.currentTime -= 10 ;
}

function forwardVideo()
{
	myVideo.currentTime += 10 ;
}

function keyPress(event)
	{
		switch(event.key)
		{
		case "ArrowUp":
		case "W":
		case "w":
		scrubVolume.value++ ; //adding 1 to the volume value
		changeVolume()
		break ;

		case "ArrowDown":
		case "S":
		case "s":
        scrubVolume.value-- ; //subtracting 1 off the volume value
		changeVolume()
		break ;

		case "ArrowRight":
		case "D":
		case "d":
		forwardVideo() //utilising the forwardVideo function when the the buttons listed are pressed only
		break ;

		case "ArrowLeft":
		case "A":
		case "a":
		rewindVideo() //utilising the rewindVideo function when the buttons listed are pressed only
		break ;

		case "M":
		case "m":
		muteVideo() ; //utilising the mute video function when "m" or "M" is pressed
		break ;

		case "P":
		case "p":
		playPauseVideo() ; //utilising the playPauseVideo function when "P or p" is pressed
		break ;
		}

	}
}