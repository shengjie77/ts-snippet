import { createTaskQueue, TaskQueue } from '../TaskQueue';

describe('createTaskQueue', () => {

	test('return instance of TaskQueue', () => {
		const ins = createTaskQueue();
		expect(ins).toBeInstanceOf(TaskQueue);
	})

})
