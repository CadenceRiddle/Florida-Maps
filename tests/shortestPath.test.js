const dijkstra = require('../src/algorithm/shortestPath');

test('check to see if dijkstra runs correctly', () => {
  const graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
  };

  let path = dijkstra(graph, 'A', 'D');

  expect(path).toEqual(['A', 'B', 'C', 'D'])
});

test('check to see if dijkstra runs correctly on a larger scale', () => {
  const graph = {
    '1': {'6': 3, '3': 4},
    '2': {'6': 2},
    '3': {'1': 1, '4': 4},
    '4': {'3': 4, '5': 5, '7': 6},
    '5': {'10': 8, '6': 7, '4': 5, '9': 2},
    '6': {'2': 2, '1': 1, '5': 7},
    '7': {'8': 3, '4': 4},
    '8': {'9': 4, '7': 3},
    '9': {'5': 2, '8': 4},
    '10': {'5': 8},
  };
  
  let path = dijkstra(graph, '1', '8');
  expect(path).toEqual(['1', '6', '5', '9', '8']);
})