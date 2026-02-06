document.addEventListener('DOMContentLoaded', () => {
	const modalOverlay = document.getElementById('infoModalOverlay')
	const openButtons = document.querySelectorAll('.info-button')
	const closeButton = document.querySelector('.modal-close')
	const okButton = document.querySelector('.modal-ok')

	const openModal = () => {
		if (!modalOverlay) return
		modalOverlay.classList.add('active')
		document.body.style.overflow = 'hidden'
	}

	const closeModal = () => {
		if (!modalOverlay) return
		modalOverlay.classList.remove('active')
		document.body.style.overflow = ''
	}

	openButtons.forEach(button => button.addEventListener('click', openModal))

	closeButton?.addEventListener('click', closeModal)
	okButton?.addEventListener('click', () => {
		closeModal()
		window.location.href = 'registration.html'
	})

	modalOverlay?.addEventListener('click', event => {
		if (event.target === modalOverlay) {
			closeModal()
		}
	})
})
