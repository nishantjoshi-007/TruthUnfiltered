'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // Element toggle function
  const elemToggleFunc = function(elem) {
    elem.classList.toggle("active");
  };

  // Navbar functionality
  const navbar = document.querySelector("[data-navbar]");
  const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const navElemArr = [navToggleBtn, overlay];
  navElemArr.forEach(elem => {
    elem.addEventListener("click", function() {
      elemToggleFunc(navbar);
      elemToggleFunc(overlay);
    });
  });

  // Header sticky functionality
  const header = document.querySelector("[data-header]");
  let lastScrollPosition = 0;
  window.addEventListener("scroll", function() {
    let scrollPosition = window.pageYOffset;
    if (scrollPosition > lastScrollPosition) {
      header.classList.remove("active");
    } else {
      header.classList.add("active");
    }
    lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;
  });

  // Form validation
  const input = document.querySelector("[data-input]");
  const submitBtn = document.querySelector("[data-submit]");
  input.addEventListener("input", function() {
    submitBtn.disabled = !input.checkValidity();
  });

  // Audio player functions
  function toggleAudioPlayer() {
    var audioPlayer = document.getElementById('audioPlayer');
    var closeButton = document.getElementById('audioPlayerClose');
    audioPlayer.style.display = audioPlayer.style.display === 'none' ? 'block' : 'none';
    closeButton.style.display = closeButton.style.display === 'none' ? 'block' : 'none';
    if (audioPlayer.style.display === 'block' && audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }

  function closeAudioPlayer() {
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioPlayer.style.display = 'none';
    document.getElementById('audioPlayerClose').style.display = 'none';
  }

  document.getElementById('listenNowBtn').addEventListener('click', toggleAudioPlayer);
  document.getElementById('audioPlayerClose').addEventListener('click', closeAudioPlayer);

  // Episode content definitions
  const episodeContent = {
    '1': {
      title: 'Navigating the Digital Jungle',
      description: 'The Truth Unfiltered podcast hosts tackle the pressing issue of misinformation on social media, exploring its impact on public opinion and the delicate balance of censorship. Our team brings diverse insights into how algorithms shape our reality and the steps we can take to discern fact from fiction. Tune in to gain a deeper understanding and arm yourself with the knowledge to navigate the complex digital landscape.',
      audioSrc: './assets/content/podcast1.mp3',
      showNotesSrc: './assets/content/shownotes1.pdf',
      imageSrc: './assets/images/hero-title.png',
      bannerImageSrc: './assets/images/podcast-1.png'
    },
    '2': {
      title: 'Guarding Secrets in the Age of Surveillance',
      description: 'The Truth Unfiltered podcast hosts tackle the pressing issue of data usage and privacy, exploring the impact of the Chinese social credit system and the similarities that it shares with the Black Mirror episode Nosedive. With a discussion on how current data is being used and the possible rights violations. Tune in to gain a deeper understanding and arm yourself with the knowledge to navigate the complex digital landscape.',
      audioSrc: './assets/content/podcast2.mp3',
      showNotesSrc: './assets/content/shownotes2.pdf',
      imageSrc: './assets/images/hero-title.png',
      bannerImageSrc: './assets/images/podcast-2.png'
    }
  };

  function updateHeroContent(content) {
    const heroContent = document.querySelector('.hero-content');
    const heroText = heroContent.querySelector('.hero-text');
    const heroBtnGroup = heroContent.querySelector('.hero-btn-group');
    const heroBanner = document.querySelector('.hero-banner');
    const showNotesLink = document.querySelector('.hero-btn-group a.btn');
    const audioPlayer = document.getElementById('audioPlayer');
  
    heroText.textContent = content.description;
    heroBanner.style.backgroundImage = `url(${content.bannerImageSrc})`;
    heroBtnGroup.style.display = 'flex';
  
    // Update source
    audioPlayer.src = content.audioSrc;
    showNotesLink.href = content.showNotesSrc;
  }
  

  // Event listeners for podcast cards to include showing the buttons
  const podcastCards = document.querySelectorAll('.podcast-card');
  podcastCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent the default action
      const episodeNum = this.getAttribute('data-episode');
      const content = episodeContent[episodeNum];
      updateHeroContent(content); // Update the hero content
      // Set the audio source here, but don't automatically play
      document.getElementById('audioPlayer').src = content.audioSrc;
      // Ensure the audio player and close button are hidden initially
      document.getElementById('audioPlayer').style.display = 'none';
      document.getElementById('audioPlayerClose').style.display = 'none';
    });
  });

  // Go top button functionality
  const goTopBtn = document.querySelector("[data-go-top]");
  window.addEventListener("scroll", function() {
    window.scrollY >= 200 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");
  });

  const defaultContent = {
    description: "Dive into the heart of social media's misinformation maze: Unravel the truth, challenge algorithms, and reclaim your digital discernment in our latest episode.",
    bannerImageSrc: './assets/images/hero-banner.png'
  };

  // Function to set the hero content and banner to their default states
  function resetToDefaultContent() {
    const heroText = document.querySelector('.hero-content .hero-text');
    const heroBanner = document.querySelector('.hero-banner');
    const heroBtnGroup = document.querySelector('.hero-content .hero-btn-group');

    heroText.textContent = defaultContent.description;
    heroBanner.style.backgroundImage = `url(${defaultContent.bannerImageSrc})`;
    heroBtnGroup.style.display = 'none';
    closeAudioPlayer();
  }

  // Add event listener to the "Home" link to reset the hero content and banner
  const homeLink = document.querySelector('.navbar-list .navbar-link[href="#hero"]');
  homeLink.addEventListener('click', resetToDefaultContent);

});