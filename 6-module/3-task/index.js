import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slideIndex = 0;
    this.elem = this.render(slides);
    this.slides = slides;
  }

  render(slides) {
    const carousel = document.createElement('div');
    carousel.className = 'carousel';

    let slide = slides.map(slide => {
      return `
      <div class="carousel__slide" data-id=${slide.id}>
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€ ${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `
    }).join("");


    carousel.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${slide}
      </div>
    `;

    const sliderWrapper = carousel.querySelector('.carousel__inner'); 
    const arrowRight = carousel.querySelector('.carousel__arrow_right');
    const arrowLeft = carousel.querySelector('.carousel__arrow_left');
    
    this.setArrow(this.slideIndex, arrowRight, arrowLeft, slides.length);

    arrowRight.addEventListener('click', () => {
      this.slideIndex += 1;
      sliderWrapper.style.transform = `translateX(-${this.slideIndex * sliderWrapper.offsetWidth}px)`;
      this.setArrow(this.slideIndex, arrowRight, arrowLeft, slides.length);
    });

    arrowLeft.addEventListener('click', () => {
      this.slideIndex -= 1;
      sliderWrapper.style.transform = `translateX(-${this.slideIndex * sliderWrapper.offsetWidth}px)`;
      this.setArrow(this.slideIndex, arrowRight, arrowLeft, slides.length);
    });

    const buttons = carousel.querySelectorAll('.carousel__button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        carousel.dispatchEvent(new CustomEvent("product-add", {
          detail: button.closest('.carousel__slide').dataset.id,
          bubbles: true
        }))
      })
    })

    return carousel;
  }

  setArrow(slideIndex, arrowRight, arrowLeft, slideCount) {
    if (slideIndex === 0) {
      arrowLeft.style.display = 'none'; 
    } else {
      arrowLeft.style.display = '';
    };

    if (slideIndex >= slideCount - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    };
  };
}
