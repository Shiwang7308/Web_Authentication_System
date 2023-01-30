const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose = require('mongoose')

const User = require('./model/user-model.js')


// middleware setup
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/Auth')

app.post('/api/register', async (req, res) => {
	console.log(req.body) 
	try {
        // console.log("reqbody: ",req.body);		
		const data = await User.create({
			firstName: req.body.firstName,
            lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
            gender: req.body.gender,
            country: req.body.country,
            checkbox: req.body.checkbox
		})
		res.status(201).json({
            data: data,
            success: true,
            messange: "Successfully created a user in database",
            err: {}
        })
	} catch (err) {
        // console.log(error);
        return res.status(500).json({
           data: {},
           success: false,
           messange: "Not able to create a user entry"
        });
	}
})

app.post('/api/login', async (req, res) => {
    console.log(req.body);
	const user = await User.findOne({
		email: req.body.email,
        password: req.body.password
	})
    //  console.log(user);
     res.json({
        user
     })
	
})

app.listen(3001, () => {
	console.log('Server started on 3001');
});
