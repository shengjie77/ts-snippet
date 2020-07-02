import { StatsResult, FPSResult, MSResult } from './StatsResult';

export function createStats(): Stats {
	return new StatsImpl();
}

export interface Stats {

	start(): void;

	finish(): StatsResult;

}

class StatsImpl implements Stats {

	public start() {
		this.reset();
		this.isStart = true;

		const next = (now: number) => {
			this.frame++;

			const delta = now - this.prevTime;
			if (this.lastFrameTime) {
				this.msList.push(now - this.lastFrameTime);
			}
			this.lastFrameTime = now;

			if (delta >= 1000) {
				this.fpsList.push(this.frame);
				this.prevTime = now;
				this.frame = 0;
			}

			if (this.isStart) {
				requestAnimationFrame(next);
			}
		};

		requestAnimationFrame(next);
	}

	public finish(): StatsResult {
		this.isStart = false;
		return {
			fps: this.getFPSResult(),
			ms: this.getMSResult(),
		}
	}

	// ---------------- Private Methods ---------------- //

	private getFPSResult(): FPSResult | undefined {
		if (this.fpsList.length > 0) {
			return {
				average: Math.round(averageOf(this.fpsList)),
				min: Math.min(...this.fpsList),
				max: Math.max(...this.fpsList),
			}
		}

		return undefined;
	}

	private getMSResult(): MSResult {
		return {
			average: Math.round(averageOf(this.msList)),
			min: Math.round(Math.min(...this.msList)),
			max: Math.round(Math.max(...this.msList)),
		}
	}

	private reset() {
		this.prevTime = performance.now();
		this.frame = 0;
		this.fpsList = [];
		this.msList = [];
		this.lastFrameTime = undefined;
	}

	private isStart = false;
	private prevTime: number = 0;
	private frame: number = 0;
	private fpsList: number[] = [];
	private msList: number[] = [];

	private lastFrameTime?: number;

}

function averageOf(arr: number[]) {
	return arr.reduce((prev, v) => prev + v, 0) / arr.length;
}
