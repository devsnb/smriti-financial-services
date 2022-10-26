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

form.addEventListener('submit', async e => {
	e.preventDefault()

	const data = {
		name: nameEl.value,
		contactNumber: contactNumberEl.value,
		email: emailEl.value
	}

	const response = await fetch('/mail', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})

	if (!response.ok || response.status !== 200) {
		console.log('Something went wrong!!')
	} else {
		const res = await response.json()
		console.log(res)
	}
})
