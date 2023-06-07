const burbuja1 = document.getElementById("c0");
const burbuja2 = document.getElementById("c1");
const burbuja3 = document.getElementById("c3");
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