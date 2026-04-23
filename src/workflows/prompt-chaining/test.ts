import { getTopExpensiveBikes, type Bikes } from "./bikes";

let failed = false;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failed = true;
  }
}

const bikes: Bikes[] = [
  { name: 'honda', price: 1000 },
  { name: 'yamaha', price: 1500 },
  { name: 'suzuki', price: 1200 },
];

// Test getTopExpensiveBikes
const expensive = getTopExpensiveBikes(bikes, 2);
assert(expensive.length === 2, 'getTopExpensiveBikes: expected 2 results');
assert(expensive[0]?.name === 'yamaha' && expensive[0]?.price === 1500, 'getTopExpensiveBikes: first should be yamaha 1500');
assert(expensive[1]?.name === 'suzuki' && expensive[1]?.price === 1200, 'getTopExpensiveBikes: second should be suzuki 1200');

