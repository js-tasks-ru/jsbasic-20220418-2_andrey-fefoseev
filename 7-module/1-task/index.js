import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;

  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
        </button>
      </div>
    `);

    this.categories.map(category => {
      let categoryItem = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `)
      this.elem.querySelector('.ribbon__inner').append(categoryItem);
    });
  };
// ribbon__arrow_visible
  updatePosition() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    console.log(scrollWidth, scrollLeft, clientWidth)

    if (scrollLeft === 0) {
      this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
    } else {
      this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
    }

    if (scrollWidth - scrollLeft - clientWidth < 1) {
      this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
    } else {
      this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    }
  };

  swipeLeft() {
    this.elem.querySelector('.ribbon__inner').scrollBy(-350, 0);
    this.updatePosition();
  };

  swipeRight() {
    this.elem.querySelector('.ribbon__inner').scrollBy(350, 0);
    this.updatePosition();
  };

  chooseItem() {

  }


  addEventListeners() {

    this.elem.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.elem.querySelector('.ribbon__item_active')) {
        this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
      };
      e.target.classList.add('ribbon__item_active');

      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: e.target.dataset.id,
        bubbles: true
      }));
    });

    this.elem.addEventListener('click', (e) => {
      if (e.target.closest('.ribbon__arrow_left')) {
        this.swipeLeft();
      };

      if (e.target.closest('.ribbon__arrow_right')) {
        this.swipeRight();
      };
    });

    this.elem.querySelector('.ribbon__inner').addEventListener('scroll', () => {
      this.updatePosition();
    });
  };
}
