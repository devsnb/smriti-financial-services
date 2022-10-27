const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const NAME_REGEX = /^[a-zA-Z\s]{2,100}$/
const CONTACT_NUMBER_REGEX =
	/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

// Hamburger Menu Handler
const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active')
	navMenu.classList.toggle('active')
})

document.querySelectorAll('.nav-link').forEach(n =>
	n.addEventListener('click', () => {
		hamburger.classList.remove('active')
		navMenu.classList.remove('active')
	})
)

// Current year in footer
const copyrightYear = document.getElementById('copyright-year')

const currentYear = new Date().getFullYear()

copyrightYear.innerText = currentYear

// Contact Us Form Handler
const form = document.getElementById('main-form')

const nameEl = document.getElementById('name')
const contactNumberEl = document.getElementById('contact-number')
const emailEl = document.getElementById('email')

const nameWarningEl = document.getElementById('name-warning')
const contactWarningEl = document.getElementById('contact-warning')
const emailWarningEl = document.getElementById('email-warning')

form.addEventListener('submit', async e => {
	e.preventDefault()

	const data = {
		name: nameEl.value,
		contactNumber: contactNumberEl.value,
		email: emailEl.value
	}

	if (!NAME_REGEX.test(data.name)) {
		nameEl.classList.add('invalid')
		nameWarningEl.textContent = 'Please check your provided name'
	} else {
		nameEl.classList.remove('invalid')
		nameWarningEl.textContent = ''
	}

	if (!EMAIL_REGEX.test(data.email)) {
		emailEl.classList.add('invalid')
		emailWarningEl.textContent = 'Please check your provided email'
	} else {
		emailEl.classList.remove('invalid')
		emailWarningEl.textContent = ''
	}

	if (!CONTACT_NUMBER_REGEX.test(data.contactNumber)) {
		contactNumberEl.classList.add('invalid')
		contactWarningEl.textContent = 'Please check your provided contact number'
	} else {
		contactNumberEl.classList.remove('invalid')
		contactWarningEl.textContent = ''
	}

	try {
		const response = await fetch('/mail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (!response.ok || response.status !== 200) {
			window.alert(
				'Your request could not be processed at this moment. Please try again after some time.'
			)
		} else {
			nameEl.value = ''
			emailEl.value = ''
			contactNumberEl.value = ''
			window.alert('Your request has been submitted successfully!')
		}
	} catch (error) {
		window.alert(
			'Something unexpected happened. Please try after some time. If the issue persists please email us at contact@smritifinserv.com'
		)
	}
})
