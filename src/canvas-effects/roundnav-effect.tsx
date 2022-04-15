import CanvasEffect from "./canvas-effect";

// https://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
function checkVisible(elm: HTMLElement, threshold: number) {
	threshold = threshold || 0;

	var rect = elm.getBoundingClientRect();
	var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	var above = rect.bottom - threshold < 0;
	var below = rect.top - viewHeight + threshold >= 0;

	return above || below;
}

export default class RoundNavEffect extends CanvasEffect {
	Render(deltaTime: number, now: number): void {
		const MARGIN = 100;
		const width = this.Canvas.width - MARGIN;
		const height = this.Canvas.height - MARGIN;
		if (this.Context) {
			this.Context.clearRect(0, 0, 1920, 1080);
			this.Context.lineWidth = this.Canvas.width / 48;
			this.Context.strokeStyle = "rgba(125, 180, 152, 1)";
			this.Context.shadowColor = "rgba(125, 180, 152, 0.5)";
			this.Context.shadowBlur = 48;
			this.Context.shadowOffsetX = 0;
			this.Context.shadowOffsetY = 0;
			let [centerX, centerY] = [width / 2 + (MARGIN / 2), height / 2 + (MARGIN / 2)];
			this.Context.beginPath();
			const SPACING = 0.06;
			this.Context.beginPath();
			this.Context.strokeStyle = `rgba(125, 180, 152, 1)`;
			this.Context.arc(
				centerX,
				centerY,
				((width / 2) - 80 + (this.formation * 80)),
				0, (2 * Math.PI) * (Math.pow(this.formation, 1.2))
			);
			this.Context.stroke();
			this.Context.closePath();
			for (let i = 1 - SPACING; i >= 0; i -= SPACING) {
				this.Context.beginPath();
				this.Context.strokeStyle = `rgba(125, 180, 152, ${Math.pow((Math.cos(now * 3 - i * 5) + 1) / 2, 1.5)})`;
				this.Context.arc(
					centerX,
					centerY,
					((width / 2) - 80 + (this.formation * 80)) * i,
					0, (2 * Math.PI) * (Math.pow(this.formation, 1.2))
				);
				this.Context.stroke();
				this.Context.closePath();
			}
			this.Context.beginPath();
			this.Context.lineWidth = 4;
			this.Context.strokeStyle = "rgba(125, 180, 152, 1)";
			this.Context.shadowColor = "rgba(125, 180, 152, 0.5)";
			this.Context.arc(
				centerX,
				centerY,
				2,
				0, (2 * Math.PI) * 1.3 * (Math.pow(this.formation, 1.5))
			);
			this.Context.stroke();
			this.Context.beginPath();
			this.Context.moveTo(centerX, centerY);
			let Radius = ((width / 2) - 80 + (this.formation * 80));
			this.Context.shadowColor = "rgba(85, 120, 102, 0.5)";
			this.Context.lineTo(
				centerX + Math.cos(now + (this.formation * 5)) * Radius * Math.pow(this.formation, 1.5),
				centerY + Math.sin(now + (this.formation * 5)) * Radius * Math.pow(this.formation, 1.5));
			this.Context.stroke();
			this.Context.rect(0, 0, 100, 100);
		} else {
			alert("No context found, but in draw loop");
		}
	}
}

// export default class RoundNavEffect {
// 	Draw() {
// 		const MARGIN = 100;
// 		const width = this.Canvas.width - MARGIN;
// 		const height = this.Canvas.height - MARGIN;
// 		let timestamp = new Date().getTime() / 1000;
// 		let deltaTime = this.lastDraw === 0 ? 0 : (timestamp - this.lastDraw);
// 		this.lastDraw = timestamp;
// 		if (this.Context) {
// 			this.Context.clearRect(0, 0, 1920, 1080);
// 			(() => {
// 				const early_factor = 0.8;
// 				const speed = 5;
// 				let CanvasTop = this.Canvas.getBoundingClientRect().y;
// 				let Scroll = (window.scrollY + window.innerHeight) * early_factor;
// 				if (Scroll > CanvasTop + this.Canvas.height)
// 					Scroll = CanvasTop + this.Canvas.height;
// 				else if (Scroll < CanvasTop)
// 					Scroll = CanvasTop;
// 				// this.formation = ;
// 				this.formation = this.Damp(this.formation, (Scroll - CanvasTop) / (this.Canvas.height), speed, deltaTime);
// 			})();
// 			this.Context.lineWidth = this.Canvas.width / 48;
// 			this.Context.strokeStyle = "rgba(125, 180, 152, 1)";
// 			this.Context.shadowColor = "rgba(125, 180, 152, 0.5)";
// 			this.Context.shadowBlur = 48;
// 			this.Context.shadowOffsetX = 0;
// 			this.Context.shadowOffsetY = 0;
// 			let [centerX, centerY] = [width / 2 + (MARGIN / 2), height / 2 + (MARGIN / 2)];
// 			this.Context.beginPath();
// 			const SPACING = 0.06;
// 			this.Context.beginPath();
// 			this.Context.strokeStyle = `rgba(125, 180, 152, 1)`;
// 			this.Context.arc(
// 				centerX,
// 				centerY,
// 				((width / 2) - 80 + (this.formation * 80)),
// 				0, (2 * Math.PI) * (Math.pow(this.formation, 1.2))
// 			);
// 			this.Context.stroke();
// 			this.Context.closePath();
// 			for (let i = 1 - SPACING; i >= 0; i -= SPACING) {
// 				this.Context.beginPath();
// 				this.Context.strokeStyle = `rgba(125, 180, 152, ${Math.pow((Math.cos(timestamp * 3 - i * 5) + 1) / 2, 1.5)})`;
// 				this.Context.arc(
// 					centerX,
// 					centerY,
// 					((width / 2) - 80 + (this.formation * 80)) * i,
// 					0, (2 * Math.PI) * (Math.pow(this.formation, 1.2))
// 				);
// 				this.Context.stroke();
// 				this.Context.closePath();
// 			}
// 			this.Context.beginPath();
// 			this.Context.lineWidth = 4;
// 			this.Context.strokeStyle = "rgba(125, 180, 152, 1)";
// 			this.Context.shadowColor = "rgba(125, 180, 152, 0.5)";
// 			this.Context.arc(
// 				centerX,
// 				centerY,
// 				2,
// 				0, (2 * Math.PI) * 1.3 * (Math.pow(this.formation, 1.5))
// 			);
// 			this.Context.stroke();
// 			this.Context.beginPath();
// 			this.Context.moveTo(centerX, centerY);
// 			let Radius = ((width / 2) - 80 + (this.formation * 80));
// 			this.Context.shadowColor = "rgba(85, 120, 102, 0.5)";
// 			this.Context.lineTo(
// 				centerX + Math.cos(timestamp + (this.formation * 5)) * Radius * Math.pow(this.formation, 1.5),
// 				centerY + Math.sin(timestamp + (this.formation * 5)) * Radius * Math.pow(this.formation, 1.5));
// 			this.Context.stroke();
// 			this.Context.rect(0, 0, 100, 100);
// 		} else {
// 			alert("No context found, but in draw loop");
// 		}
// 		if (!checkVisible(this.Canvas, 0)) {
// 			this.Canvas.style.opacity = `1`;
// 			requestAnimationFrame(this.Draw.bind(this));
// 		} else {
// 			this.Canvas.style.opacity = `0.5`;
// 			setTimeout(() => {
// 				requestAnimationFrame(this.Draw.bind(this));
// 			}, 100);
// 		}
// 	}
// }
