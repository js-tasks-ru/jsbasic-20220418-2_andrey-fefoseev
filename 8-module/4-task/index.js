import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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
    console.log(currentProduct)
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();

    this.modal.setTitle("Your order");

    this.modalBody = document.createElement(`div`);

    this.cartItems.map(item => {
      this.modalBody.append(this.renderProduct(item.product, item.count));
    });

    this.modalBody.append(this.renderOrderForm());

    this.modalBody.addEventListener('click', (e) => {
      if (e.target.closest(".cart-counter__button")) {
        let productElem = e.target.closest("[data-product-id]");
        let productId = productElem.dataset.productId;
        this.updateProductCount(
          productId,
          e.target.closest(".cart-counter__button_plus") ? 1 : -1
        );
      };
    });

    this.modalBody.querySelector("form").onsubmit = (event) => this.onSubmit(event);

    this.modal.setBody(this.modalBody);

    this.modal.elem.addEventListener('modal-close', () => {
      this.modal = null;
      this.modalBody = null;
    });

    this.modal.open();

  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!this.modal || !document.body.classList.contains('is-modal-open')) {
      return;
    };

    if (this.cartItems.length == 0) {
      this.modal.close();
      return;
    };
    
    if (cartItem.count === 0) {
      this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
    } else {
      this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`).innerHTML = cartItem.count;

      this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`).innerHTML = '€' + (cartItem.count * cartItem.product.price).toFixed(2);
    };

    this.modalBody.querySelector(`.cart-buttons__info-price`).innerHTML = '€' + this.getTotalPrice().toFixed(2);
  }

  async onSubmit(event) {
    event.preventDefault();
    
    this.modalBody.querySelector('button[type="submit"]').classList.add("is-loading");

    let form = this.modalBody.querySelector('.cart-form');
    let userData = new FormData(form);

    await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: userData
    });

    this.modal.setTitle("Success!");

    this.modalBody.querySelector('button[type="submit"]').classList.remove("is-loading");
    
    this.cartItems = [];

    this.cartIcon.update(this);

    this.modalBody.innerHTML = `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `;
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

