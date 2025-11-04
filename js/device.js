    document.addEventListener('DOMContentLoaded', () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        document.body.innerHTML = '';
        Swal.fire({
          title: 'Unsupported Device',
          html: 'Please use a <strong><span style="color:#4da6ff">Desktop</span></strong> or <strong><span style="color:#4da6ff">Laptop</span></strong> to access this site.',
          icon: 'warning',
          background: '#12151a',
          color: '#e6eef3',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          iconColor: '#ff6b6b'
        });
      }
    });
