export const parseOrderText = (text, products) => {
  const matched = [];
  const unmatched = [];
  let estimatedTotal = 0;

  if (!text) return { matched, unmatched, estimatedTotal };

  const lines = text.split('\n');

  for (let line of lines) {
    line = line.trim().toLowerCase();
    if (!line) continue;

    let qty = 1;
    let itemText = line;

    const qtyFirstMatch = line.match(/^(\d+)\s+(.+)$/);
    if (qtyFirstMatch) {
      qty = parseInt(qtyFirstMatch[1], 10);
      itemText = qtyFirstMatch[2].trim();
    } else {
      const qtyLastMatch = line.match(/^(.+?)\s+x(\d+)$/);
      if (qtyLastMatch) {
        itemText = qtyLastMatch[1].trim();
        qty = parseInt(qtyLastMatch[2], 10);
      }
    }
    
    itemText = itemText.toLowerCase().trim();

    let foundProduct = null;
    for (const product of products) {
      const hasMatch = product.aliases.some(alias => 
        alias === itemText || itemText.includes(alias)
      );
      
      if (hasMatch) {
        foundProduct = product;
        break;
      }
    }

    if (foundProduct) {
      const subtotal = qty * foundProduct.price;
      
      matched.push({
        name: foundProduct.name,
        qty,
        price: foundProduct.price,
        subtotal
      });
      
      estimatedTotal += subtotal;
    } else {
      unmatched.push(itemText);
    }
  }

  return { matched, unmatched, estimatedTotal };
};
