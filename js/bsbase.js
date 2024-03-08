const body = document.body;
const wrapperEl = document.querySelector(".wrapper");
const headerEl = document.getElementById('header');
const mainEl = document.getElementById('main');
const blurEl = document.getElementById('blur-overlay');
const footerEl = document.getElementById('footer');
const footerCopyrightEl = document.getElementById('footer-copyright');
const brandingEl = document.getElementById('branding');
const menuButton = document.querySelector(".menu-trigger");
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");
const themeSwitcher = document.getElementById('theme-switcher');

menuButton.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile-menu');
    menuIcon.classList.toggle('change');
    mainEl.classList.toggle('prevent-scroll');
    footerEl.classList.toggle('hidden');
    blurEl.classList.toggle('hidden');
});

// Reset menu if screen size changed outside of responsive media query sizes
window.addEventListener("resize", function() {
  if (window.innerWidth > 920) {
    navLinks.classList.remove('mobile-menu');
    menuIcon.classList.remove('change');
    mainEl.classList.remove('prevent-scroll');
    footerEl.classList.remove('hidden');
    blurEl.classList.add('hidden');
  }
});


// Alert banner function
let alertTimerId = null;

function showAlertBanner(message, type) {
  const alertBanner = document.getElementById('alert-banner');
  alertBanner.textContent = message;
  
  // Remove all existing classes from the alert banner
  alertBanner.className = '';

  // Cancel any previously scheduled alerts
  clearTimeout(alertTimerId);

  // Add the new classes to show the alert
  alertBanner.classList.add('alert', type, 'show');

  // Set a timer to hide the alert after 2 seconds
  alertTimerId = setTimeout(() => {
    alertBanner.classList.remove('show');
    alertTimerId = setTimeout(() => {
      alertBanner.classList.add('hidden');
    }, 300);
  }, 2500);
}


// Copy single and multiline code blocks using "COPY" link in top right corner
let copyCode = document.querySelectorAll('.copy-code');

if (copyCode) {
  copyCode.forEach((copyIcon) => {
      copyIcon.addEventListener('click', async () => {
        const codeBlock = copyIcon.previousElementSibling.querySelector('code');
        const textarea = document.createElement('textarea');
    
        textarea.textContent = codeBlock.textContent;
        document.body.appendChild(textarea);
    
        try {
          textarea.select();
          await navigator.clipboard.writeText(textarea.value);
          showAlertBanner('Copied to clipboard!', 'alert-banner-success');
          textarea.remove();
        } catch (err) {
          // Fallback for older browsers
          textarea.select();
          document.execCommand('copy');
          showAlertBanner('Copied to clipboard!', 'alert-banner-success');
          textarea.remove();
        }
      });
    });
}

// Function copies text output to clipboard  
let copyButton = document.getElementById('copyButton');

if (copyButton) {
  copyButton.addEventListener('click', async () => {
      try {
        output.focus();
        output.select();
        await navigator.clipboard.writeText(output.value);
        showAlertBanner('Copied to clipboard!', 'alert-banner-success');
      } catch (err) {
        // Fallback for older browsers
        output.select();
        document.execCommand('copy');
        showAlertBanner('Copied to clipboard!', 'alert-banner-success');
      }
    });
}

// Download text output to .txt file
let downloadButton = document.getElementById('downloadButton');

if (downloadButton) {
  downloadButton.addEventListener('click', () => {
      const blob = new Blob([output.value], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'downloaded-text.txt';
      link.click();
      URL.revokeObjectURL(url);
      showAlertBanner('File downloaded successfully!', 'alert-banner-success');
      downloadButton.disabled = true;
  });
}

// Functions related to searchbox
let searchBoxEl = document.getElementById('search-box');

if (searchBoxEl) {
  async function enableSearchBox() {
      const originalPlaceholder = searchBoxEl.getAttribute('placeholder');

      searchBoxEl.addEventListener('focus', function() {
          searchBoxEl.setAttribute('placeholder', '');
      });

      searchBoxEl.addEventListener('blur', function() {
          if (searchBoxEl.value.trim() === '') {
              searchBoxEl.setAttribute('placeholder', originalPlaceholder);
          }
      });

      searchBoxEl.addEventListener('keyup', function (e) {
          if (e.key === 'Enter') {
              searchBoxEl.blur();
          }
      });
  }
  enableSearchBox();
}


// Scroll to top function
let scrollToTopButton = document.getElementById('scrollToTop');

  if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1200) {
        scrollToTopButton.classList.remove('hidden');
        scrollToTopButton.classList.add('show');
      } else {
        scrollToTopButton.classList.remove('show');
        scrollToTopButton.classList.add('hidden');
      }
    });

    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


document.addEventListener('DOMContentLoaded', () => {

    function setTheme(theme) {
        const body = document.body;
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            brandingEl.classList.add('svg-filter-light');
            brandingEl.classList.remove('svg-filter-dark');
            themeSwitcher.innerText = "LIGHT-THEME";
            themeColorMeta.content = "#202020";
        } else {
            body.removeAttribute('data-theme');
            brandingEl.classList.add('svg-filter-dark');
            brandingEl.classList.remove('svg-filter-light');
            themeSwitcher.innerText = "DARK-THEME";
            themeColorMeta.content = "#FFFFFF";
        }
    }
  
    // Load saved theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  
    themeSwitcher.addEventListener('click', () => {
      const body = document.body;
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // Get the author meta tag content and current year
    const authorMetaTag = document.querySelector('meta[name="author"]');
    const authorName = authorMetaTag ? authorMetaTag.content : 'Your Name';
    const currentYear = new Date().getFullYear();

    // Set the footer content
    footerCopyrightEl.innerHTML = `${authorName} ${currentYear}`;
});  