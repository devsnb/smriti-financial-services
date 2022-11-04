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

			Greetings from Smriti Financial Services
			
			We're thrilled to know you're interested in our financial services. We've received your request for a chat. Our representative will connect with you shortly. I've attached the information you provided for confirmation. If the provided info is incorrect please reply to this email so we can connect with you without any hiccups.
			
			The information you provided is:
			Name: ${data.name}
			Email: ${data.email}
			Contact Number: ${data.contactNumber}


			Regards,
			Smriti Financial Services,
     	Sripanth Taxation & Financial Services (OPC) Private Limited
			`,
			`
			<p>Hi ${data.name},</p>
			<br>

			<p>Greetings from Smriti Financial Services</p>

			<p>We're thrilled to know you're interested in our financial services. We've received your request for a chat. Our representative will connect with you shortly. I've attached the information you provided for confirmation. If the provided info is incorrect please reply to this email so we can connect with you without any hiccups.</p>

			<br>

			<h4>The information you provided is:</h4>
			<p>Name: ${data.name}</p>
			<p>Email: ${data.email}</p>
			<p>Contact Number: ${data.contactNumber}</p>
			
			<br>

			<p>Regards,</p>
			<p>Smriti Financial Services,</p>
			<p>Sripanth Taxation & Financial Services (OPC) Private Limited</p>
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
