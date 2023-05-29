document.getElementById('button-up').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
});





const burbuja1 = document.getElementById("blur-bubble-1");
const burbuja2 = document.getElementById("blur-bubble-2");
const burbuja3 = document.getElementById("blur-bubble-3");
anime({
  targets: burbuja1,
  translateY: 75,
  duration: 2500,
  loop: true,
  direction: 'alternate',
  easing: 'easeOutCubic',
});

anime({
  targets: burbuja2,
  translateY: 75,
  duration: 2500,
  loop: true,
  direction: 'alternate',
  easing: 'easeOutCubic',
  delay: 250,
});

anime({
  targets: burbuja3,
  translateY: 75,
  duration: 2500,
  loop: true,
  direction: 'alternate',
  easing: 'easeOutCubic',
  delay: 500,
});