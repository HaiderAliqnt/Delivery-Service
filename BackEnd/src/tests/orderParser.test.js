import { parseOrderText } from '../services/orderParser.service.js';

describe('orderParser.service', () => {
  const mockProducts = [
    { name: 'Coke', price: 120, aliases: ['coke', 'coca cola', 'cold drink'] },
    { name: 'Fries', price: 250, aliases: ['fries', 'french fries', 'chips'] },
    { name: 'Burger', price: 550, aliases: ['burger', 'zinger', 'patty'] },
    { name: 'Water', price: 50, aliases: ['water', 'pani'] },
    { name: 'Tea', price: 80, aliases: ['tea', 'chai'] }
  ];

  test('Basic quantity-first', () => {
    const result = parseOrderText("2 coke\n1 burger", mockProducts);
    expect(result.matched).toHaveLength(2);
    expect(result.matched[0]).toMatchObject({ name: 'Coke', qty: 2, subtotal: 240 });
    expect(result.matched[1]).toMatchObject({ name: 'Burger', qty: 1, subtotal: 550 });
    expect(result.estimatedTotal).toBe(790);
  });

  test('Quantity-last format', () => {
    const result = parseOrderText("coke x2\nfries x1", mockProducts);
    expect(result.matched).toHaveLength(2);
    expect(result.matched[0]).toMatchObject({ name: 'Coke', qty: 2, subtotal: 240 });
    expect(result.matched[1]).toMatchObject({ name: 'Fries', qty: 1, subtotal: 250 });
    expect(result.estimatedTotal).toBe(490);
  });

  test('No quantity (defaults to 1)', () => {
    const result = parseOrderText("burger", mockProducts);
    expect(result.matched).toHaveLength(1);
    expect(result.matched[0]).toMatchObject({ name: 'Burger', qty: 1, subtotal: 550 });
    expect(result.estimatedTotal).toBe(550);
  });

  test('Alias match', () => {
    const result = parseOrderText("1 chai", mockProducts);
    expect(result.matched).toHaveLength(1);
    expect(result.matched[0]).toMatchObject({ name: 'Tea', qty: 1, subtotal: 80 });
    expect(result.estimatedTotal).toBe(80);
  });

  test('Partial match', () => {
    const result = parseOrderText("2 cold drink", mockProducts);
    expect(result.matched).toHaveLength(1);
    expect(result.matched[0]).toMatchObject({ name: 'Coke', qty: 2, subtotal: 240 });
    expect(result.estimatedTotal).toBe(240);
  });

  test('Unmatched item', () => {
    const result = parseOrderText("1 pizza", mockProducts);
    expect(result.matched).toHaveLength(0);
    expect(result.unmatched).toEqual(["pizza"]);
    expect(result.estimatedTotal).toBe(0);
  });

  test('Mixed matched/unmatched', () => {
    const result = parseOrderText("2 coke\n1 pizza", mockProducts);
    expect(result.matched).toHaveLength(1);
    expect(result.matched[0]).toMatchObject({ name: 'Coke', qty: 2, subtotal: 240 });
    expect(result.unmatched).toEqual(["pizza"]);
    expect(result.estimatedTotal).toBe(240);
  });

  test('Empty input', () => {
    const result = parseOrderText("", mockProducts);
    expect(result.matched).toHaveLength(0);
    expect(result.unmatched).toHaveLength(0);
    expect(result.estimatedTotal).toBe(0);
  });

  test('Extra whitespace/caps', () => {
    const result = parseOrderText("  2  COKE  ", mockProducts);
    expect(result.matched).toHaveLength(1);
    expect(result.matched[0]).toMatchObject({ name: 'Coke', qty: 2, subtotal: 240 });
    expect(result.estimatedTotal).toBe(240);
  });
});
