import { updateChart } from './chart';

$('#roll-button').click(updateChart);
$('#year').text(new Date().getFullYear());
$('body').scrollspy({ target: '#main-nav' });
$('#main-nav a').on('click', (event) => {
  const { hash } = event.currentTarget;
  if (hash !== '') {
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top,
      },
      900,
      () => {
        window.location.hash = hash;
      }
    );
  }
});
