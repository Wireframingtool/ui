import React, { useState } from "react";
import { Box, FormControl, Input, InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "./axios";

const Signup = () => {
	const [values, setValues] = useState<{
		name: string;
		email: string;
		password: string;
		passwordAgain: string;
	}>({
		name: "",
		email: "",
		password: "",
		passwordAgain: "",
	});
	const signup = async () => {
		try {
			const { name, email, password, passwordAgain } = values;
			if (email == "" || password == "" || name == "" || passwordAgain == "")
				return;
			const res = await axios.post("/auth/signup", {
				name,
				email,
				password,
			})
			console.log(res);
			alert("We have sent an email to you. Pls verify your email address and login")
			
		} catch (error) {
			alert("Something went wrong while signing you up. Pls check your internet connection and try again")
		}
	};
	return (
		<div>
			<h1 style={{ textAlign: "center" }}>SIGN UP</h1>
			<Box
				display="flex"
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
				height="100vh"
			>
				<FormControl margin="dense">
					<InputLabel htmlFor="name-input">Name</InputLabel>
					<Input
						value={values.name}
						onChange={(e) => setValues({ ...values, name: e.target.value })}
						style={{ width: "50vw" }}
						id="name-input"
						aria-describedby="name"
					/>
				</FormControl>
				<FormControl margin="dense">
					<InputLabel htmlFor="email-input">Email address</InputLabel>
					<Input
						value={values.email}
						onChange={(e) => setValues({ ...values, email: e.target.value })}
						style={{ width: "50vw" }}
						id="email-input"
						aria-describedby="email"
					/>
				</FormControl>
				<FormControl margin="dense">
					<InputLabel htmlFor="password-input">Password</InputLabel>
					<Input
						value={values.password}
						onChange={(e) => setValues({ ...values, password: e.target.value })}
						type="password"
						style={{ width: "50vw" }}
						id="password-input"
						aria-describedby="my-helper-text"
					/>
				</FormControl>
				<FormControl margin="dense">
					<InputLabel htmlFor="password-again">Password Again</InputLabel>
					<Input
						value={values.passwordAgain}
						onChange={(e) =>
							setValues({ ...values, passwordAgain: e.target.value })
						}
						type="password"
						style={{ width: "50vw" }}
						id="password-again"
						aria-describedby="pass-again"
					/>
				</FormControl>

				<Button
					onClick={signup}
					style={{ margin: "10px" }}
					variant="contained"
					color="primary"
				>
					SIGN UP
				</Button>

				<a href="/auth/login">Already a user? Login</a>
			</Box>
		</div>
	);
};

export default Signup;
