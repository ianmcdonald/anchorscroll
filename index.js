'use strict';

const anchorscroll = (speed = 0.5, selector = '.anchorscroll', offset = 30) => {

  // Request animation frame prefixes and fallback
  window.raf = (function() {
    return window.requestAnimationFrame    ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  // Get all requested selectors, and all links that are on-page hashes
  let anchors = [].slice.apply(document.querySelectorAll(selector)),
      links   = [].slice.apply(document.querySelectorAll('a')),
      hashes  = links.filter(x => x.getAttribute('href').charAt(0) === '#');

  // Add event listeners to all selectors on page
  for (let i = 0; i < hashes.length; i++) {

    ((num) => {
      hashes[num].addEventListener('click', (e) => {
        e.preventDefault();
        let hash     = hashes[num].getAttribute('href'),
            match    = anchors.filter(x => `#${x.id}` === hash),
            position = window.pageYOffset,
            top      = match[0].offsetTop;

        function scrollDown() {
          // Handle scrolling down to anchor
          if (top >= position + offset) {
            window.scrollTo(0, position);
            position += speed * 50;
            raf(scrollDown);
          }                    
        }

        function scrollUp() {
          // Handle scrolling up to anchor
          if (top <= position  + offset) {
            window.scrollTo(0, position);
            position -= speed * 50;
            raf(scrollUp);
          }                    
        }

        top >= position ? scrollDown() : scrollUp();

      }, false);

    })(i);
  };
} 

module.exports = anchorscroll;
