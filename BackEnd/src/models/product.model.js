import { pool } from '../DB/index.js';

const seedData = [
  // ─────────────────────────────────────────
  // GEN. STORE
  // ─────────────────────────────────────────
  {
    store: 'Gen. Store',
    items: [
      { name: 'Coke 250ml',       price: 80,   aliases: ['coke', 'coca cola', 'thanda', 'cold drink'] },
      { name: 'Pepsi 250ml',      price: 80,   aliases: ['pepsi'] },
      { name: 'Sprite 250ml',     price: 80,   aliases: ['sprite', '7up'] },
      { name: 'Coke 500ml',       price: 130,  aliases: ['coke bottle', 'coke botal', 'big coke'] },
      { name: 'Pepsi 500ml',      price: 130,  aliases: ['pepsi bottle', 'pepsi botal', 'big pepsi'] },
      { name: 'Water 500ml',      price: 60,   aliases: ['water', 'pani', 'paani', 'mineral water'] },
      { name: 'Water 1.5L',       price: 100,  aliases: ['big water', 'bari pani', 'large water'] },
      { name: 'Sting',            price: 120,  aliases: ['sting', 'energy drink', 'red bull'] },
      { name: 'Nestle Juice',     price: 90,   aliases: ['juice', 'nestle juice', 'fruita vitals'] },
      { name: 'Rooh Afza',        price: 60,   aliases: ['rooh afza', 'sharbat'] },
      { name: 'Lays Classic',     price: 70,   aliases: ['lays', 'chips', 'crisps', 'lay'] },
      { name: 'Lays Masala',      price: 70,   aliases: ['lays masala', 'masala chips', 'spicy chips'] },
      { name: 'Kurkure',          price: 50,   aliases: ['kurkure', 'kurki'] },
      { name: 'Pringles',         price: 350,  aliases: ['pringles'] },
      { name: 'Cake Rusk',        price: 30,   aliases: ['cake rusk', 'rusk', 'cake'] },
      { name: 'Hide & Seek',      price: 80,   aliases: ['hide and seek', 'hide seek', 'biscuit', 'chocolate biscuit'] },
      { name: 'Sooper',           price: 40,   aliases: ['sooper', 'plain biscuit'] },
      { name: 'Oreo',             price: 100,  aliases: ['oreo'] },
      { name: 'Rio',              price: 60,   aliases: ['rio', 'rio biscuit'] },
      { name: 'Nimco',            price: 80,   aliases: ['nimco', 'mix nimco', 'daal nimco'] },
      { name: 'Maggi Noodles',    price: 80,   aliases: ['maggi', 'noodles', 'instant noodles'] },
      { name: 'Knorr Noodles',    price: 80,   aliases: ['knorr', 'knorr noodles'] },
      { name: 'Cup Noodles',      price: 150,  aliases: ['cup noodles', 'cup wali noodles'] },
      { name: 'Milk Pak 250ml',   price: 90,   aliases: ['milk', 'doodh', 'milkpak'] },
      { name: 'Nestle Yogurt',    price: 120,  aliases: ['yogurt', 'dahi', 'curd'] },
      { name: 'Butter',           price: 150,  aliases: ['butter', 'makhan'] },
      { name: 'Eggs (per piece)', price: 30,   aliases: ['egg', 'anda', 'anday'] },
      { name: 'Pen',              price: 30,   aliases: ['pen', 'qalam'] },
      { name: 'Pencil',           price: 20,   aliases: ['pencil'] },
      { name: 'Notebook',         price: 150,  aliases: ['notebook', 'copy', 'register'] },
      { name: 'Highlighter',      price: 80,   aliases: ['highlighter', 'marker'] },
      { name: 'Eraser',           price: 20,   aliases: ['eraser', 'rubber'] },
      { name: 'Sharpener',        price: 20,   aliases: ['sharpener'] },
      { name: 'Stapler',          price: 200,  aliases: ['stapler'] },
      { name: 'A4 Paper (pack)',  price: 350,  aliases: ['a4', 'paper', 'printing paper'] },
      { name: 'Soap',             price: 100,  aliases: ['soap', 'sabun'] },
      { name: 'Shampoo Sachet',   price: 30,   aliases: ['shampoo', 'sachet shampoo'] },
      { name: 'Toothpaste',       price: 150,  aliases: ['toothpaste', 'paste', 'colgate', 'dentonic'] },
      { name: 'Toothbrush',       price: 80,   aliases: ['toothbrush', 'brush'] },
      { name: 'Tissue Box',       price: 200,  aliases: ['tissue', 'tissue box', 'kleenex'] },
      { name: 'Tissue Pocket',    price: 50,   aliases: ['pocket tissue', 'small tissue'] },
      { name: 'Hand Sanitizer',   price: 150,  aliases: ['sanitizer', 'hand sanitizer'] },
      { name: 'Detergent (small)',price: 120,  aliases: ['detergent', 'surf', 'washing powder', 'ariel'] }
    ]
  },
  {
    store: 'Cafe',
    items: [
      { name: 'Tea',              price: 50,   aliases: ['tea', 'chai', 'chay'] },
      { name: 'Milk Tea',         price: 60,   aliases: ['milk tea', 'doodh patti', 'doodh wali chai'] },
      { name: 'Coffee',           price: 100,  aliases: ['coffee', 'qahwa'] },
      { name: 'Green Tea',        price: 60,   aliases: ['green tea', 'sabz chai'] },
      { name: 'Hot Chocolate',    price: 120,  aliases: ['hot chocolate', 'cocoa'] },
      { name: 'Coke',             price: 100,  aliases: ['coke', 'thanda', 'cold drink', 'pepsi', 'sprite'] },
      { name: 'Lassi',            price: 120,  aliases: ['lassi'] },
      { name: 'Milkshake',        price: 200,  aliases: ['milkshake', 'shake'] },
      { name: 'Paratha',          price: 80,   aliases: ['paratha', 'pratha'] },
      { name: 'Egg Paratha',      price: 120,  aliases: ['egg paratha', 'anda paratha', 'anday wala paratha'] },
      { name: 'Omelette',         price: 100,  aliases: ['omelette', 'omelet', 'anda'] },
      { name: 'Sandwich',         price: 150,  aliases: ['sandwich', 'sandwitch'] },
      { name: 'Club Sandwich',    price: 220,  aliases: ['club sandwich', 'club'] },
      { name: 'Burger',           price: 280,  aliases: ['burger', 'cafe burger'] },
      { name: 'Chicken Roll',     price: 200,  aliases: ['roll', 'chicken roll', 'paratha roll'] },
      { name: 'Samosa',           price: 40,   aliases: ['samosa', 'samosay'] },
      { name: 'Pakora',           price: 30,   aliases: ['pakora', 'pakori', 'pakoras'] },
      { name: 'French Fries',     price: 150,  aliases: ['fries', 'french fries', 'chips'] },
      { name: 'Pasta',            price: 250,  aliases: ['pasta', 'macaroni'] },
      { name: 'Noodles',          price: 200,  aliases: ['noodles', 'chow mein', 'chowmein'] },
      { name: 'Rice',             price: 180,  aliases: ['rice', 'chawal', 'plain rice'] },
      { name: 'Daal',             price: 150,  aliases: ['daal', 'dal', 'lentils'] },
      { name: 'Khichdi',          price: 150,  aliases: ['khichdi', 'khichri'] },
      { name: 'Cake Slice',       price: 100,  aliases: ['cake', 'cake slice'] },
      { name: 'Muffin',           price: 120,  aliases: ['muffin'] },
      { name: 'Biscuits',         price: 60,   aliases: ['biscuit', 'biscuits', 'cookie'] }
    ]
  },
  {
    store: 'Main Gate',
    items: [
      { name: 'Tea',              price: 40,   aliases: ['tea', 'chai', 'chay'] },
      { name: 'Paratha',          price: 60,   aliases: ['paratha'] },
      { name: 'Egg Paratha',      price: 100,  aliases: ['egg paratha', 'anda paratha'] },
      { name: 'Omelette',         price: 80,   aliases: ['omelette', 'anda'] },
      { name: 'Chicken Roll',     price: 180,  aliases: ['roll', 'chicken roll'] },
      { name: 'Samosa',           price: 30,   aliases: ['samosa'] },
      { name: 'Pakora',           price: 25,   aliases: ['pakora', 'pakoras'] },
      { name: 'Burger',           price: 250,  aliases: ['burger'] },
      { name: 'Coke',             price: 80,   aliases: ['coke', 'pepsi', 'sprite', 'thanda'] },
      { name: 'Water',            price: 60,   aliases: ['water', 'pani'] },
      { name: 'Lassi',            price: 100,  aliases: ['lassi'] },
      { name: 'Nimco',            price: 60,   aliases: ['nimco'] },
      { name: 'Lays',             price: 70,   aliases: ['lays', 'chips'] }
    ]
  },
  {
    store: 'Tahir Khan',
    items: [
      { name: 'Chapli Kebab',     price: 120,  aliases: ['chapli', 'chapli kebab', 'kabab'] },
      { name: 'Chapli Burger',    price: 250,  aliases: ['chapli burger', 'kabab burger'] },
      { name: 'Naan',             price: 30,   aliases: ['naan', 'nan', 'bread'] },
      { name: 'Chicken Karahi',   price: 600,  aliases: ['karahi', 'chicken karahi', 'karhai'] },
      { name: 'Mutton Karahi',    price: 900,  aliases: ['mutton karahi', 'mutton', 'lamb karahi'] },
      { name: 'Daal',             price: 150,  aliases: ['daal', 'dal'] },
      { name: 'Rice',             price: 150,  aliases: ['rice', 'chawal'] },
      { name: 'Raita',            price: 60,   aliases: ['raita'] },
      { name: 'Salad',            price: 60,   aliases: ['salad'] },
      { name: 'Tea',              price: 40,   aliases: ['tea', 'chai'] },
      { name: 'Coke',             price: 80,   aliases: ['coke', 'thanda', 'cold drink'] }
    ]
  },
  {
    store: 'Amir Khan',
    items: [
      { name: 'Beef Burger',      price: 300,  aliases: ['burger', 'beef burger', 'amir burger'] },
      { name: 'Chicken Burger',   price: 280,  aliases: ['chicken burger'] },
      { name: 'Zinger Burger',    price: 350,  aliases: ['zinger', 'zinger burger'] },
      { name: 'French Fries',     price: 150,  aliases: ['fries', 'french fries', 'chips'] },
      { name: 'Nuggets',          price: 200,  aliases: ['nuggets', 'chicken nuggets'] },
      { name: 'Shawarma',         price: 250,  aliases: ['shawarma', 'shwarma'] },
      { name: 'Chicken Roll',     price: 220,  aliases: ['roll', 'chicken roll'] },
      { name: 'Pizza Slice',      price: 250,  aliases: ['pizza', 'pizza slice'] },
      { name: 'Coke',             price: 100,  aliases: ['coke', 'pepsi', 'sprite', 'thanda'] },
      { name: 'Juice',            price: 100,  aliases: ['juice'] },
      { name: 'Milkshake',        price: 250,  aliases: ['milkshake', 'shake', 'milk shake'] }
    ]
  },
  {
    store: 'Bannu Beef',
    items: [
      { name: 'Beef Pulao',       price: 300,  aliases: ['pulao', 'beef pulao', 'chawal', 'rice'] },
      { name: 'Beef Karahi',      price: 800,  aliases: ['beef karahi', 'karahi'] },
      { name: 'Beef Kebab',       price: 150,  aliases: ['kebab', 'kabab', 'beef kebab'] },
      { name: 'Naan',             price: 30,   aliases: ['naan', 'nan', 'roti'] },
      { name: 'Chapati',          price: 20,   aliases: ['chapati', 'roti', 'tawa roti'] },
      { name: 'Beef Qorma',       price: 350,  aliases: ['qorma', 'korma', 'beef qorma'] },
      { name: 'Raita',            price: 60,   aliases: ['raita', 'dahi'] },
      { name: 'Salad',            price: 50,   aliases: ['salad'] },
      { name: 'Tea',              price: 40,   aliases: ['tea', 'chai'] },
      { name: 'Coke',             price: 80,   aliases: ['coke', 'thanda'] }
    ]
  },
  {
    store: 'Biryani',
    items: [
      { name: 'Chicken Biryani',  price: 280,  aliases: ['biryani', 'chicken biryani', 'biriyani'] },
      { name: 'Beef Biryani',     price: 320,  aliases: ['beef biryani', 'gosht biryani'] },
      { name: 'Mutton Biryani',   price: 380,  aliases: ['mutton biryani'] },
      { name: 'Half Chicken Biryani', price: 160, aliases: ['half biryani', 'half plate'] },
      { name: 'Raita',            price: 60,   aliases: ['raita', 'dahi'] },
      { name: 'Salad',            price: 50,   aliases: ['salad'] },
      { name: 'Shami Kebab',      price: 80,   aliases: ['shami', 'shami kebab'] },
      { name: 'Coke',             price: 80,   aliases: ['coke', 'thanda', 'cold drink'] },
      { name: 'Water',            price: 60,   aliases: ['water', 'pani'] }
    ]
  }
];

export const createProductTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stores (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS product_aliases (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        alias VARCHAR(255) NOT NULL
      );
    `);
    console.log('Tables created successfully.');
  } catch (err) {
    console.error('Error creating product tables:', err);
  }
};

export const seedProducts = async () => {
  try {
    const { rows } = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(rows[0].count) > 0) {
      console.log('Products already seeded — skipping.');
      return;
    }

    for (const storeData of seedData) {
      const storeResult = await pool.query(
        `INSERT INTO stores (name) VALUES ($1)
         ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
         RETURNING id`,
        [storeData.store]
      );
      const storeId = storeResult.rows[0].id;

      for (const item of storeData.items) {
        const productResult = await pool.query(
          `INSERT INTO products (store_id, name, price)
           VALUES ($1, $2, $3) RETURNING id`,
          [storeId, item.name, item.price]
        );
        const productId = productResult.rows[0].id;

        for (const alias of item.aliases) {
          await pool.query(
            `INSERT INTO product_aliases (product_id, alias)
             VALUES ($1, $2)`,
            [productId, alias]
          );
        }
      }
      console.log(`Seeded: ${storeData.store} (${storeData.items.length} items)`);
    }
    console.log('Seeding complete.');
  } catch (err) {
    console.error('Error seeding products:', err);
  }
};

export const getAllProductsWithAliases = async () => {
  const result = await pool.query(`
    SELECT p.id, p.name, p.price, pa.alias
    FROM products p
    LEFT JOIN product_aliases pa ON p.id = pa.product_id
    WHERE p.is_active = TRUE
  `);
  
  const productsMap = {};
  for (const row of result.rows) {
    if (!productsMap[row.id]) {
      productsMap[row.id] = {
        id: row.id,
        name: row.name,
        price: row.price,
        aliases: []
      };
    }
    if (row.alias) {
      productsMap[row.id].aliases.push(row.alias.toLowerCase());
    }
  }
  
  return Object.values(productsMap);
};
