function initCarousel() {
  const carouselWrapper = document.querySelector('.carousel__inner');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const slideCount = carouselWrapper.querySelectorAll('.carousel__slide').length;
  const sliderWidth = carouselWrapper.offsetWidth;
  let slideIndex = 0;

  setArrow(slideIndex, arrowRight, arrowLeft, slideCount);

  arrowRight.addEventListener('click', () => {
    slideIndex += 1;
    carouselWrapper.style.transform = `translateX(-${slideIndex * sliderWidth}px)`;
    setArrow(slideIndex, arrowRight, arrowLeft, slideCount);
  });

  arrowLeft.addEventListener('click', () => {
    slideIndex -= 1;
    carouselWrapper.style.transform = `translateX(-${slideIndex * sliderWidth}px)`;
    setArrow(slideIndex, arrowRight, arrowLeft, slideCount);
  });

  function setArrow(slideIndex, arrowRight, arrowLeft, slideCount) {
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
