const { PriorityQueue } = require('../src/algorithm/priorityQueue');

test('check to make sure the priority queue is created', () => {
  const temp = new PriorityQueue();
  expect(temp).toBeTruthy();
});

test('check to see if element is enqueued', () => {
  const temp = new PriorityQueue();
  temp.enqueue("A", 5);
  expect(temp.isEmpty()).toBeFalsy();
});

test('check to see if element is dequeued', () => {
  const temp = new PriorityQueue();
  temp.enqueue("A", 5);
  temp.dequeue();
  expect(temp.isEmpty()).toBeTruthy();
})