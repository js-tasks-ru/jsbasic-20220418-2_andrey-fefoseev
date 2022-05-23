import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;

  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  };

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    document.addEventListener('keydown', (e) => {
      this.onKeyDown(e);
    });
  };

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = `${title}`;
  };

  setBody(node) {
    this.elem.querySelector('.modal__body').append(node);
  };

  onKeyDown(e) {
    if (e.code === 'Escape') {
      e.preventDefault();
      this.close();
    };
  };

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
   
    document.removeEventListener('keydown', (e) => {
      this.onKeyDown(e);
    });
  };

  addEventListeners() {
    this.elem.querySelector('.modal__close').addEventListener('click', () => {
      this.close();
    });
  };
}
