import CanvasEffect from "./canvas-effect";

const WORD_ANIMATION = 6;
function Lerp(a: number, b: number, t: number) {
	return (1 - t) * a + b * t;
}
function Damp(a: number, b: number, lambda: number, dt: number) {
	return Lerp(a, b, 1 - Math.exp(-lambda * dt))
}
class Word {
	Width: number = 0;
	TargetWidth: number;
	constructor(Width: number) {
		this.TargetWidth = Width;
	}
}
class Line {
	Words = [] as Word[];
	MaxWords = 0;
	constructor(index: number) {
		this.MaxWords = Math.round(Math.cos(index) * 4);
	}
	Update(DeltaTime: number) {
		this.Words.forEach((Word) => {
			Word.Width = Damp(Word.Width, Word.TargetWidth, WORD_ANIMATION, DeltaTime);
		})
	}
}

class HackerEffect extends CanvasEffect {
	private Lines = [new Line(0)];
	private NextSpawn = Math.random() * 4;
	private LastSpawn = 0;
	private LastZoomOut = 0;
	private ShouldGenerate = true;
	Stop: boolean = false;
	Render(deltaTime: number, now: number): void {
		let timestamp = new Date().getTime() / 1000;
		if (this.Context) {
			if (this.ShouldGenerate) {
				this.Context.clearRect(0, 0, this.Width, this.Height);
			}

			let spawnDelta = now - this.LastSpawn;
			if (spawnDelta >= this.NextSpawn) {
				this.Lines[this.Lines.length - 1].Words.push(
					new Word(Math.pow(Math.random() * 48, 1.3) + 5)
				);
				if (this.Lines[this.Lines.length - 1].Words.length > this.Lines[this.Lines.length - 1].MaxWords) {
					this.Lines.push(new Line(this.Lines.length));
				}
				this.NextSpawn = Math.random() * 0.05;
				this.LastSpawn = timestamp;
			}

			const zoomOut = Math.pow(this.formation, 4);
			let zoomDelta = Math.abs(this.LastZoomOut - zoomOut);
			if (!this.ShouldGenerate) {
				if (zoomDelta < 0.00005) {
					return;
				} else {
					this.Context.clearRect(0, 0, 1920, 1080);
				}
			}
			this.LastZoomOut = zoomOut;
			this.Canvas.style.filter = `blur(${zoomOut * 15}px)`
			this.Context.fillStyle = `rgba(125, 180, 152, ${1 - zoomOut})`;
			this.Context.shadowColor = `rgba(125, 180, 152, 0.5)`;
			this.Context.shadowBlur = 48;
			this.Context.shadowOffsetX = 0;
			this.Context.shadowOffsetY = 0;
			let wordHeight = 24;
			let lastY = 12;
			this.ScrollEarlyFactor = 0.05;
			this.Lines.forEach((Line, _) => {
				Line.Update(deltaTime);
				let lastX = 18;
				Line.Words.forEach((Word, _) => {
					this.Context?.fillRect(
						lastX * (zoomOut + 1),
						(lastY + this.formation * 200) * (zoomOut + 1),
						Word.Width * (zoomOut + 1),
						wordHeight * (zoomOut + 1));
					lastX += Word.Width + 4;
				});
				lastY += wordHeight + 4;
				if (lastY * 0.8 > this.Height) {
					this.ShouldGenerate = false;
				}
			});
		} else {
			throw new Error("Context is null");
		}
	}
}

export default HackerEffect;