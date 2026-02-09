import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1.6.1/+esm'

const validationSchema = yup.object({
	teamName: yup.string().trim().required('Team name is required'),
	leaderLastName: yup
		.string()
		.trim()
		.required('Team leader last name is required'),
	leaderFirstName: yup
		.string()
		.trim()
		.required('Team leader first name is required'),
	email: yup
		.string()
		.trim()
		.email('Invalid email format')
		.required('Email is required'),
	phone: yup
		.string()
		.trim()
		.matches(/^\+?[0-9]{10,15}$/, 'Invalid phone format')
		.required('Phone number is required'),
})

const clearFieldError = field => {
	field.classList.remove('is-invalid')
	const feedback = field.parentElement?.querySelector(
		'.invalid-feedback.dynamic-error',
	)
	feedback?.remove()
}

const setFieldError = (field, message) => {
	field.classList.add('is-invalid')

	let feedback = field.parentElement?.querySelector(
		'.invalid-feedback.dynamic-error',
	)
	if (!feedback) {
		feedback = document.createElement('div')
		feedback.className = 'invalid-feedback dynamic-error'
		field.parentElement?.appendChild(feedback)
	}

	feedback.textContent = message
}

const clearContainerError = container => {
	container.classList.remove('is-invalid')
	const feedback = container.querySelector('.invalid-feedback.dynamic-error')
	feedback?.remove()
}

const setContainerError = (container, message) => {
	container.classList.add('is-invalid')

	let feedback = container.querySelector('.invalid-feedback.dynamic-error')
	if (!feedback) {
		feedback = document.createElement('div')
		feedback.className = 'invalid-feedback dynamic-error d-block text-center'
		container.appendChild(feedback)
	}

	feedback.textContent = message
}

export const initRegistrationValidation = ({
	regForm,
	performancesContainer,
}) => {
	if (!regForm || !performancesContainer) {
		return
	}

	regForm.addEventListener('submit', async event => {
		event.preventDefault()

		const teamNameInput = document.getElementById('teamName')
		const teamLeaderLastNameInput =
			document.getElementById('teamLeaderLastName')
		const teamLeaderFirstNameInput = document.getElementById(
			'teamLeaderFirstName',
		)
		const emailInput = document.getElementById('mail')
		const phoneInput = document.getElementById('phone')
		const performanceNameInputs = Array.from(
			document.querySelectorAll('.performance-block .js-performance-name'),
		)
		const participantsSelects = Array.from(
			document.querySelectorAll('.performance-block .js-participants-select'),
		)
		const genreSelects = Array.from(
			document.querySelectorAll('.performance-block .js-genre-select'),
		)
		const ageGroupSelects = Array.from(
			document.querySelectorAll('.performance-block .js-age-group-select'),
		)
		const performanceTimeInputs = Array.from(
			document.querySelectorAll('.performance-block .js-performance-time'),
		)
		const choreographerLastNameInputs = Array.from(
			document.querySelectorAll(
				'.performance-block .js-choreographer-last-name',
			),
		)
		const choreographerFirstNameInputs = Array.from(
			document.querySelectorAll(
				'.performance-block .js-choreographer-first-name',
			),
		)
		const concertmasterLastNameInputs = Array.from(
			document.querySelectorAll(
				'.performance-block .js-concertmaster-last-name',
			),
		)
		const concertmasterFirstNameInputs = Array.from(
			document.querySelectorAll(
				'.performance-block .js-concertmaster-first-name',
			),
		)
		const soundtrackFileInputs = Array.from(
			document.querySelectorAll('.performance-block .js-soundtrack-file'),
		)
		const startPositionGroups = Array.from(
			document.querySelectorAll('.performance-block .js-start-position-group'),
		)

		const fields = [
			teamNameInput,
			teamLeaderLastNameInput,
			teamLeaderFirstNameInput,
			emailInput,
			phoneInput,
			...performanceNameInputs,
			...participantsSelects,
			...genreSelects,
			...ageGroupSelects,
			...performanceTimeInputs,
			...choreographerLastNameInputs,
			...choreographerFirstNameInputs,
			...concertmasterLastNameInputs,
			...concertmasterFirstNameInputs,
			...soundtrackFileInputs,
		].filter(Boolean)
		fields.forEach(clearFieldError)
		startPositionGroups.forEach(clearContainerError)

		let hasPerformanceNameErrors = false
		let hasParticipantsErrors = false
		let hasGenreErrors = false
		let hasAgeGroupErrors = false
		let hasPerformanceTimeErrors = false
		let hasParticipantNamesErrors = false
		let hasChoreographerNameErrors = false
		let hasConcertmasterNameErrors = false
		let hasSoundtrackFileErrors = false
		let hasStartPositionErrors = false

		performanceNameInputs.forEach(input => {
			if (!input.value.trim()) {
				setFieldError(input, 'Performance name is required')
				hasPerformanceNameErrors = true
			}
		})

		participantsSelects.forEach(select => {
			if (!select.value) {
				setFieldError(select, 'Participants number is required')
				hasParticipantsErrors = true
			}
		})

		genreSelects.forEach(select => {
			if (!select.value) {
				setFieldError(select, 'Genre is required')
				hasGenreErrors = true
			}
		})

		ageGroupSelects.forEach(select => {
			if (!select.value) {
				setFieldError(select, 'Age group is required')
				hasAgeGroupErrors = true
			}
		})

		performanceTimeInputs.forEach(input => {
			if (!input.value) {
				setFieldError(input, 'Performance time is required')
				hasPerformanceTimeErrors = true
			}
		})

		soundtrackFileInputs.forEach(input => {
			if (!input.value) {
				return
			}

			const fileName = (input.files?.[0]?.name ?? input.value).toLowerCase()
			if (!fileName.endsWith('.mp3')) {
				setFieldError(input, 'Only .mp3 files are allowed')
				hasSoundtrackFileErrors = true
			}
		})

		const performanceBlocks = Array.from(
			performancesContainer.querySelectorAll('.performance-block'),
		)

		performanceBlocks.forEach(block => {
			const participantsSelect = block.querySelector('.js-participants-select')
			const isSoloDuetOrTrio = ['1', '2', '3'].includes(
				participantsSelect?.value ?? '',
			)

			if (!isSoloDuetOrTrio) {
				return
			}

			const participantLastNameInputs = Array.from(
				block.querySelectorAll(
					'.participants-fields .js-participant-last-name',
				),
			)
			const participantFirstNameInputs = Array.from(
				block.querySelectorAll(
					'.participants-fields .js-participant-first-name',
				),
			)

			participantLastNameInputs.forEach(input => {
				if (!input.value.trim()) {
					setFieldError(input, 'Participant last name is required')
					hasParticipantNamesErrors = true
				}
			})

			participantFirstNameInputs.forEach(input => {
				if (!input.value.trim()) {
					setFieldError(input, 'Participant first name is required')
					hasParticipantNamesErrors = true
				}
			})
		})

		startPositionGroups.forEach(group => {
			const hasSelectedRadio = Boolean(
				group.querySelector('.js-start-wing:checked, .js-start-spot:checked'),
			)

			if (!hasSelectedRadio) {
				setContainerError(group, 'Start position is required')
				hasStartPositionErrors = true
			}
		})

		choreographerLastNameInputs.forEach(input => {
			if (!input.value.trim()) {
				setFieldError(input, 'Choreographer/Director last name is required')
				hasChoreographerNameErrors = true
			}
		})

		choreographerFirstNameInputs.forEach(input => {
			if (!input.value.trim()) {
				setFieldError(input, 'Choreographer/Director first name is required')
				hasChoreographerNameErrors = true
			}
		})

		performanceBlocks.forEach(block => {
			const noConcertmasterCheckbox = block.querySelector(
				'.js-concertmaster-none',
			)
			const concertmasterLastNameInput = block.querySelector(
				'.js-concertmaster-last-name',
			)
			const concertmasterFirstNameInput = block.querySelector(
				'.js-concertmaster-first-name',
			)

			if (noConcertmasterCheckbox?.checked) {
				return
			}

			if (
				concertmasterLastNameInput &&
				!concertmasterLastNameInput.value.trim()
			) {
				setFieldError(
					concertmasterLastNameInput,
					'Concertmaster last name is required',
				)
				hasConcertmasterNameErrors = true
			}

			if (
				concertmasterFirstNameInput &&
				!concertmasterFirstNameInput.value.trim()
			) {
				setFieldError(
					concertmasterFirstNameInput,
					'Concertmaster first name is required',
				)
				hasConcertmasterNameErrors = true
			}
		})

		try {
			await validationSchema.validate(
				{
					teamName: teamNameInput?.value ?? '',
					leaderLastName: teamLeaderLastNameInput?.value ?? '',
					leaderFirstName: teamLeaderFirstNameInput?.value ?? '',
					email: emailInput?.value ?? '',
					phone: phoneInput?.value ?? '',
				},
				{ abortEarly: false },
			)

			if (
				hasPerformanceNameErrors ||
				hasParticipantsErrors ||
				hasGenreErrors ||
				hasAgeGroupErrors ||
				hasPerformanceTimeErrors ||
				hasParticipantNamesErrors ||
				hasChoreographerNameErrors ||
				hasConcertmasterNameErrors ||
				hasSoundtrackFileErrors ||
				hasStartPositionErrors
			) {
				return
			}

			regForm.submit()
		} catch (error) {
			if (!(error instanceof Error) || !('inner' in error)) {
				return
			}

			const validationErrors = error.inner
			validationErrors.forEach(item => {
				if (!item?.path || !item?.message) {
					return
				}

				if (item.path === 'teamName' && teamNameInput) {
					setFieldError(teamNameInput, item.message)
				}

				if (item.path === 'leaderLastName' && teamLeaderLastNameInput) {
					setFieldError(teamLeaderLastNameInput, item.message)
				}

				if (item.path === 'leaderFirstName' && teamLeaderFirstNameInput) {
					setFieldError(teamLeaderFirstNameInput, item.message)
				}

				if (item.path === 'email' && emailInput) {
					setFieldError(emailInput, item.message)
				}

				if (item.path === 'phone' && phoneInput) {
					setFieldError(phoneInput, item.message)
				}
			})
		}
	})
}
