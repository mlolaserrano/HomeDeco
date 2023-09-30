document.addEventListener('DOMContentLoaded', function() {
    var menuButton = document.querySelector('.navbar-toggler');
    var menuCollapse = document.querySelector('#navbarMenu');
  
    menuButton.addEventListener('click', function() {
      menuCollapse.classList.toggle('show');
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    var menuButton = document.querySelector('.navbar-toggler');
    var menuCollapse = document.querySelector('#navbarMenu');
  
    menuButton.addEventListener('click', function() {
      menuCollapse.classList.toggle('show');
    });
  });
  
   const toastTrigger = document.getElementById('liveToastBtn');
      const toastLiveExample = document.getElementById('liveToast');
  
      if (toastTrigger) {
        const toastBootstrap = new bootstrap.Toast(toastLiveExample);
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show();
        });
  }
  
  