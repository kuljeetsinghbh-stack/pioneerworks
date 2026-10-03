/* =========================================================
   PIONEER WORKS LIMITED
   Main Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("nav");

  if (menuToggle && navigation) {

    function openMenu() {
      navigation.classList.add("nav-open");
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      navigation.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }

    function toggleMenu() {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    menuToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleMenu();
    });


    /* -------------------------------------------------------
       CLOSE MENU WHEN A NAVIGATION LINK IS CLICKED
       ------------------------------------------------------- */

    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {
      link.addEventListener("click", function () {

        if (window.innerWidth <= 900) {
          closeMenu();
        }

      });
    });


    /* -------------------------------------------------------
       CLOSE MENU WHEN CLICKING OUTSIDE
       ------------------------------------------------------- */

    document.addEventListener("click", function (event) {

      if (
        window.innerWidth <= 900 &&
        navigation.classList.contains("nav-open") &&
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    });


    /* -------------------------------------------------------
       CLOSE MENU WITH ESCAPE KEY
       ------------------------------------------------------- */

    document.addEventListener("keydown", function (event) {

      if (
        event.key === "Escape" &&
        navigation.classList.contains("nav-open")
      ) {
        closeMenu();
        menuToggle.focus();
      }

    });


    /* -------------------------------------------------------
       RESET NAVIGATION WHEN SCREEN SIZE CHANGES
       ------------------------------------------------------- */

    window.addEventListener("resize", function () {

      if (window.innerWidth > 900) {
        closeMenu();
      }

    });

  }


  /* =======================================================
     CURRENT YEAR IN FOOTER
     ======================================================= */

  const yearElements = document.querySelectorAll(
    ".current-year"
  );

  const currentYear = new Date().getFullYear();

  yearElements.forEach(function (element) {
    element.textContent = currentYear;
  });


  /* =======================================================
     ACTIVE NAVIGATION PAGE
     ======================================================= */

  const currentPath =
    window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(function (link) {

    const linkHref = link
      .getAttribute("href")
      ?.split("#")[0];

    if (!linkHref) {
      return;
    }

    if (
      linkHref === currentPath ||
      (
        currentPath === "" &&
        linkHref === "index.html"
      )
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }

  });


  /* =======================================================
     SMOOTH SCROLL FOR SAME-PAGE LINKS
     ======================================================= */

  const anchorLinks =
    document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId = link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     BASIC FORM SUBMISSION PROTECTION
     Prevent accidental repeated clicks after submission
     ======================================================= */

  const forms = document.querySelectorAll("form");

  forms.forEach(function (form) {

    form.addEventListener("submit", function () {

      const submitButton =
        form.querySelector(
          'button[type="submit"], input[type="submit"]'
        );

      if (!submitButton) {
        return;
      }

      setTimeout(function () {

        submitButton.disabled = true;

        if (submitButton.tagName === "BUTTON") {

          submitButton.dataset.originalText =
            submitButton.textContent;

          submitButton.textContent =
            "Sending...";

        } else {

          submitButton.dataset.originalValue =
            submitButton.value;

          submitButton.value =
            "Sending...";

        }

      }, 10);


      /*
       Re-enable after 10 seconds in case the browser
       remains on the page because of a connection issue.
      */

      setTimeout(function () {

        submitButton.disabled = false;

        if (
          submitButton.tagName === "BUTTON" &&
          submitButton.dataset.originalText
        ) {

          submitButton.textContent =
            submitButton.dataset.originalText;

        }

        if (
          submitButton.tagName === "INPUT" &&
          submitButton.dataset.originalValue
        ) {

          submitButton.value =
            submitButton.dataset.originalValue;

        }

      }, 10000);

    });

  });

});
