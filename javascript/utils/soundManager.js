function Sound($url)
{
	///////////////
	// Attributs //
	///////////////
	
	var url = $url; 
	
	var sound = document.createElement("audio"); 
	var source = document.createElement("source"); 
	
	if (navigator.userAgent.indexOf("Safari") >= 0 && navigator.userAgent.indexOf("Chrome") < 0)
		source.setAttribute("src", url + ".mp3");
	else 
		source.setAttribute("src", url + ".ogg");
	
	var loaded = false; 
		
	var volume = 1.0; 
	
	//////////////
	// Méthodes //
	//////////////
	
	this.onload = function() {}; 
	this.onended = function() {}; 
	
	this.load = function()
	{
		if (loaded === false)
		{
			var body = document.getElementsByTagName("BODY")[0]; 
			
			sound.appendChild(source); 
			body.appendChild(sound); 
			
			sound.volume = 0.0; 
			sound.play(); 
			
			var objectSound = this; 
			
			var timer = setInterval(function() 
			{
				if (sound.networkState !== 2)
				{
					sound.pause(); 
					
					setTimeout(function() 
					{
						sound.currentTime = 0; 
						sound.volume = volume;
						
						if (objectSound.onload)
							objectSound.onload();
						
						clearTimeout(timer); 
					}, 50); 
				}
			}, 100); 
			
			loaded = true; 
		}
	}; 
	
	this.unload = function()
	{
		if (loaded === true)
		{
			var body = document.getElementsByTagName("BODY")[0]; 
			body.removeChild(sound); 
			loaded = false; 
		}
	}; 
	
	this.play = function()
	{
		if (!loaded)
			$this.load();
		
		//this.stop(); 
		sound.volume = volume; 
		sound.play(); 
	}; 
	
	this.pause = function()
	{
		sound.pause(); 
	}; 
	
	this.stop = function() 
	{
		sound.pause(); 
		sound.currentTime = 0; 
	}; 
	
	////////////////
	// Evénements //
	////////////////
	
	sound.onended = function()
	{
		$this.onended(); 
	}; 
	
	////////////////
	// Accesseurs //
	////////////////
	
	// GET 
	this.getVolume = function() { return volume; }; 
	this.getCurrentTime = function() { return sound.currentTime; }; 
	this.isLoop = function() { return sound.loop; }; 
	this.isPaused = function() { return sound.paused; }; 
	
	// SET 
	this.setVolume = function($volume) { volume = $volume; sound.volume = volume; }; 
	this.setCurrentTime = function($currentTime) { sound.currentTime = $currentTime; }; 
	this.setLoop = function($loop) { sound.loop = ($loop === true) ? true : false; }; 
	
	var $this = this; 
}

function SoundManager()
{
	///////////////
	// Attributs //
	///////////////
	
	var soundsFolder = 'assets/sounds/';
	var soundsDict = {};
	
	//////////////
	// Méthodes //
	//////////////
	
	this.load = function ($name, $loop, $onload)
	{
		var sound = new Sound(soundsFolder + $name);
		sound.setLoop($loop);
		sound.onload = $onload;
		sound.load();
		soundsDict[$name] = sound;
	};
	
	this.loadAll = function()
	{
		this.load('door');
		this.load('alien');
		this.load('health');
		this.load('bullets');
		this.load('key');
		this.load('punch');
		this.load('miss');
		this.load('escape');
		this.load('gun');
		this.load('slash');
		this.load('dead-alien');
		this.load('save');
		this.load('load');
		//this.load('ship-mood', true);
		this.load('ship-mood-2', true);
		this.load('red_alert');
		this.load('jet');
		this.load('game-over');
		this.load('key-stroke');
		this.load('open-menu');
		this.load('space-mood', true, function() { this.play('space-mood'); });
	};
	
	this.play = function($name, $loop)
	{
		if (soundsDict[$name])
			soundsDict[$name].play();
	};
	
	this.stop = function($name)
	{
		if (soundsDict[$name])
			soundsDict[$name].stop();
	};
	
	this.stopAll = function()
	{
		for (var key in soundsDict)
		{
			if (soundsDict.hasOwnProperty(key))
				soundsDict[key].stop();
		}
	};
}
	
var sounds = new SoundManager();