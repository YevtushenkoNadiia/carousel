// классы


class Carousel {
  constructor(p) {
    let settings = (() => ({...{containerID: '#carousel', interval: 5000, isPlaying: true,slideID: '.slide'}, ...p}))();

    this.container = document.querySelector(settings.containerID);
    this.slideItems = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }

  /*
   
  _initConfig(o) {
    return{...{containerID: '#carousel', slideID: '.slide', interval: 5000, isPlaying: true}, ...o};
  }


  if (typeof obj !== 'undefined') {
      settings.containerID = obj.containerID || settings.containerID;
      settings.slideID = obj.slideID|| settings.slideID;
      settings.interval = obj.interval|| settings.interval;
      settings.isPlaying = obj.isPlaying|| settings.isPlaying;
    }


  /* private, _initProps - initialization properties */
  
  _initProps() {

    this.CODE_SPACE = 'Space';
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';

    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';

    this.slidesCount = this.slideItems.length;
    this.currentSlide = 0;
  }

  _initControls() {
    let controls = document.createElement('div');
    const PAUSE = `<span id="pause-btn" class="control-pause">
                  <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                  <span id="fa-play-icon">${this.FA_PLAY}</span>
                   </span>`;
    const PREV = `<span id="prev-btn" class="control-prev">${this.FA_PREV}</span>`;
    const NEXT = `<span id="next-btn" class="control-next">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.appendChild(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');

    this.pauseIcon = this.container.querySelector('#fa-pause-icon');
    this.playIcon = this.container.querySelector('#fa-play-icon');

    this.isPlaying ? this.pauseIcon.style.opacity = 1 : this.playIcon.style.opacity = 1;
  }

  _initIndicators() {
    let indicators = document.createElement('ol');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0, n = this.slidesCount; i < n; i++) {
      let indicator = document.createElement('li');

      indicator.setAttribute('class', 'indicator');
      indicator.dataset.slideTo = `${i}`;
      i === 0 && indicator.classList.add('active');
      indicators.appendChild(indicator);
    }
    this.container.appendChild(indicators);

    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicatorItems = this.container.querySelectorAll('.indicator');
  }

  _initListeners() {
    document.addEventListener('keydown', this._keyPress.bind(this));
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
  }

  gotoSlide(n) {
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slidesCount) % this.slidesCount;
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
  }

  nextSlide() {
    this.gotoSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.prevSlide(this.currentSlide - 1);
  }

  _pause() {
    if (this.isPlaying) {
      this.pauseIcon.style.opacity = 0;
      this.playIcon.style.opacity = 1;
      this.isPlaying = false;
      clearInterval(this.timerID);
    }
  }

  _play() {
    if (!this.isPlaying) {
      this.pauseIcon.style.opacity = 1;
      this.playIcon.style.opacity = 0;
      this.isPlaying = true;
      this.timerID = setInterval(() => this.nextSlide(), this.interval);
    }
  }

  _indicate(e) {
    let target = e.target;

    if (target && target.matches('li.indicator')) {
      this._pause();
      this.gotoSlide(+target.dataset.slideTo);
    }
  }

  _keyPress(e) {
    if (e.code === this.CODE_ARROW_LEFT) this.prev();
    if (e.code === this.CODE_ARROW_RIGHT) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    if (this.isPlaying) this.timerID = setInterval(() => this.nextSlide(), this.interval);
  }
}


class SwipeCarousel extends Carousel {

  _initListeners() {
    super._initListeners();
    this.container.addEventListener('touchstart', this.swipeStart.bind(this));
    this.container.addEventListener('touchend', this.swipeEnd.bind(this));
  }

  swipeStart (e) {
    this.swipeStartX = e.changedTouches[0].clientX;
  }

  swipeEnd (e) {
    this.swipeEndX = e.changedTouches[0].clientX;
    this.swipeStartX - this.swipeEndX > 100 && this.next();
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
  }
}



// прототипы 

// function Carousel(containerID = '#carousel', slideID = '.slide') {
//   this.container = document.querySelector(containerID);
//   this.slides = this.container.querySelectorAll(slideID);

//   this.interval = 2000;
// }

// Carousel.prototype = {

//   _initProps() {
//     this.CODE_SPACE = 'Space';
//     this.CODE_ARROW_LEFT = 'ArrowLeft';
//     this.CODE_ARROW_RIGHT = 'ArrowRight';
    
//     this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
//     this.FA_PLAY = '<i class="far fa-play-circle"></i>';
//     this.FA_PREV = '<i class="fas fa-angle-left"></i>';
//     this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  
//     this.slidesCount = this.slides.length;
//     this.currentSlide = 0;
//     this.timerID = null;
//     this.isPlaying = true;
//     this.swipeStartX = null;
//     this.swipeEndX = null;
//   },

//   _initControls() {
//     const controls = document.createElement('div');
//     const PAUSE =  `<div id="pause" class="control">${this.FA_PAUSE}</div>`;
//     const PREV = `<div id="prev" class="control"><${this.FA_PREV}</div>`;
//     const NEXT = `<div id="next" class="control">${this.FA_NEXT}</div>`;

//     controls.setAttribute('class', 'controls');
//     controls.innerHTML = PAUSE + PREV + NEXT;

//     this.container.appendChild(controls);

//     this.pauseBtn = this.container.querySelector('#pause');
//     this.prevBtn = this.container.querySelector('#prev');
//     this.nextBtn = this.container.querySelector('#next');
//   },

//   _initIndicators() {
//     const indicators = document.createElement('div');

//     indicators.setAttribute('class', 'indicators');

//     for (let i = 0, n = this.slidesCount; i < n; i++) {
//       const indicator = document.createElement('div');

//       indicator.setAttribute('class', 'indicator');
//       indicator.dataset.slideTo = `${i}`;
//       i === 0 && indicator.classList.add('active');

//       indicators.appendChild(indicator);
//     }
//     this.container.appendChild(indicators);

//     this.indicatorsContainer = this.container.querySelector('.indicators');
//     this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
//   },

//   _initListeners() {
//     this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
//     this.prevBtn.addEventListener('click', this.prev.bind(this));
//     this.nextBtn.addEventListener('click', this.next.bind(this));
//     this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
//     document.addEventListener('keydown', this.pressKey.bind(this));
//   },

//   gotoSlide(n) {
//     this.indicators[this.currentSlide].classList.toggle('active');
//     this.currentSlide = (n + this.slidesCount) % this.slidesCount;
//     this.indicators[this.currentSlide].classList.toggle('active');
//     this.slides[this.currentSlide].classList.toggle('active');
//     this.slides[this.currentSlide].classList.toggle('active');
//   },

//   prevSlide() {
//     this.gotoSlide(this.currentSlide - 1);
//   },

//   nextSlide() {
//     this.gotoSlide(this.currentSlide + 1);
//   },

//   prev() {
//     this.pause();
//     this.prevSlide();
//   },

//   next() {
//     this.pause();
//     this.nextSlide();
//   },

//   pause() {
//   if (this.isPlaying) {
//     this.pauseBtn.innerHTML = this.FA_PLAY;
//     this.isPlaying = false;
//     clearInterval(this.timerID);
//     }
//   },

//   play() {
//     this.pauseBtn.innerHTML = this.FA_PAUSE;
//     this.isPlaying = true;
//     this.timerID = setInterval(() => this.nextSlide(), this.interval);
//   },

//   pausePlay () {
//     this.isPlaying ? this.pause() : this.play();
//   },

//   indicate(e) {
//   const target = e.target;

//   if (target && target.classList.contains('indicator')) {
//     this.pause();
//     this.gotoSlide(+target.dataset.slideTo);
//     }
//   },

//   pressKey(e) {
//     if (e.code === this.CODE_ARROW_LEFT) this.prev();
//     if (e.code === this.CODE_ARROW_RIGHT) this.next();
//     if (e.code === this.CODE_SPACE) this.pausePlay();
//   },

//   init () {
//     this._initProps();
//     this._initControls();
//     this._initIndicators();
//     this._initListeners();
//     this.timerID = setInterval(() => this.nextSlide(), this.interval);
//   }
// };

// function SwipeCarousel() {
//   Carousel.apply(this, arguments);
// }

// SwipeCarousel.prototype = Object.create(Carousel.prototype);
// SwipeCarousel.prototype.constructor = SwipeCarousel;

// SwipeCarousel.prototype.swipeStart = function (e) {
//     this.swipeStartX = e.changedTouches[0].clientX;
// };

// SwipeCarousel.prototype.swipeEnd = function (e) {
//   this.swipeEndX = e.changedTouches[0].clientX;
//   this.swipeStartX - this.swipeEndX > 100 && this.next();
//   this.swipeStartX - this.swipeEndX < -100 && this.prev();
// };

// SwipeCarousel.prototype._initListeners = function () {
//   Carousel.prototype._initListeners.apply(this);
//   this.container.addEventListener('touchstart', this.swipeStart.bind(this));
//   this.container.addEventListener('touchend', this.swipeEnd.bind(this));
// };


















