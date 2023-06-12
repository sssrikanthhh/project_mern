import { useState, useEffect } from 'react';

const Login = () => {
	return (
		<div class='login-container'>
			<h2>Login</h2>
			<form>
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' placeholder='johndoe@gmail.com' />
				<label htmlFor='password'>Password</label>
				<input type='password' id='password' placeholder='password123' />
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
