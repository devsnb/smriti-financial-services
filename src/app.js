require('dotenv').config()
const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.post('/mail', (req, res) => {
	const body = req.body

	const data = {
		name: body.name,
		contactNumber: body.contactNumber,
		email: body.email
	}

	console.log(data)

	res.status(200).json({
		message: 'Success!!'
	})
})

app.listen(PORT, () => {
	console.log(
		`Server started on localhost:${PORT} in ${process.env.NODE_ENV} mode`
	)
})
