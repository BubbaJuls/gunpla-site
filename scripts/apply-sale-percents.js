const fs = require('fs');
const path = require('path');

const sales = {
  1: 20, 2: 20, 3: 30, 4: 20, 5: 50, 6: 20, 7: 30, 8: 20, 9: 40, 10: 30,
  11: 20, 12: 30, 13: 20, 14: 40, 15: 30, 16: 20, 17: 50, 18: 20, 19: 30, 20: 40,
  21: 20, 22: 30, 23: 20, 24: 40, 25: 30, 26: 20, 27: 50, 28: 30, 29: 20, 30: 40,
  31: 30, 32: 20, 33: 40, 34: 50, 35: 30,
};

const file = path.join(__dirname, '../js/core/data.js');
let s = fs.readFileSync(file, 'utf8');

for (const [id, pct] of Object.entries(sales)) {
  const blockRe = new RegExp(
    "(id: '" + id + "',[\\s\\S]*?price: (\\d+),\\s*\\n\\s*)originalPrice: \\d+,?(\\s*\\n\\s*salePercent: \\d+,)?"
  );
  s = s.replace(blockRe, (m, pre, priceStr, existingSale) => {
    const price = parseInt(priceStr, 10);
    const step = price >= 5000 ? 500 : price >= 1000 ? 100 : 50;
    const orig = Math.round(price / (1 - pct / 100) / step) * step;
    return pre + 'originalPrice: ' + orig + ',\n    salePercent: ' + pct + ',';
  });
}

fs.writeFileSync(file, s);
console.log('Updated', Object.keys(sales).length, 'products');
