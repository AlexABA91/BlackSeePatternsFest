document.addEventListener('DOMContentLoaded', function () {
	// Плавный скролл по секциям
	const sectionsContainer = document.querySelector('.sections-container')
	if (sectionsContainer) {
		const sections = document.querySelectorAll('.section')
		let currentIndex = 0
		let isScrolling = false
		let touchStartY = 0 // Начальная позиция касания по Y

		// Функция для прокрутки к определенной секции
		const scrollToSection = index => {
			if (index >= 0 && index < sections.length) {
				sectionsContainer.style.transform = `translateY(-${index * 100}vh)`
				currentIndex = index
			}
		}

		// Функция для выполнения скролла и установки задержки
		const performScroll = newIndex => {
			if (isScrolling) return
			isScrolling = true

			scrollToSection(newIndex)

			// Блокировка прокрутки на время анимации
			setTimeout(() => {
				isScrolling = false
			}, 600) // Должно совпадать с длительностью CSS transition
		}

		// Обработчик события прокрутки колесом мыши
		const handleWheel = event => {
			// event.preventDefault() убрано отсюда, чтобы не блокировать стандартное поведение, если условия не выполнены
			if (isScrolling) {
				event.preventDefault()
				return
			}

			event.preventDefault()

			if (event.deltaY > 0) {
				// Прокрутка вниз
				if (currentIndex < sections.length - 1) {
					performScroll(currentIndex + 1)
				}
			} else {
				// Прокрутка вверх
				if (currentIndex > 0) {
					performScroll(currentIndex - 1)
				}
			}
		}

		// Обработчик начала касания
		const handleTouchStart = event => {
			if (isScrolling) return
			touchStartY = event.touches[0].clientY
		}

		// Обработчик движения пальца
		const handleTouchMove = event => {
			if (isScrolling) {
				event.preventDefault()
				return
			}

			const touchCurrentY = event.touches[0].clientY
			const deltaY = touchStartY - touchCurrentY

			// Определяем свайп и его направление
			if (Math.abs(deltaY) > 50) {
				// Порог для срабатывания свайпа
				event.preventDefault()
				if (deltaY > 0) {
					// Свайп вверх (прокрутка вниз)
					if (currentIndex < sections.length - 1) {
						performScroll(currentIndex + 1)
					}
				} else {
					// Свайп вниз (прокрутка вверх)
					if (currentIndex > 0) {
						performScroll(currentIndex - 1)
					}
				}
				// Сбрасываем начальную позицию, чтобы избежать многократных срабатываний
				touchStartY = touchCurrentY
			}
		}

		// Привязка событий
		sectionsContainer.addEventListener('wheel', handleWheel, { passive: false })
		sectionsContainer.addEventListener('touchstart', handleTouchStart, {
			passive: false,
		})
		sectionsContainer.addEventListener('touchmove', handleTouchMove, {
			passive: false,
		})

		// Инициализация первой секции
		scrollToSection(0)
	}
})
