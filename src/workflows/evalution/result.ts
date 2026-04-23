export type Product = {
  name: string;
  price: number;
};

export function getTopExpensive(products: ReadonlyArray<Product>, count: number): Product[] {
  const normalizedCount: number = Math.max(0, Math.floor(count));
  if (normalizedCount === 0 || products.length === 0) return [];

  return [...products]
    .sort((firstProduct: Product, secondProduct: Product) => secondProduct.price - firstProduct.price)
    .slice(0, normalizedCount);
}