import { Task } from './Task';

export function createTaskQueue(): TaskQueue {
	return new TaskQueue();
}

/**
 * A async task queue
 *
 * @export
 * @class TaskQueue
 */
export class TaskQueue {

	public start(): void {
		if (!this.isStopped) {
			return;
		}

		this.isStopped = false;
		this.nextTask();
	}

	public stop(): void {
		this.isStopped = true;
	}

	public addTask(tasks: Task | Task[]): void {
		this.tasks = this.tasks.concat(tasks);
	}

	// ---------------- Private Methods ---------------- //

	private async nextTask(): Promise<any> {
		const task = this.tasks.pop();

		if (this.isStopped || !task) {
			return Promise.resolve();
		}

		try {
			await task.run();
		} finally {
			this.nextTask();
		}
	}

	// ---------------- Private Properties ---------------- //
	private tasks: Task[] = [];
	private isStopped: boolean = true;

}
