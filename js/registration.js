document.addEventListener('DOMContentLoaded', () => {
	const amateurRadio = document.getElementById('teamLevelAmateur')
	const proRadio = document.getElementById('teamLevelPro')
	const organizationField = document.getElementById('organizationField')

	if (!amateurRadio || !proRadio || !organizationField) {
		return
	}

	const updateOrganizationVisibility = () => {
		organizationField.classList.toggle('is-hidden', amateurRadio.checked)
	}

	updateOrganizationVisibility()

	amateurRadio.addEventListener('change', updateOrganizationVisibility)
	proRadio.addEventListener('change', updateOrganizationVisibility)
})
