import { initRegistrationValidation } from './registrationValidation.js'

document.addEventListener('DOMContentLoaded', () => {
	const amateurRadio = document.getElementById('teamLevelAmateur')
	const proRadio = document.getElementById('teamLevelPro')
	const organizationField = document.getElementById('organizationField')
	const regForm = document.getElementById('regForm')
	const performancesContainer = document.getElementById('performancesContainer')
	const addPerformanceBtn = document.getElementById('addPerformanceBtn')

	if (
		!amateurRadio ||
		!proRadio ||
		!organizationField ||
		!performancesContainer
	) {
		return
	}

	const updateOrganizationVisibility = () => {
		organizationField.classList.toggle('is-hidden', amateurRadio.checked)
	}

	const renderParticipantsFields = (container, count) => {
		container.classList.remove('has-items')
		container.innerHTML = ''

		if (![1, 2, 3].includes(count)) {
			return
		}

		const title = document.createElement('label')
		title.className = 'control-label mb-2 d-block'
		title.textContent = 'Participants:'
		container.appendChild(title)

		for (let i = 1; i <= count; i += 1) {
			const group = document.createElement('div')
			group.className = 'participant-item mb-2'

			const caption = document.createElement('div')
			caption.className = 'small fw-bold mb-1'
			caption.textContent = `Participant ${i}`
			group.appendChild(caption)

			const row = document.createElement('div')
			row.className = 'row align-items-center'
			row.innerHTML = `
				<div class="col-12 col-md-4">
					<input type="text" class="form-control mb-1 js-participant-last-name" placeholder="Last name" />
				</div>
				<div class="col-12 col-md-4">
					<input type="text" class="form-control mb-1 js-participant-first-name" placeholder="First name" />
				</div>
				<div class="col-12 col-md-4">
					<input type="text" class="form-control" placeholder="Patronymic" />
				</div>
			`

			group.appendChild(row)
			container.appendChild(group)
		}

		requestAnimationFrame(() => {
			container.classList.add('has-items')
		})
	}

	const assignPerformanceIds = (performanceBlock, index) => {
		const wingRadio = performanceBlock.querySelector('.js-start-wing')
		const spotRadio = performanceBlock.querySelector('.js-start-spot')
		const wingLabel = performanceBlock.querySelector('.js-start-wing-label')
		const spotLabel = performanceBlock.querySelector('.js-start-spot-label')

		if (!wingRadio || !spotRadio || !wingLabel || !spotLabel) {
			return
		}

		const wingId = `startWing_${index}`
		const spotId = `startSpot_${index}`

		wingRadio.id = wingId
		spotRadio.id = spotId
		wingRadio.name = `startPoint_${index}`
		spotRadio.name = `startPoint_${index}`

		wingLabel.setAttribute('for', wingId)
		spotLabel.setAttribute('for', spotId)
	}

	const reindexPerformanceBlocks = () => {
		performancesContainer
			.querySelectorAll('.performance-block')
			.forEach((block, index) => {
				assignPerformanceIds(block, index + 1)

				const removeBtn = block.querySelector('.js-remove-performance')
				if (removeBtn) {
					removeBtn.classList.toggle('d-none', index === 0)
				}
			})
	}

	const bindPerformanceBlock = performanceBlock => {
		const blockIndex =
			Array.from(
				performancesContainer.querySelectorAll('.performance-block'),
			).indexOf(performanceBlock) + 1

		assignPerformanceIds(performanceBlock, blockIndex)

		const concertmasterNoneCheckbox = performanceBlock.querySelector(
			'.js-concertmaster-none',
		)
		const concertmasterFields = performanceBlock.querySelector(
			'.concertmaster-fields',
		)
		const concertmasterInputs = concertmasterFields
			? Array.from(concertmasterFields.querySelectorAll('input[type="text"]'))
			: []

		const updateConcertmasterFieldsState = () => {
			if (!concertmasterNoneCheckbox || concertmasterInputs.length === 0) {
				return
			}

			const isDisabled = concertmasterNoneCheckbox.checked
			concertmasterInputs.forEach(input => {
				input.disabled = isDisabled
				if (isDisabled) {
					input.value = ''
				}
			})
		}

		const participantsSelect = performanceBlock.querySelector(
			'.js-participants-select',
		)
		const participantsFieldsContainer = performanceBlock.querySelector(
			'.participants-fields',
		)

		const updateParticipantsFields = () => {
			if (!participantsSelect || !participantsFieldsContainer) {
				return
			}

			renderParticipantsFields(
				participantsFieldsContainer,
				Number(participantsSelect.value),
			)
		}

		updateConcertmasterFieldsState()
		updateParticipantsFields()

		concertmasterNoneCheckbox?.addEventListener(
			'change',
			updateConcertmasterFieldsState,
		)
		participantsSelect?.addEventListener('change', updateParticipantsFields)
	}

	const createPerformanceBlock = () => {
		const firstBlock = performancesContainer.querySelector('.performance-block')
		if (!firstBlock) {
			return null
		}

		const newBlock = firstBlock.cloneNode(true)

		newBlock.querySelectorAll('input').forEach(input => {
			if (input.type === 'radio') {
				input.checked = input.classList.contains('js-start-wing')
				return
			}

			if (input.type === 'checkbox') {
				input.checked = false
				return
			}

			if (input.type !== 'file') {
				input.value = ''
			}

			input.disabled = false
		})

		newBlock.querySelectorAll('select').forEach(select => {
			select.value = ''
		})

		const participantsFieldsContainer = newBlock.querySelector(
			'.participants-fields',
		)
		if (participantsFieldsContainer) {
			participantsFieldsContainer.innerHTML = ''
			participantsFieldsContainer.classList.remove('has-items')
		}

		const removeBtn = newBlock.querySelector('.js-remove-performance')
		if (removeBtn) {
			removeBtn.classList.remove('d-none')
		}

		return newBlock
	}

	updateOrganizationVisibility()
	amateurRadio.addEventListener('change', updateOrganizationVisibility)
	proRadio.addEventListener('change', updateOrganizationVisibility)

	performancesContainer
		.querySelectorAll('.performance-block')
		.forEach(bindPerformanceBlock)
	reindexPerformanceBlocks()

	performancesContainer.addEventListener('click', event => {
		const target = event.target
		if (!(target instanceof Element)) {
			return
		}

		const removeBtn = target.closest('.js-remove-performance')
		if (!removeBtn) {
			return
		}

		const performanceBlock = removeBtn.closest('.performance-block')
		if (!performanceBlock) {
			return
		}

		const allBlocks = Array.from(
			performancesContainer.querySelectorAll('.performance-block'),
		)
		if (allBlocks.length <= 1 || allBlocks[0] === performanceBlock) {
			return
		}

		performanceBlock.remove()
		reindexPerformanceBlocks()
	})

	addPerformanceBtn?.addEventListener('click', () => {
		const newBlock = createPerformanceBlock()
		if (!newBlock) {
			return
		}

		performancesContainer.appendChild(newBlock)
		bindPerformanceBlock(newBlock)
		reindexPerformanceBlocks()
	})

	initRegistrationValidation({ regForm, performancesContainer })
})
