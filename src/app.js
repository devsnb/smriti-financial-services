require('dotenv').config()
const express = require('express')
const path = require('path')
const { sendMail } = require('./services/mail.service')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.post('/mail', async (req, res) => {
	const body = req.body

	const data = {
		name: body.name,
		contactNumber: body.contactNumber,
		email: body.email
	}

	try {
		await sendMail(
			data.email,
			'contact@smritifinserv.com',
			`Contact: ${data.name}`,
			`			
			Hi ${data.name},

			I'm Sripanth from Sripanth Taxation & Financial Services (OPC) Pvt. Ltd. I've received your request for a chat. We'll connect shortly. I've attached the information you provided for confirmation. If something is incorrect please reply to this email so we can connect with you without any hiccups.
			
			The information you provided is:
			Name: ${data.name}
			Email: ${data.email}
			Contact Number: ${data.contactNumber}


			Regards,
			Sripanth
			`,
			`
			<p>Hi ${data.name},</p>
			<br>

			<p>I'm Sripanth from Sripanth Taxation & Financial Services (OPC) Pvt. Ltd. I've received your request for a chat. We'll connect shortly. I've attached the information you provided for confirmation. If something is incorrect please reply to this email so we can connect with you without any hiccups.</p>

			<br>

			<h4>The information you provided is:</h4>
			<p>Name: ${data.name}</p>
			<p>Email: ${data.email}</p>
			<p>Contact Number: ${data.contactNumber}</p>
			
			<br>

			<p>Regards,</p>
			<p>Sripanth</p>
			`
		)
	} catch (error) {
		res.status(500).json({
			message:
				'Something went wrong while processing your request! Please try again later'
		})
		console.error(error)
	}

	res.status(200).json({
		message: 'Success!!'
	})
})

app.listen(PORT, () => {
	console.log(
		`Server started on localhost:${PORT} in ${process.env.NODE_ENV} mode`
	)
})

// Exit on unhandled exceptions
process.on('unhandledRejection', error => {
	console.log(`Error ${error.message}`.red)
	// Close server and exit process
	server.close(() => {
		process.exit(1)
	})
})
