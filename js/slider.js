document.addEventListener('DOMContentLoaded', function () {
	const sliderSection = document.querySelector('.slider-section')
	if (!sliderSection) return

	const images = [
		'img/gall/Gusak Artem 01586_11zon.webp',
		'img/gall/Gusak Artem 01624_1_11zon.webp',
		'img/gall/Gusak Artem 07012_2_11zon.webp',
		'img/gall/Gusak Artem 07194_3_11zon.webp',
		'img/gall/Gusak Artem 07678_4_11zon.webp',
		'img/gall/Gusak Artem 12644_5_11zon.webp',
		'img/gall/Gusak Artem 14772_6_11zon.webp',
		'img/gall/Gusak Artem 15245_7_11zon.webp',
		'img/gall/Gusak Artem 17729_8_11zon.webp',
		'img/gall/Gusak Artem 18773_9_11zon.webp',
		'img/gall/Gusak Artem 26611_10_11zon.webp',
		'img/gall/Gusak Artem 32367_11_11zon.webp',
		'img/gall/Gusak-Artem-33234_12_11zon.webp',
		'img/gall/Gusak-Artem-34109_13_11zon.webp',
		'img/gall/Gusak-Artem-34976_14_11zon.webp',
		'img/gall/Gusak-Artem-35744_15_11zon.webp',
		'img/gall/Gusak-Artem-35921_16_11zon.webp',
		'img/gall/Gusak-Artem-36052_17_11zon.webp',
		'img/gall/Gusak-Artem-44553_18_11zon.webp',
		'img/gall/Gusak-Artem-48247_19_11zon.webp',
	]

	const sliderImage = document.getElementById('sliderImage')
	const prevBtn = document.getElementById('prevBtn')
	const nextBtn = document.getElementById('nextBtn')

	const fullscreenOverlay = document.getElementById('fullscreen-overlay')
	const fullscreenImage = document.getElementById('fullscreen-image')

	let currentIndex = 0
	let touchStartX = 0
	let touchStartY = 0

	function updateSlider() {
		if (sliderImage) {
			const imageUrl = `url('${images[currentIndex]}')`
			sliderImage.style.backgroundImage = imageUrl
		}

		if (prevBtn) {
			const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
			const prevImageUrl = `url('${images[prevIndex]}')`
			prevBtn.style.backgroundImage = prevImageUrl
			prevBtn.style.backgroundSize = 'cover'
			prevBtn.style.backgroundPosition = 'center'
		}

		if (nextBtn) {
			const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
			const nextImageUrl = `url('${images[nextIndex]}')`
			nextBtn.style.backgroundImage = nextImageUrl
			nextBtn.style.backgroundSize = 'cover'
			nextBtn.style.backgroundPosition = 'center'
		}
	}

	if (prevBtn) {
		prevBtn.addEventListener('click', () => {
			currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
			updateSlider()
		})
	}

	if (nextBtn) {
		nextBtn.addEventListener('click', () => {
			currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
			updateSlider()
		})
	}

	// --- ЛОГИКА СВАЙПОВ И КЛИКОВ НА ИЗОБРАЖЕНИИ ---
	if (sliderImage) {
		sliderImage.addEventListener(
			'touchstart',
			e => {
				// Проверяем, что событие не на кнопках
				if (e.target === prevBtn || e.target === nextBtn) return
				touchStartX = e.touches[0].clientX
				touchStartY = e.touches[0].clientY
			},
			{ passive: true }
		)

		sliderImage.addEventListener(
			'touchmove',
			e => {
				if (!touchStartX || !touchStartY) return

				const deltaX = e.touches[0].clientX - touchStartX
				const deltaY = e.touches[0].clientY - touchStartY

				if (Math.abs(deltaX) > Math.abs(deltaY)) {
					// Горизонтальный свайп - предотвращаем скролл страницы
					e.preventDefault()
					e.stopPropagation()

					const swipeThreshold = 50

					if (deltaX < -swipeThreshold) {
						currentIndex =
							currentIndex < images.length - 1 ? currentIndex + 1 : 0
						updateSlider()
						touchStartX = 0
						touchStartY = 0
					} else if (deltaX > swipeThreshold) {
						currentIndex =
							currentIndex > 0 ? currentIndex - 1 : images.length - 1
						updateSlider()
						touchStartX = 0
						touchStartY = 0
					}
				}
			},
			{ passive: false }
		)

		sliderImage.addEventListener('dblclick', () => {
			if (fullscreenOverlay && fullscreenImage) {
				fullscreenImage.src = images[currentIndex]
				fullscreenOverlay.classList.add('active')
			}
		})
	}

	if (fullscreenOverlay) {
		fullscreenOverlay.addEventListener('click', () => {
			fullscreenOverlay.classList.remove('active')
		})
	}

	// Initial load
	updateSlider()
})
