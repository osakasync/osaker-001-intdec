import { VOLUME } from '../settings.js';

const SoundManager = {
	keySounds: [],
	mouseSounds: [],
	bootSounds: {},
	errorSounds: {},
	volume: VOLUME,
	_lastVolume: VOLUME,

	audioContext: null,
	humBuffer: null,
	humSource: null,

	init() {
		this.keySounds = [
			this._createAudio('assets/sounds/keyboard/key1.wav'),
			this._createAudio('assets/sounds/keyboard/key2.wav'),
			this._createAudio('assets/sounds/keyboard/key3.wav'),
			this._createAudio('assets/sounds/keyboard/key4.wav'),
		];

		this.mouseSounds = [
			this._createAudio('assets/sounds/mouse/click1.wav'),
			this._createAudio('assets/sounds/mouse/click2.wav'),
		];

		this.bootSounds = {
			boot_press: this._createAudio('assets/sounds/boot/boot_press.wav'),
			boot_release: this._createAudio('assets/sounds/boot/boot_release.wav'),
			boot_end: this._createAudio('assets/sounds/boot/boot_end.wav'),
		};

		this.errorSounds = {
			error: this._createAudio('assets/sounds/error/error1.wav'),
			warning: this._createAudio('assets/sounds/error/error2.wav'),
			ok: this._createAudio('assets/sounds/error/ok.wav'),
		};

		// I'm using Web Audio API for ambient humming, because regular audio element caused stuttering between loops :P
		this.audioContext = new AudioContext();
		this.loadAmbientHum('assets/sounds/ambience/humming.wav');
		this.humVolumeFactor = 0.75;
	},

	_createAudio(path) {
		const audio = new Audio(path);
		audio.volume = this.volume;
		return audio;
	},

	async loadAmbientHum(path) {
		const response = await fetch(path);
		const buffer = await response.arrayBuffer();
		this.humBuffer = await this.audioContext.decodeAudioData(buffer);
	},

	setVolume(newVolume) {
		this.volume = newVolume;
		this._lastVolume = newVolume;

		this.keySounds.forEach((audio) => (audio.volume = newVolume));
		this.mouseSounds.forEach((audio) => (audio.volume = newVolume));
		Object.values(this.bootSounds).forEach(
			(audio) => (audio.volume = newVolume)
		);
		Object.values(this.errorSounds).forEach(
			(audio) => (audio.volume = newVolume)
		);

		if (this.humGain) {
			this.humGain.gain.value = newVolume * this.humVolumeFactor;
		}
	},

	toggleMute() {
		if (this.volume > 0) {
			this.setVolume(0);
			return true; // muted
		} else {
			this.setVolume(this._lastVolume || 0.3);
			if (this.audioContext.state === 'suspended') {
				this.audioContext.resume();
			}
			return false; // unmuted
		}
	},

	fadeOutAudio(audio, duration = 500) {
		if (!audio) return;

		const initialVolume = audio.volume;
		const steps = 30;
		const stepTime = duration / steps;
		let currentStep = 0;

		const fade = setInterval(() => {
			currentStep++;
			audio.volume = Math.max(0, initialVolume * (1 - currentStep / steps));

			if (currentStep >= steps) {
				clearInterval(fade);
				audio.pause();
				audio.currentTime = 0;
				audio.volume = initialVolume;
			}
		}, stepTime);
	},

	playRandomKeySound() {
		const random = Math.floor(Math.random() * this.keySounds.length);
		const original = this.keySounds[random];
		const clone = original.cloneNode(true);
		clone.volume = this.volume;
		clone.play();
	},

	playRandomMouseClick() {
		const random = Math.floor(Math.random() * this.mouseSounds.length);
		const original = this.mouseSounds[random];
		const clone = original.cloneNode(true);
		clone.volume = this.volume;
		clone.play();
	},

	// boot
	playBootPress() {
		const audio = this.bootSounds.boot_press;
		audio.pause();
		audio.currentTime = 0;
		audio.play();
	},

	playBootRelease() {
		const audio = this.bootSounds.boot_release;
		audio.pause();
		audio.currentTime = 0;
		audio.play();
	},

	playBootEnd() {
		const release = this.bootSounds.boot_release;
		const end = this.bootSounds.boot_end;

		this.fadeOutAudio(release, 500);

		end.pause();
		end.currentTime = 0;
		end.play();
	},

	// error/feedback
	_lastErrorPlay: 0,
	_lastWarningPlay: 0,

	playError() {
		const now = Date.now();
		if (now - this._lastErrorPlay < 150) return;
		this._lastErrorPlay = now;

		const original = this.errorSounds.error;
		const clone = original.cloneNode(true);
		clone.volume = this.volume;
		clone.play();
	},

	playWarning() {
		const now = Date.now();
		if (now - this._lastWarningPlay < 150) return;
		this._lastWarningPlay = now;

		const original = this.errorSounds.warning;
		const clone = original.cloneNode(true);
		clone.volume = this.volume;
		clone.play();
	},

	playOk() {
		const audio = this.errorSounds.ok;
		audio.pause();
		audio.currentTime = 0;
		audio.play();
	},

	// ambient sounds
	playAmbientHum() {
		if (!this.humBuffer) return;

		const source = this.audioContext.createBufferSource();
		const gain = this.audioContext.createGain();

		source.buffer = this.humBuffer;
		source.loop = true;
		gain.gain.value = this.volume * this.humVolumeFactor;

		source.connect(gain);
		gain.connect(this.audioContext.destination);

		source.start(0);

		this.humSource = source;
		this.humGain = gain;
	},

	stopAmbientHum() {
		this.humSource?.stop();
		this.humSource = null;
	},
};

export default SoundManager;
