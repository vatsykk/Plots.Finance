const burbuja0 = document.getElementById("c0");
const burbuja1 = document.getElementById("c1");
const burbuja3 = document.getElementById("c3");
anime({
  targets: burbuja0,
  translateY: '13%',
  duration: 2900,
  loop: true,
  direction: 'alternate',
  easing: 'linear',
});

anime({
  targets: burbuja1,
  translateY: '35%',
  duration: 3200,
  loop: true,
  direction: 'alternate',
  easing: 'linear',
  delay: 550,
});

anime({
  targets: burbuja3,
  translateY: '15%',
  duration: 3500,
  loop: true,
  direction: 'alternate',
  easing: 'linear',
  delay: 200,
});