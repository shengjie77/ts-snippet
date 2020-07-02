
export interface StatsResult {
	/**
	 * FPS 测试结果
	 *
	 * 如果测量时间很短（小于 1000 ms）就没有 FPS 结果
	 *
	 * @type {FPSResult}
	 * @memberof StatsResult
	 */
	fps?: FPSResult;

	/**
	 * 每一帧的绘制时间
	 *
	 * @type {MSResult}
	 * @memberof StatsResult
	 */
	ms: MSResult;
}

export interface FPSResult {
	average: number;
	max: number;
	min: number;
}

export interface MSResult {
	average: number;
	max: number;
	min: number;
}
