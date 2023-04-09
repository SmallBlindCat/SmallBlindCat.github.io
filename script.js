const app = () => {
	const song = document.querySelector(".song");
	const play = document.querySelector(".play");
	// Переменная получает контур
	const outline = document.querySelector(".moving-outline circle");
	// Переменная получает видео для бэкграунда
	const video = document.querySelector(".video-container video");
	// Переменная получает звуки для кнопокдождя и солнца
	const sounds = document.querySelectorAll(".sound-picker button");
	//Time display
	const timeDisplay = document.querySelector(".time-display");
	const TimeSelect = document.querySelectorAll(".time-select button");
	//Get the Length of the outline
	const outlineLength = outline.getTotalLength();
	//Duration мы установили длительность по умолчанию, неважно что стоит
	let fakeDuration = 600;
	
// Управляет видом пунктирной обводки
	outline.style.strokeDasharray = outlineLength;
// Позволяет создать смещение пунктирной обводки относительно первоначального его положения,
    // полностью покрывает синий контур белым
	outline.style.strokeDashoffset = outlineLength;

	// Pick different sounds
	sounds.forEach(sound =>{
		// обработчик события для объекта
		sound.addEventListener('click', function(){
				// получает значение атрибута
			song.src=this.getAttribute('data-sound');
			video.src=this.getAttribute('data-video');
			checkPlaying(song);
		});
	});

	//play sound, при нажатиии на иконку "play" происходит событие
	play.addEventListener("click", () => {
		checkPlaying(song); // При нажатии идет звук
	})
	// Выбор длительности  проигрывания и таймера обратного отсчета
	TimeSelect.forEach(option => {
		option.addEventListener("click", function () {
			fakeDuration = this.getAttribute('data-time');
			timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
		});
	});

	// Create a function specific to stop and play the sound
	const checkPlaying = song => {
		// Если иконка стоит на паузе, то играет музыка-song.play(); и воспроизводит видео-video.play();
		if (song.paused) {
			song.play();
			video.play();
			play.src = '/svg/pause.svg';// полдучает иконку "Пауза"
		}
		else {
			song.pause();
			video.pause();
			play.src = '/svg/play.svg';// полдучает иконку "Play"
		}
	};
	// We can animate circle
	song.ontimeupdate = () => {
		let currentTime = song.currentTime;// получает время, которое проиграл трек(с 0 и до...)
		//console.log(currentTime);
		
		let elapsed = fakeDuration - currentTime; // сколько времени осталось проиграть треку
		// console.log(elapsed);
		
		let seconds = Math.floor(elapsed % 60);
		let minuts = Math.floor(elapsed / 60);

		// Animate the circle
		let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;// состояние движения 
		// прогресса(проигранного времени), выраженного в движении синей линии
		outline.style.strokeDashoffset = progress;

		// Animate the Time
		timeDisplay.textContent = `${minuts}:${seconds}`;
		if(currentTime>=fakeDuration){
			song.pause();
			song.currentTime=0;
			play.src='/svg/play.svg';
			video.pause();
		}
	};
};

app();
