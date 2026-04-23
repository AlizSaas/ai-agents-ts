export type Bikes = { name: string; price: number }

export function getTopExpensiveBikes(bikes: Bikes[], topN: number) {
  return [...bikes].sort((a, b) => b.price - a.price).slice(0, topN);
}

export function getCheapest(bikes: Bikes[], topN: number) {
  return [...bikes].sort((a, b) => a.price - b.price).slice(0, topN);
}