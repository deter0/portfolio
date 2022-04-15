// https://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
function checkVisible(elm: HTMLElement) {
	var rect = elm.getBoundingClientRect();
	var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	var above = rect.bottom < 0;
	var below = rect.top - viewHeight >= 0;

	return above || below;
}

export default class CanvasEffect {
	Width: number;
	Height: number;
	Canvas: HTMLCanvasElement;
	Context: CanvasRenderingContext2D | null;
	ScrollEarlyFactor: number = 0.8;
	ScrollFormationLerpSpeed: number = 5;
	StopRendering: boolean = false;
	constructor(Canvas: HTMLCanvasElement) {
		this.Canvas = Canvas;

		this.Canvas.width = window.innerWidth;
		this.Canvas.height = window.innerHeight;
		this.Width = this.Canvas.width;
		this.Height = this.Canvas.height;

		this.Context = this.Canvas.getContext("2d");
		if (!this.Context) {
			alert("Unable to get canvas context");
			return;
		}
		var lastRender = new Date().getTime() / 1000;
		const callback = (() => {
			let currentTime = new Date().getTime() / 1000;
			let deltaTime = currentTime - lastRender;
			let CanvasTop = this.Canvas.getBoundingClientRect().y;
			let Scroll = (window.scrollY + window.innerHeight) * this.ScrollEarlyFactor;
			if (Scroll > CanvasTop + this.Canvas.height)
				Scroll = CanvasTop + this.Canvas.height;
			else if (Scroll < CanvasTop)
				Scroll = CanvasTop;
			this.formation = this.Damp(this.formation, (Scroll - CanvasTop) / (this.Canvas.height), this.ScrollFormationLerpSpeed, deltaTime);

			if (!this.StopRendering) {
				if (!checkVisible(this.Canvas)) {
					this.Render(deltaTime, currentTime);
					lastRender = currentTime;
					this.Canvas.style.opacity = `1`;
				} else {
					this.Canvas.style.opacity = `0.5`;
				}
				requestAnimationFrame(callback);
			}
		})
		requestAnimationFrame(callback);
	}
	formation = 0;
	Lerp(a: number, b: number, t: number) {
		return (1 - t) * a + b * t;
	}
	Damp(a: number, b: number, lambda: number, dt: number) {
		return this.Lerp(a, b, 1 - Math.exp(-lambda * dt));
	}
	Render(deltaTime: number, now: number): void {

	}
}