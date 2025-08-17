// ==========================
// Loading Screen
// ==========================
document.addEventListener("DOMContentLoaded", function() {
  const progressBar = document.getElementById("progress-bar");
  const progressPercent = document.getElementById("progress-percent");
  const loadingScreen = document.getElementById("loading-screen");

  const images = document.images; // all images on the page
  const totalImages = images.length;
  let loadedImages = 0;

  function updateProgress() {
    loadedImages++;
    let progress = Math.round((loadedImages / totalImages) * 100);
    progressBar.style.width = progress + "%";
    progressPercent.textContent = progress + "%";

    if (loadedImages >= totalImages) {
      // All images are done loading
      setTimeout(() => {
        loadingScreen.style.opacity = 0;
        setTimeout(() => loadingScreen.style.display = "none", 1000);
      }, 500); // short delay before fade-out
    }
  }

  if (totalImages === 0) {
    // No images? Remove loader immediately
    updateProgress();
  } else {
    for (let i = 0; i < totalImages; i++) {
      if (images[i].complete) {
        updateProgress();
      } else {
        images[i].addEventListener("load", updateProgress);
        images[i].addEventListener("error", updateProgress); // in case of broken image
      }
    }
  }
});

// ==========================
// Carousel Functionality
// ==========================
const carouselInner = document.querySelector(".carousel-inner");
const carouselItems = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
const playBtn = document.getElementById("playBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let currentIndex = 0;
let autoPlay = true;
let intervalCarousel = setInterval(nextSlide, 5000);

function updateCarousel() {
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  // Pause all videos except active one
  carouselItems.forEach((item, i) => {
    const video = item.querySelector("video");
    if (video) {
      if (i === currentIndex) {
        video.play();
      } else {
        video.pause();
      }
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

rightBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoplay();
});
leftBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoplay();
});
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    updateCarousel();
    resetAutoplay();
  });
});

playBtn.addEventListener("click", () => {
  autoPlay = !autoPlay;
  const img = playBtn.querySelector("img");
  if (autoPlay) {
    img.src = "assets/icons/pause.svg";
    intervalCarousel = setInterval(nextSlide, 5000);
  } else {
    img.src = "assets/icons/play.svg";
    clearInterval(intervalCarousel);
  }
});

function resetAutoplay() {
  if (autoPlay) {
    clearInterval(intervalCarousel);
    intervalCarousel = setInterval(nextSlide, 5000);
  }
}

// Init carousel
updateCarousel();

// ==========================
// Product Slider Images & Titles
// ==========================
document.querySelectorAll('.product-card').forEach(card => {
  const images = card.dataset.images.split(',');

  if(images.length === 2){
    // Front image
    const frontImg = document.createElement('img');
    frontImg.src = images[0];
    frontImg.classList.add('base-img');

    // Back image
    const backImg = document.createElement('img');
    backImg.src = images[1];
    backImg.classList.add('hover-img');

    card.appendChild(frontImg);
    card.appendChild(backImg);
  }

  // Wrap card and title in a container
  const wrapper = document.createElement('div');
  wrapper.classList.add('product-card-wrapper');

  card.parentNode.insertBefore(wrapper, card);
  wrapper.appendChild(card);

  const title = document.createElement('div');
  title.classList.add('product-card-title');
  title.textContent = card.dataset.title || '';
  wrapper.appendChild(title);
});

