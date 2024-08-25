const { PriorityQueue } = require('../src/priorityQueue');

test('check to make sure the priority queue is created', () => {
  const temp = new PriorityQueue();
  expect(temp).toBeTruthy();
});
