document.addEventListener('DOMContentLoaded', function () {
	// Плавный скролл по секциям
	const sectionsContainer = document.querySelector('.sections-container')
	if (sectionsContainer) {
		const sections = document.querySelectorAll('.section')
		let currentIndex = 0
		let isScrolling = false

		// Функция для прокрутки к определенной секции
		const scrollToSection = index => {
			if (index >= 0 && index < sections.length) {
				sectionsContainer.style.transform = `translateY(-${index * 100}vh)`
				currentIndex = index
			}
		}

		// Обработчик события прокрутки
		const handleWheel = event => {
			if (isScrolling) return

			event.preventDefault()

			isScrolling = true

			if (event.deltaY > 0) {
				// Прокрутка вниз
				if (currentIndex < sections.length - 1) {
					scrollToSection(currentIndex + 1)
				}
			} else {
				// Прокрутка вверх
				if (currentIndex > 0) {
					scrollToSection(currentIndex - 1)
				}
			}

			// Блокировка прокрутки на время анимации
			setTimeout(() => {
				isScrolling = false
			}, 600) // Должно совпадать с длительностью CSS transition
		}

		// Привязка события к контейнеру
		sectionsContainer.addEventListener('wheel', handleWheel, { passive: false })

		// Инициализация первой секции
		scrollToSection(0)
	}
})
