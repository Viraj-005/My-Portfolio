(function () {
        try {
          var stored = localStorage.getItem('portfolio-theme-v2');
          if (stored === 'dark') {
            document.documentElement.classList.add('dark');
          }
        } catch (e) {
          /* private mode or storage disabled, fall through to light */
        }

        try {
          var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if ('IntersectionObserver' in window && !reduced) {
            document.documentElement.classList.add('js-motion');
          }
        } catch (e) {
          /* leave content visible */
        }
      })();
