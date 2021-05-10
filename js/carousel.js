function Carousel() {
  this.container = document.querySelector('#carousel');
  this.slides = this.container.querySelectorAll('.slide');
  this.indicatorsContainer = this.container.querySelector('#indicators-container');
  this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  this.pauseBtn = this.container.querySelector('#pause');
  this.prevBtn = this.container.querySelector('#prev');
  this.nextBtn = this.container.querySelector('#next');


  this.CODE_SPACE = "Space";
  this.CODE_ARROW_LEFT = "ArrowLeft";
  this.CODE_ARROW_RIGHT = "ArrowRight";
  
  this.currentSlide = 0;
  this.timerID = null;
  this.isPlaying = true;
  this.swipeStartX = null;
  this.swipeEndX = null;
}

Carousel.prototype = {
  gotoSlide(n) {
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slidesCount) % slidesCount;
    this.indicators[this.currentSlide].classList.toggle('active');
    this.slides[this.currentSlide].classList.toggle('active');
    this.slides[this.currentSlide].classList.toggle('active');
  },

  prevSlide() {
    this.gotoSlide(this.currentSlide - 1);
  },

  nextSlid() {
    this.gotoSlide(this.currentSlide + 1);
  },

  function prev() {
    this.pause();
    this.prevSlide();
  } 

  function next() {
    this.pause();
    this.nextSlide();
  }

  pause() {
  if (this.isPlaying) {
    this.pauseBtn.innerHTML = 'Play';
    this.isPlaying = false;
    clearInterval(this.timerID);
    }
  },

  play() {
    this.pauseBtn.innerHTML = 'Pause';
    this.isPlaying = true;
    this.timerID = setInterval(this.nextSlide, 1000);
  },

  pausePlay () {
    this.isPlaying ? this.pause() : this.play();
  },

  indicate(e) {
  const target = e.target;

  if (target && target.classList.contains('indicator')) {
    this.pause();
    this.gotoSlide(+target.dataset.slideTo);
    }
  },

  pressKey(e) {
    console.log(e);
    if (e.code === this.CODE_ARROW_LEFT) this.prev();
    if (e.code === this.CODE_ARROW_RIGHT) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  swipeStart (e) {
    this.swipeStartX = e.changedTouches[0].clientX;
  },


  swipeEnd (e) {
    this.swipeEndX = e.changedTouches[0].clientX;
    this.swipeStartX - this.swipeEndX > 100 && this.next();
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
  },

  initListeners() {
    this.prevBtn.addEventListener('click', this.prev);
    this.nextBtn.addEventListener('click', this.next);
    this.indicatorsContainer.addEventListener('click', this.indicate);
    document.addEventListener('keydown', this.pressKey);
    this.container.addEventListener('touchstart', this.swipeStart);
    this.container.addEventListener('touchend', this.swipeEnd);
    this.pauseBtn.addEventListener('click', this.pausePlay);
  },

  init () {
    this.initListeners();
    this.timerID = setInterval(() => this.nextSlide(), 2000);
    // setInterval как и setTimeout nтеряют контекст, поэтому их надо заворачивать в ф-цию и доставать из замыкания
  }
};