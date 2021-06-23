$('#year').text(new Date().getFullYear());
$('body').scrollspy({ target: '#main-nav' });
$('#main-nav a').on('click', (event) => {
  console.log({ event });
  const { hash } = event.currentTarget;
  if (hash !== '') {
    event.preventDefault();
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
