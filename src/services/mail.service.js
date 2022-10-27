const nodemailer = require('nodemailer')

// Transporter for sending mail
const transporter = nodemailer.createTransport({
	host: process.env.NODEMAILER_HOST,
	port: process.env.NODEMAILER_PORT,
	secure: process.env.NODEMAILER_IS_SECURE,
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASSWORD
	}
})

/**
 * Sends email
 * @param {String} to mail address to send email to
 * @param {String} from mail address to send email from
 * @param {String} subject subject of the email
 * @param {String} text body of the email in text
 * @param {String} html body of the email in html format
 */
const sendMail = async (to, from, subject, text, html) => {
	try {
		const info = await transporter.sendMail({
			from,
			to,
			subject,
			text,
			html
		})
		console.log('Email sent: ' + info.response)
	} catch (error) {
		console.error(error)
		throw new Error('Failed to send email')
	}
}

exports.sendMail = sendMail
