import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import '../CSS/Register.css';
import Navbar from '../components/Navbar';

import { register } from '../redux/actions/authActions.js';

const Register = () => {
	const { auth, alert } = useSelector((state) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialState = {
		name: '',
		email: '',
		password: '',
		cf_password: '',
	};

	const [ userData, setUserData ] = useState(initialState);
	const { name, email, password, cf_password } = userData;

	useEffect(
		() => {
			if (auth.token) navigate(`/`);
		},
		[ auth.token, navigate ]
	);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register(userData));
	};

	return (
		<div className="regisrer_page_container">
			<Navbar />
			<div className="main_container">
				<div className="form_container">
					<h1>Register</h1>
					<form onSubmit={handleSubmit}>
						<div className="input_container">
							<label htmlFor="Name">Name</label>
							<input
								type="text"
								placeholder="Enter Your Name"
								onChange={handleChangeInput}
								value={name}
								name="name"
								style={{ background: `${alert.name ? '#fd2d6a14' : ''}` }}
							/>
							<small className="form-text text-danger">{alert.name ? alert.name : ''}</small>
						</div>
						<div className="input_container">
							<label htmlFor="Email">Email</label>
							<input
								type="email"
								placeholder="Enter Your Email"
								onChange={handleChangeInput}
								value={email}
								name="email"
								style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
							/>
							<small className="form-text text-danger">{alert.email ? alert.email : ''}</small>
						</div>
						<div className="input_container">
							<label htmlFor="Password">Password</label>
							<input
								type="password"
								placeholder="Enter Your Password"
								onChange={handleChangeInput}
								value={password}
								name="password"
								style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
							/>
							<small className="form-text text-danger">{alert.password ? alert.password : ''}</small>
						</div>
						<div className="input_container">
							<label htmlFor="Password">Confirm Password</label>
							<input
								type="password"
								placeholder="Confirm Your Password"
								onChange={handleChangeInput}
								value={cf_password}
								name="cf_password"
								style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }}
							/>
							<small className="form-text text-danger">
								{alert.cf_password ? alert.cf_password : ''}
							</small>
						</div>
						<div className="input_container">
							<button className="submit_btn">Register</button>
						</div>

						<p>
							Already Have an account? <Link to="/login">Login</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
