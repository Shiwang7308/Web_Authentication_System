import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

import Dashboard from './components/Dashboard'
const App = () => {
	return (
		  
			<BrowserRouter>
			<Routes>
			<Route path="/" exact element={<Register/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/dashboard" element={<Dashboard/>} />
			</Routes>
			</BrowserRouter>
	)
}

export default App
