const { dijkstra } = require('../src/shortestPath');

test('check to see if dijkstra runs correctly', () => {
  const graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
  };

  let path = dijkstra(graph, 'A', 'D');

  expect(path).toEqual(['A', 'B', 'C', 'D'])
})