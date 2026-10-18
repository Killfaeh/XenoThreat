const isDev: boolean = import.meta.env.DEV;
const devPath: string = "/src/assets/sounds/";
const distPath: string = "./assets/sounds/";

const soundsFolder = isDev ? devPath : distPath;

class SoundManager
{
	private audioCtx = new AudioContext();
	private buffers  = new Map<string, AudioBuffer>();
	private sources  = new Map<string, AudioBufferSourceNode | null>();
	private playingSources  = new Map<string, AudioBufferSourceNode | null>();
	
	async load(name: string): Promise<void> {
		const response = await fetch(soundsFolder + name + ".wav");
		const arrayBuffer = await response.arrayBuffer();
		this.buffers.set(name, await this.audioCtx.decodeAudioData(arrayBuffer));
	}
	
	async loadAll(): Promise<void> {
		await this.load('door');
		await this.load('alien');
		await this.load('health');
		await this.load('bullets');
		await this.load('key');
		await this.load('punch');
		await this.load('miss');
		await this.load('escape');
		await this.load('gun');
		await this.load('slash');
		await this.load('dead-alien');
		await this.load('save');
		await this.load('load');
		//await this.load('ship-mood');
		await this.load('ship-mood-2');
		await this.load('red_alert');
		await this.load('jet');
		await this.load('game-over');
		await this.load('key-stroke');
		await this.load('open-menu');
		await this.load('space-mood');
		this.play('space-mood', true);
	}
	
	play(name: string, loop = false): AudioBufferSourceNode | null {
	
		let source = this.playingSources.get(name);
	
		if (source) return null;
		
		source = this.sources.get(name);
		
		if (!source) {
			const buffer = this.buffers.get(name);
			if (!buffer) return null;
			
			source = this.audioCtx.createBufferSource();
			source.buffer = buffer;
			source.loop = loop;
			source.connect(this.audioCtx.destination);
			
			source.onended = () => {
				this.playingSources.delete(name);
				this.sources.delete(name);
			}
			
			this.sources.set(name, source);
		}
			
		source.start();
		
		this.playingSources.set(name, source);
		
		return source;
	}
	
	stop(name: string): AudioBufferSourceNode | null {
	
		const source = this.sources.get(name);
	
		if (!source) return null;
		
		source.stop();
		this.playingSources.delete(name);
		this.sources.delete(name);
		
		return source;
	}
	
	stopAll(): void {
		this.sources.forEach((_, key) => {
			this.stop(key);
		});
	}
}

export const sounds = new SoundManager();