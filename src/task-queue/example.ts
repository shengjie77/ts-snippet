import { createTaskQueue } from './TaskQueue';
import { Task } from './Task';

const queue = createTaskQueue();

const taskA: Task = {
  run: () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    })
  } 
}

const taskB: Task = {
  run: () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
    })
  } 
}

queue.addTask([taskA, taskB]);
queue.start();
