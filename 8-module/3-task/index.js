export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let currentProduct = product && this.cartItems.find(item => {
      return item.product.id == product.id;
    });
    
    if (product !== undefined && product !== null) {
      if (!currentProduct) {
        currentProduct = {
          product,
          count: 1
        };
        this.cartItems.push(currentProduct);
      } else {
        currentProduct.count += 1;
      };
    }

    this.onProductUpdate(currentProduct);
  }

  updateProductCount(productId, amount) {
    let currentProduct = this.cartItems.find(item => {
      return item.product.id === productId;
    });
    currentProduct.count += amount;
    
    if (currentProduct.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(currentProduct), 1);
    };

    this.onProductUpdate(currentProduct);
  }

  isEmpty() {
    return this.getTotalCount() > 0 ? false : true;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count,0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.count,0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
