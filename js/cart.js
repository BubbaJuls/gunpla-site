var CART_KEY = 'gunpla-cart';

var Cart = {
  getItems: function () {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveItems: function (items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent('cart-updated'));
  },

  getItemCount: function () {
    return this.getItems().reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);
  },

  getSubtotal: function () {
    return this.getItems().reduce(function (sum, item) {
      var product = getProductById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  addItem: function (productId, quantity) {
    quantity = Math.max(1, Math.min(99, quantity || 1));
    var items = this.getItems();
    var found = items.find(function (i) {
      return i.productId === productId;
    });
    if (found) found.quantity = Math.min(99, found.quantity + quantity);
    else items.push({ productId: productId, quantity: quantity });
    this.saveItems(items);
  },

  updateQuantity: function (productId, quantity) {
    var items = this.getItems();
    if (quantity < 1) {
      this.saveItems(items.filter(function (i) {
        return i.productId !== productId;
      }));
      return;
    }
    items = items.map(function (i) {
      if (i.productId === productId) return { productId: productId, quantity: Math.min(99, quantity) };
      return i;
    });
    this.saveItems(items);
  },

  removeItem: function (productId) {
    this.saveItems(
      this.getItems().filter(function (i) {
        return i.productId !== productId;
      })
    );
  },

  clear: function () {
    localStorage.removeItem(CART_KEY);
    document.dispatchEvent(new CustomEvent('cart-updated'));
  },
};
