import CanvasEffect from "./canvas-effect";

export default class Security extends CanvasEffect {
	namingVariablesIsHard = 0;
	Render(deltaTime: number, now: number): void {
		if (!this.Context) return;
		this.ScrollEarlyFactor = 0.4;
		this.Context.clearRect(0, 0, this.Width, this.Height);
		this.Context.shadowColor = "rgba(125, 180, 152, 0.5)";
		this.Context.shadowBlur = 48;
		this.Context.shadowOffsetX = 0;
		this.Context.shadowOffsetY = 0;
		this.Context.strokeStyle = `rgba(125, 180, 152, 1)`;
		this.Context.fillStyle = this.Context.strokeStyle;
		this.Context.lineWidth = 4;

		this.Context.beginPath();
		this.namingVariablesIsHard = this.Damp(this.namingVariablesIsHard,
			((1 - this.formation) / 2 + (now % 15)),
			2, deltaTime);
		for (let i = 1; i >= 0; i -= 0.2) {
			this.Context.setLineDash([
				this.namingVariablesIsHard * ((0.99 - i) * 40) + 20,
				this.namingVariablesIsHard * ((0.99 - i) * 40) + 20]);
			this.Context.beginPath();
			this.Context.arc(
				this.Canvas.width / 2,
				this.Canvas.height / 2,
				(this.Canvas.width / 2 - 60 - (i * 80)) * (0.5 + this.formation / 2),
				Math.PI * 2 * ((1 - this.formation) / 2 + 0.25), Math.PI * 2
			);
			this.Context.closePath();
			this.Context.stroke();
		}
	}
}