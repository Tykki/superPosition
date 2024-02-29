

	var	$window = window,
		$body = document.querySelector('body'),
		$wrapper = document.querySelector('#wrapper'),
		$header = document.querySelector('#header'),
		$banner = document.querySelector('#banner');


	// Play initial animations on page load.
		$window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

	// Clear transitioning state on unload/hide.
		$window.addEventListener('unload pagehide', function() {
			window.setTimeout(function() {
				document.querySelector('.is-transitioning').removeClass('is-transitioning');
			}, 250);
		});

	// Fix: Enable IE-only tweaks.
		if (navigator.name == 'ie' || navigator.name == 'edge')
			$body.classList.add('is-ie');


	// Tiles.
		var $tiles = document.querySelectorAll('.tiles > article');

		$tiles.forEach( (tile) => {
			var $this = (tile),
				$image = $this.querySelector('.image'), $img = $image.querySelector('img'),
				$link = $this.querySelector('.link'),
				x;

			// Image.

				// Set image.
					$this.style.backgroundImage = 'url('+ '"' + $img.src + '"' + ')';

				// Set position.
					// if (x = $img.data('position'))
						// $image.css('background-position', x);

				// Hide original.
					// $image.hide();

			// Link.
			if ($link.length > 0) {

				$x = $link.cloneNode()
					.innerText('')
					.classList.add('primary')
					$this.appendChild($x);

				$link = $link.appendChild($x);

				$link.addEventListener('click', function(event) {

					var href = $link.href;

					// Prevent default.
						event.stopPropagation();
						event.preventDefault();

					// Target blank?
						if ($link.attr.target == '_blank') {

							// Open in new tab.
								window.open(href);

						}

					// Otherwise ...
						else {

							// Start transitioning.
								$this.classList.add('is-transitioning');
								$wrapper.classList.add('is-transitioning');

							// Redirect.
								window.setTimeout(function() {
									location.href = href;
								}, 500);

						}

				});

			}

		});

	// // Header.
	// 	if ($banner.length > 0
	// 	&&	$header.classList.contains('alt')) {

	// 		$window.addEventListener('resize', function() {
	// 			$window.trigger('scroll');
	// 		});

	// 		$window.on('load', function() {

	// 			window.setTimeout(function() {
	// 				$window.triggerHandler('scroll');
	// 			}, 100);

	// 		});

	// 	}



	// Menu.
		var $menu = document.querySelector('#menu'),
			$menuInner;

		$menu.innerHTML = '<div class="inner">'+ $menu.innerHTML + '</div>'
		$menuInner = $menu.querySelector('.inner');
		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.classList.add('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.classList.remove('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.classList.toggle('is-menu-visible');

		};

		$menuInner
			.addEventListener('click', function(event) {
				event.stopPropagation();
			})
			$menuInner.querySelector('a').addEventListener('click', function(event) {

				var href = document.querySelector(this).href;

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					window.setTimeout(function() {
						window.location.href = href;
					}, 250);

			});

		$body.appendChild($menu)
			$menu.addEventListener('click', function(event) {

				event.stopPropagation();
				event.preventDefault();

				$body.classList.remove('is-menu-visible');

			})
			const close = document.createElement('a')
			close.innerHTML = 'Close'
			close.classList.add('close')
			close.href = '#menu' 
			$menu.appendChild(close);

		$body.querySelector('a[href="#menu"]')
			.addEventListener('click', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			$body.querySelector('a[href="#menu"]')
				.addEventListener('click', function(event) {

				// Hide.
					$menu._hide();

			})
			$body.querySelector('a[href="#menu"]')
				.addEventListener('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});
