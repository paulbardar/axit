let objectFitPoly = false;
let loadLazyLoadScript = false;

document.addEventListener('DOMContentLoaded', function(){
	loadFonts();
	supportPolyfills();
	correctVh();
	lazyLoad();
});

// load fonts
function loadFonts() {
	WebFont.load({
		custom: {
			families: ['Font Awesome 5 Brands'],
			urls: ['css/fonts.css']
		},
		google: {
			families: ['Open+Sans:400,600,700,regular', 'Raleway:100,300,400,700,regular']
		}
	});
}

// lazyLoad Images
function lazyLoad() {
	if ('loading' in HTMLImageElement.prototype) {
		var images = document.querySelectorAll('img.lazyload');
		images.forEach(function (img) {
			img.src = img.dataset.src;
			img.onload = function() {
				img.classList.add('lazyloaded');
			};
			if (img.classList.contains('svg-html')) {
				replaseInlineSvg(img);
			}
			if (img.classList.contains('lazyload-bg')) {
				img.style.display = "none";
				img.parentNode.style.backgroundImage = "url(" + img.dataset.src + ")";
			}
		});
	} else {
		if (!loadLazyLoadScript) {
			loadLazyLoadScript = true;
			var script = document.createElement("script");
			script.async = true;
			script.src = 'js/lazysizes.min.js';
			document.body.appendChild(script);
		}
		document.addEventListener('lazyloaded', function (e) {
			var img = e.target;
			if (img.classList.contains('lazyload-bg')) {
				img.style.display = 'none';
				img.parentNode.style.backgroundImage = 'url(' + img.dataset.src + ')';
			}
			if (img.classList.contains('svg-html')) {
				replaseInlineSvg(img);
			}
		});
	}
}

// replaseInlineSvg
function replaseInlineSvg(el) {
	const imgID = el.getAttribute('id');
	const imgClass = el.getAttribute('class');
	const imgURL = el.getAttribute('src');

	fetch(imgURL)
		.then(data => data.text())
		.then(response => {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(response, 'text/html');
			let svg = xmlDoc.querySelector('svg');

			if (typeof imgID !== 'undefined') {
				svg.setAttribute('id', imgID);
			}

			if (typeof imgClass !== 'undefined') {
				svg.setAttribute('class', imgClass + ' replaced-svg');
			}

			svg.removeAttribute('xmlns:a');

			el.parentNode.replaceChild(svg, el);
	});
}

// correctVh
function correctVh() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh+'px');
}

// support and polyfills
function supportPolyfills() {
	// objectFit
	if('objectFit' in document.documentElement.style === false && !objectFitPoly) {
		const script = document.createElement('script');

		script.src = '/js/ofi.min.js';
		document.body.appendChild(script);
		script.onload = function () {
			objectFitPoly = true;
			objectFitImages();
		};
	}

	// forEach
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	// swiper 6 polyfills
	Number.isNaN = Number.isNaN || function isNaN(input) {
		return typeof input === 'number' && input !== input;
	}

	if (!String.prototype.repeat) {
		String.prototype.repeat = function(count) {
			'use strict';
			if (this == null)
				throw new TypeError('can\'t convert ' + this + ' to object');

			var str = '' + this;
			count = +count;
			if (count != count)
				count = 0;

			if (count < 0)
				throw new RangeError('repeat count must be non-negative');

			if (count == Infinity)
				throw new RangeError('repeat count must be less than infinity');

			count = Math.floor(count);
			if (str.length == 0 || count == 0)
				return '';

			if (str.length * count >= 1 << 28)
				throw new RangeError('repeat count must not overflow maximum string size');

			var maxCount = str.length * count;
			count = Math.floor(Math.log(count) / Math.log(2));
			while (count) {
				str += str;
				count--;
			}
			str += str.substring(0, maxCount - str.length);
			return str;
		}
	}
	// swiper 6 polyfills end
};

// Create Fader span
const faderSpan = document.createElement('span');
	faderSpan.className = 'fader';
	headerMain = document.querySelector('#header');
	headerMain.appendChild(faderSpan);

// mobile menu
function mobileMenu() {
	const openBtn = document.querySelector('.open-menu'),
		menuItem = document.querySelectorAll('.menu-link'),
		fader = document.querySelector('.fader');

	openBtn.addEventListener('click', function(event) {
		event.preventDefault();
		if ( document.body.classList.contains('menu-opened') ) {
			document.body.classList.remove('menu-opened');
		} else {
			document.body.classList.add('menu-opened');
		}
	});
	fader.addEventListener('click', function(){
		document.body.classList.toggle('menu-opened');
	});
	for (let i = 0; i < menuItem.length; i++) {
		menuItem[i].addEventListener('click', function(event) {
			if ( document.body.classList.contains('menu-opened') ) {
				document.body.classList.remove('menu-opened');
			}
		});
	}
};





// Tabs
const jsTrigger = document.querySelectorAll('.js-tab-trigger');

jsTrigger.forEach(function(trigger) {
	trigger.addEventListener('click', function() {
		let id = this.getAttribute('data-tab'),
			content = document.querySelector('.js-tab-content[data-tab="'+id+'"]'),
			activeTrigger = document.querySelector('.js-tab-trigger.active'),
			activeContent = document.querySelector('.js-tab-content.active');

			activeTrigger.classList.remove('active');
			trigger.classList.add('active');
			activeContent.classList.remove('active');
			content.classList.add('active');
	});
});


// jQuery
(function($){
	'use strict';

	// animateHeaderOnScroll
	function animateHeaderOnScroll() {
		var $header = $('#header');
		var lastScrollTop = 0;

		$(window).on('scroll resize', checkHeaderState);

		function checkHeaderState() {
			var scrolled_class = 'scrolled';
			var UP_CLASS = 'up';
			var $body = $('body');
			var st = $(window).scrollTop();

			if (st > $header.outerHeight()) {
				$body.addClass(scrolled_class);
			} else {
				$body.removeClass(scrolled_class);
			}
			if (st < lastScrollTop) {
				$body.addClass(UP_CLASS);
			} else {
				$body.removeClass(UP_CLASS);
			}
			lastScrollTop = st;
		}
	}




	$(document).ready(function() {
		animateHeaderOnScroll();
		mobileMenu();
		$('#trialform').validate();
	}); // ready

	$(window).on('resize', function() {
	}); // resize

	$(window).on('load', function() {
	}); // load

	// functions
})(this.jQuery);
