'use strict';

function anchorscroll() {
    var speed = arguments.length <= 0 || arguments[0] === undefined ? 0.5 : arguments[0];
    var selector = arguments.length <= 1 || arguments[1] === undefined ? '.anchorscroll' : arguments[1];
    var offset = arguments.length <= 2 || arguments[2] === undefined ? 30 : arguments[2];

    // Request animation frame prefixes and fallback
    window.raf = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    // Get all requested selectors, and all links that are on-page hashes
    var anchors = [].slice.apply(document.querySelectorAll(selector)),
        links = [].slice.apply(document.querySelectorAll('a')),
        hashes = links.filter(function (x) {
        return x.getAttribute('href').charAt(0) === '#';
    });

    // Add event listeners to all selectors on page
    for (var i = 0; i < hashes.length; i++) {

        (function (num) {
            hashes[num].addEventListener('click', function (e) {
                e.preventDefault();
                var hash = hashes[num].getAttribute('href'),
                    match = anchors.filter(function (x) {
                    return '#' + x.id === hash;
                }),
                    position = window.pageYOffset,
                    top = match[0].offsetTop;

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
                    if (top <= position + offset) {
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
