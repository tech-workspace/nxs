/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#wrapper"),
    $header = $("#header"),
    $nav = $("#nav"),
    $main = $("#main"),
    $navPanelToggle,
    $navPanel,
    $navPanelInner;

  // Breakpoints.
  breakpoints({
    default: ["1681px", null],
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */
  $.fn._parallax = function (intensity) {
    var $window = $(window),
      $this = $(this);

    if (this.length == 0 || intensity === 0) return $this;

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) $(this[i])._parallax(intensity);

      return $this;
    }

    if (!intensity) intensity = 0.25;

    $this.each(function () {
      var $t = $(this),
        $bg = $('<div class="bg"></div>').appendTo($t),
        on,
        off;

      on = function () {
        $bg.removeClass("fixed").css("transform", "matrix(1,0,0,1,0,0)");

        $window.on("scroll._parallax", function () {
          var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

          $bg.css("transform", "matrix(1,0,0,1,0," + pos * intensity + ")");
        });
      };

      off = function () {
        $bg.addClass("fixed").css("transform", "none");

        $window.off("scroll._parallax");
      };

      // Disable parallax on ..
      if (
        browser.name == "ie" || // IE
        browser.name == "edge" || // Edge
        window.devicePixelRatio > 1 || // Retina/HiDPI (= poor performance)
        browser.mobile
      )
        // Mobile devices
        off();
      // Enable everywhere else.
      else {
        breakpoints.on(">large", on);
        breakpoints.on("<=large", off);
      }
    });

    $window
      .off("load._parallax resize._parallax")
      .on("load._parallax resize._parallax", function () {
        $window.trigger("scroll");
      });

    return $(this);
  };

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Scrolly.
  $(".scrolly").not('[href="#header"]').scrolly();

  // Background.
  $wrapper._parallax(0.925);

  // Nav Panel.

  // Toggle.
  $navPanelToggle = $(
    '<a href="#navPanel" id="navPanelToggle">Menu</a>'
  ).appendTo($wrapper);

  // Change toggle styling once we've scrolled past the header.
  $header.scrollex({
    bottom: "5vh",
    enter: function () {
      $navPanelToggle.removeClass("alt");
    },
    leave: function () {
      $navPanelToggle.addClass("alt");
    },
  });

  // Panel.
  $navPanel = $(
    '<div id="navPanel">' +
      "<nav>" +
      "</nav>" +
      '<a href="#navPanel" class="close"></a>' +
      "</div>"
  )
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "right",
      target: $body,
      visibleClass: "is-navPanel-visible",
    });

  // Get inner.
  $navPanelInner = $navPanel.children("nav");

  // Move nav content on breakpoint change.
  var $navContent = $nav.children();

  breakpoints.on(">medium", function () {
    // NavPanel -> Nav.
    $navContent.appendTo($nav);

    // Flip icon classes.
    $nav.find(".icons, .icon").removeClass("alt");
  });

  breakpoints.on("<=medium", function () {
    // Nav -> NavPanel.
    $navContent.appendTo($navPanelInner);

    // Flip icon classes.
    $navPanelInner.find(".icons, .icon").addClass("alt");
  });

  // Hack: Disable transitions on WP.
  if (browser.os == "wp" && browser.osVersion < 10)
    $navPanel.css("transition", "none");

  // Intro.
  var $intro = $("#intro");

  if ($intro.length > 0) {
    // Hack: Fix flex min-height on IE.
    if (browser.name == "ie") {
      $window
        .on("resize.ie-intro-fix", function () {
          var h = $intro.height();

          if (h > $window.height()) $intro.css("height", "auto");
          else $intro.css("height", h);
        })
        .trigger("resize.ie-intro-fix");
    }

    // Hide intro on scroll (> small) (PC Screen).
    breakpoints.on(">small", function () {
      $main.unscrollex();

      $main.scrollex({
        mode: "bottom",
        top: "25vh",
        bottom: "-50vh",
        enter: function () {
          /*$intro.removeClass('hidden');*/
        },
        leave: function () {
          /*$intro.addClass('hidden');*/
        },
      });
    });

    // Hide intro on scroll (<= small) (Mobile Screen).
    breakpoints.on("<=small", function () {
      $main.unscrollex();

      $main.scrollex({
        mode: "middle",
        top: "15vh",
        bottom: "-15vh",
        enter: function () {
          /*$intro.addClass('hidden');*/
        },
        leave: function () {
          /*$intro.removeClass('hidden');*/
        },
      });
    });
  }

  // Success and Error Pages Functionality
  $(document).ready(function() {
    // Success Page Functionality
    if ($('.success-container').length > 0) {
      // Add click animation to buttons
      $('.btn').on('click', function() {
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => {
          $(this).css('transform', '');
        }, 150);
      });
      
      // Auto-redirect after 30 seconds (optional)
      let autoRedirectTimer = setTimeout(() => {
        if (confirm('Would you like to return to the home page?')) {
          window.location.href = '/';
        }
      }, 30000);
      
      // Clear timer if user interacts with page
      $(document).on('click', () => {
        clearTimeout(autoRedirectTimer);
      });
    }

    // Error Page Functionality
    if ($('.error-container').length > 0) {
      // Add click animation to buttons
      $('.btn').on('click', function() {
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => {
          $(this).css('transform', '');
        }, 150);
      });
      
      // Log error for debugging (in development)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Error handling - removed console logging
      }
    }
  });

})(jQuery);

// Footer Form Validation and Submission
(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Check if messages are available
    const messagesElement = document.getElementById('messages-json');
    if (!messagesElement) return;
    
    const messages = JSON.parse(messagesElement.textContent);
    const form = document.getElementById('inquiryForm');
    const mobileInput = document.getElementById('mobile');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form || !mobileInput || !emailInput || !nameInput || !messageInput || !submitBtn) return;

    // UAE mobile number validation function
    function validateUAEMobile(mobile) {
      // Remove all non-digit characters except +
      const cleanMobile = mobile.replace(/[^\d+]/g, '');
      
      // UAE mobile number patterns:
      // Local format: 0501234567, 0511234567, 0521234567, 0541234567, 0551234567, 0561234567
      // International format: +971501234567, +971511234567, etc.
      // Also accepts: 0501234567 (10 digits starting with 0)
      
      // Check if it's a valid UAE mobile number
      if (cleanMobile.startsWith('+971') && cleanMobile.length === 13) {
        // International format: +971501234567, +971568863388
        const prefix = cleanMobile.substring(4, 6);
        return ['50', '51', '52', '54', '55', '56'].includes(prefix);
      } else if (cleanMobile.startsWith('971') && cleanMobile.length === 12) {
        // International format without +: 971501234567, 971568863388
        const prefix = cleanMobile.substring(3, 5);
        return ['50', '51', '52', '54', '55', '56'].includes(prefix);
      } else if (cleanMobile.startsWith('0') && cleanMobile.length === 10) {
        // Local format: 0501234567
        const prefix = cleanMobile.substring(1, 3);
        return ['50', '51', '52', '54', '55', '56'].includes(prefix);
      } else if (cleanMobile.length === 9) {
        // Local format without 0: 501234567, 568863388
        const prefix = cleanMobile.substring(0, 2);
        return ['50', '51', '52', '54', '55', '56'].includes(prefix);
      }
      
      return false;
    }

    // Email validation function
    function validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

    // Clear error message
    function clearError(elementId) {
      const errorElement = document.getElementById(elementId);
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      }
    }

    // Show error message (XSS protected)
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      if (errorElement && message) {
        // Use textContent instead of innerHTML to prevent XSS
        errorElement.textContent = message;
        errorElement.style.display = 'block';
      }
    }

    // Real-time mobile validation
    mobileInput.addEventListener('input', function() {
      // Remove any non-digit characters except + that might have been entered
      this.value = this.value.replace(/[^\d+]/g, '');
      
      clearError('mobileError');
      const mobile = this.value.trim();
      
      if (mobile && !validateUAEMobile(mobile)) {
        showError('mobileError', messages.validation.mobileInvalid);
      }
    });

    // Prevent non-numeric and non-plus characters from being typed
    mobileInput.addEventListener('keypress', function(e) {
      const char = String.fromCharCode(e.which);
      if (!/[\d+]/.test(char)) {
        e.preventDefault();
        return false;
      }
    });

    // Prevent paste of invalid characters
    mobileInput.addEventListener('paste', function(e) {
      e.preventDefault();
      const pastedText = (e.clipboardData || window.clipboardData).getData('text');
      const cleanText = pastedText.replace(/[^\d+]/g, '');
      this.value = cleanText;
    });

    // Real-time email validation
    emailInput.addEventListener('input', function() {
      clearError('emailError');
      const email = this.value.trim();
      
      if (email && !validateEmail(email)) {
        showError('emailError', messages.validation.emailInvalid);
      }
    });

    // Real-time name validation
    nameInput.addEventListener('input', function() {
      clearError('nameError');
      const name = this.value.trim();
      
      if (name && name.length < 2) {
        showError('nameError', messages.validation.nameMinLength);
      }
    });

    // Real-time message validation
    messageInput.addEventListener('input', function() {
      clearError('messageError');
      const message = this.value.trim();
      
      if (message && message.length < 10) {
        showError('messageError', messages.validation.messageMinLength);
      }
    });

    // Form submission validation
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const mobile = mobileInput.value.trim();
      const email = emailInput.value.trim();
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

      // Clear all previous errors
      clearError('nameError');
      clearError('mobileError');
      clearError('emailError');
      clearError('messageError');
      clearError('formError');

      // Validate name
      if (!name || name.length < 2) {
        showError('nameError', messages.validation.nameMinLength);
        isValid = false;
      }

      // Validate mobile
      if (!mobile) {
        showError('mobileError', messages.validation.mobileRequired);
        isValid = false;
      } else if (!validateUAEMobile(mobile)) {
        showError('mobileError', messages.validation.mobileInvalid);
        isValid = false;
      }

      // Validate email
      if (!email) {
        showError('emailError', messages.validation.emailRequired);
        isValid = false;
      } else if (!validateEmail(email)) {
        showError('emailError', messages.validation.emailInvalid);
        isValid = false;
      }

      // Validate message
      if (!message || message.length < 10) {
        showError('messageError', messages.validation.messageMinLength);
        isValid = false;
      }

      // If validation passes, submit the form
      if (isValid) {
        // Disable submit button to prevent double submission
        submitBtn.disabled = true;
        submitBtn.value = 'Sending...';
        
        // Submit the form via fetch for better error handling
        submitFormData(form);
      }
    });

    // Enhanced form submission with error handling
    async function submitFormData(form) {
      try {
        const formData = new FormData(form);
        
        const response = await fetch('/submitInquiry', {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: formData
        });

        if (response.ok) {
          // Check content type to determine response format
          const contentType = response.headers.get('content-type') || '';
          
          if (contentType.includes('text/html')) {
            // HTML response - redirect to success page
            window.location.href = response.url;
          } else if (contentType.includes('application/json')) {
            // JSON response
            const result = await response.json();
            if (result.success) {
              // Redirect to success page
              if (result.redirectUrl) {
                window.location.href = result.redirectUrl;
              } else {
                showSuccessMessage(messages.success.inquirySubmitted);
              }
            } else {
              // Redirect to error page for failed submissions
              if (result.redirectUrl) {
                window.location.href = result.redirectUrl;
              } else {
                showFormError(result.message || 'Submission failed');
              }
            }
          } else {
            // Default to redirect for successful responses
            window.location.href = response.url;
          }
        } else {
          // Handle error responses
          const contentType = response.headers.get('content-type') || '';
          
          if (response.status === 400 && contentType.includes('application/json')) {
            try {
              const errorData = await response.json();
              handleValidationErrors(errorData.errors);
            } catch (e) {
              // Error parsing JSON response
              showFormError('Validation failed. Please check your input.');
            }
          } else if (response.status === 429) {
            // Handle rate limiting - try to get redirectUrl from JSON response
            try {
              const errorData = await response.json();
              if (errorData.redirectUrl) {
                window.location.href = errorData.redirectUrl;
              } else {
                window.location.href = '/error?status=429&message=' + encodeURIComponent(messages.error.rateLimitExceeded);
              }
            } catch (e) {
              // Fallback if JSON parsing fails
              window.location.href = '/error?status=429&message=' + encodeURIComponent('You have already submitted an inquiry today. Please try again tomorrow.');
            }
          } else if (contentType.includes('text/html')) {
            // HTML error page - redirect to it
            window.location.href = response.url;
          } else {
            // Default error handling
            showFormError(`Server error (${response.status}). Please try again.`);
          }
        }
      } catch (error) {
        // Form submission error
        showFormError('Network error. Please check your connection and try again.');
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.value = 'Send Inquiry';
      }
    }

    // Handle validation errors from server
    function handleValidationErrors(errors) {
      if (errors.name) showError('nameError', errors.name);
      if (errors.mobile) showError('mobileError', errors.mobile);
      if (errors.email) showError('emailError', errors.email);
      if (errors.message) showError('messageError', errors.message);
    }

    // Show form-level error message
    function showFormError(message) {
      const responseMessage = document.getElementById('responseMessage');
      if (responseMessage) {
        responseMessage.textContent = message;
        responseMessage.style.color = '#e74c3c';
        responseMessage.style.display = 'block';
        
        // Scroll to error message
        responseMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Show success message
    function showSuccessMessage(message) {
      const responseMessage = document.getElementById('responseMessage');
      if (responseMessage) {
        responseMessage.textContent = message;
        responseMessage.style.color = '#27ae60';
        responseMessage.style.display = 'block';
      }
    }
  });
})();

// Home Page Tab Panel Functionality
(function() {
  // Tab switching functionality
  function showTab(tabName) {
    // Hide all tab panels
    var tabPanels = document.getElementsByClassName("tab-panel");
    for (var i = 0; i < tabPanels.length; i++) {
      tabPanels[i].classList.remove("active");
    }
    
    // Remove active class from all navigation links (both desktop and mobile)
    var navLinks = document.querySelectorAll('#nav .links li, #navPanel .links li');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active");
    }
    
    // Show the selected tab panel
    var targetPanel = document.getElementById(tabName + '-panel');
    if (targetPanel) {
      targetPanel.classList.add("active");
    }
    
    // Mark the corresponding navigation link as active (both desktop and mobile)
    var targetLink = document.querySelector('#nav .links li a[href="#' + tabName + '"], #navPanel .links li a[href="#' + tabName + '"]');
    if (targetLink) {
      targetLink.parentElement.classList.add("active");
    }
    
    // Close mobile navigation panel if it's open
    var navPanel = document.getElementById('navPanel');
    var body = document.body;
    if (navPanel && body.classList.contains('is-navPanel-visible')) {
      body.classList.remove('is-navPanel-visible');
    }
  }

  // Handle navigation clicks for both desktop and mobile
  function setupNavigationHandlers() {
    // Handle About Us navigation (both desktop and mobile)
    var aboutLinks = document.querySelectorAll('#nav .links li a[href="#about"], #navPanel .links li a[href="#about"]');
    aboutLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        showTab('about');
      });
    });
    
    // Handle Contact Us navigation (both desktop and mobile)
    var contactLinks = document.querySelectorAll('#nav .links li a[href="#contact"], #navPanel .links li a[href="#contact"]');
    contactLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        showTab('contact');
      });
    });
    
    // Handle Catalog navigation (both desktop and mobile)
    var catalogLinks = document.querySelectorAll('#nav .links li a[href="#catalog"], #navPanel .links li a[href="#catalog"]');
    catalogLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent anchor navigation
        showTab('catalog'); // Show catalog tab instead
      });
    });
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    setupNavigationHandlers();
  });

  // Re-setup handlers when mobile panel is opened (in case it's dynamically loaded)
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        var body = mutation.target;
        if (body.classList.contains('is-navPanel-visible')) {
          // Mobile panel is now visible, ensure handlers are set up
          setTimeout(setupNavigationHandlers, 100);
        }
      }
    });
  });

  // Start observing the body element for class changes
  if (document.body) {
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  // Make showTab function globally available
  window.showTab = showTab;
})();

// Enhanced Header Scroll Behavior
(function() {
  function scrollToMain() {
    // Scroll directly to the main div
    var mainElement = document.getElementById('main');
    if (mainElement) {
      // Smooth scroll to the main element
      mainElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Handle header logo click to scroll to main
    var headerLogo = document.querySelector('#header .logo');
    if (headerLogo) {
      headerLogo.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        scrollToMain();
      });
    }
    
    // Handle continue button click to scroll to main
    var continueButton = document.querySelector('.scrolly[href="#header"]');
    if (continueButton) {
      continueButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        scrollToMain();
      });
    }
  });

  // Also handle clicks after a delay to ensure our handlers are attached
  setTimeout(function() {
    var headerLogo = document.querySelector('#header .logo');
    if (headerLogo) {
      headerLogo.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        scrollToMain();
      });
    }
    
    var continueButton = document.querySelector('.scrolly[href="#header"]');
    if (continueButton) {
      continueButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        scrollToMain();
      });
    }
  }, 1000);
})();

// Date and Year Display Functionality
(function() {
  window.onload = function clock() {
    var d = new Date();
    var date = d.getUTCDate();
    var month = d.getUTCMonth();
    var year = d.getUTCFullYear();
    var monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    month = monthArr[month];
    const dateElement = document.getElementById("spanSysDate");
    const yearElement = document.getElementById("spanSysYear");
    
    if (dateElement) {
      dateElement.innerHTML = date + " " + month + " " + year;
    }
    if (yearElement) {
      yearElement.innerHTML = year;
    }
  };
})();

// Visit Tracking Integration
(function() {
  'use strict';
  
  const VISIT_API_URL = 'https://apigateway.up.railway.app/v1/visits';
  const SOURCE_SYSTEM_CONST = 'NEXUS_WEBSITE';
  const DEBUG_MODE = false; // Set to true for debugging
  
  /**
   * Debug log helper
   */
  function debugLog(message, data) {
    if (DEBUG_MODE) {
      console.log('[Visit Tracking]', message, data || '');
    }
  }
  
  /**
   * Generate or retrieve session ID
   * @returns {string} Session ID
   */
  function getSessionId() {
    let sessionId = sessionStorage.getItem('nexus_session_id');
    
    if (!sessionId) {
      // Generate new session ID
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('nexus_session_id', sessionId);
      debugLog('New session ID created:', sessionId);
    } else {
      debugLog('Existing session ID:', sessionId);
    }
    
    return sessionId;
  }
  
  /**
   * Track visit to the API
   * @param {string} pageUrl - The current page URL
   */
  function trackVisit(pageUrl) {
    try {
      const sessionId = getSessionId();
      const currentUrl = pageUrl || window.location.href;
      
      // Prepare payload
      const payload = {
        sourceSystemConst: SOURCE_SYSTEM_CONST,
        sessionId: sessionId,
        metadata: {
          pageUrl: currentUrl,
          pagePath: window.location.pathname,
          pageHash: window.location.hash,
          referrer: document.referrer || 'direct',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          screenResolution: window.screen.width + 'x' + window.screen.height,
          language: navigator.language
        }
      };
      
      debugLog('Tracking visit:', payload);
      
      // Send visit data to API using fetch with error handling
      fetch(VISIT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        mode: 'cors',
        cache: 'no-cache'
      })
      .then(function(response) {
        debugLog('API Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error('HTTP error! status: ' + response.status);
        }
        
        return response.json();
      })
      .then(function(data) {
        debugLog('Visit tracked successfully:', data);
        
        if (data.success && data.data && data.data.visit) {
          // Store visit ID for future reference
          sessionStorage.setItem('last_visit_id', data.data.visit._id || '');
          sessionStorage.setItem('last_visit_time', new Date().toISOString());
        }
      })
      .catch(function(error) {
        debugLog('Error tracking visit:', error);
        // Fail silently - don't disrupt user experience
      });
      
    } catch (error) {
      debugLog('Exception in trackVisit:', error);
    }
  }
  
  /**
   * Debounce function to prevent too many calls
   */
  function debounce(func, wait) {
    var timeout;
    return function executedFunction() {
      var context = this;
      var args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  /**
   * Track navigation events
   */
  function initVisitTracking() {
    debugLog('Initializing visit tracking...');
    
    // Track initial page load with a small delay to ensure everything is ready
    setTimeout(function() {
      debugLog('Tracking initial page load');
      trackVisit(window.location.href);
    }, 1000);
    
    // Track hash changes (debounced to prevent multiple calls)
    var debouncedHashTrack = debounce(function() {
      debugLog('Hash changed to:', window.location.hash);
      trackVisit(window.location.href);
    }, 500);
    
    window.addEventListener('hashchange', debouncedHashTrack);
    
    // Track browser navigation (back/forward buttons)
    window.addEventListener('popstate', function() {
      debugLog('Popstate event triggered');
      trackVisit(window.location.href);
    });
    
    debugLog('Visit tracking initialized successfully');
  }
  
  // Initialize visit tracking when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisitTracking);
  } else {
    // DOM already loaded
    initVisitTracking();
  }
})();