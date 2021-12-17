import { Box, FormControl, Input, InputLabel, Button } from "@material-ui/core";
import React, { useState } from "react";
import axios from "./axios";
// import {Button as BB} from "react-bootstrap"
// import Intro from "./Intro";


const Login: React.FC = () => {
    // const [show, setShow] = useState(false);

	const [values, setValues] = useState<{ email: string; password: string }>({
		email: "",
		password: "",
	});
	const login = async () => {
		try {
			const { email, password } = values;
			if (email == "" || password == "") return;
			await axios.post("/auth/login", values);
			window.location.href = "/";
		} catch (error) {
			alert("Something went wrong while logging you in. Pls try again later.")
			console.log(error);
		}
	};
	return (
		<div>
			<h1 style={{ textAlign: "center" }}>LOGIN</h1>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				height="100vh"
			>
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

				<Button
					onClick={login}
					style={{ margin: "10px" }}
					variant="contained"
					color="primary"
				>
					LOGIN
				</Button>

				<a href="/auth/signup">New user? Sign Up</a>
			{/* <BB variant="primary" onClick={() => setShow(true)}>
				Custom Width Modal
			</BB> */}
			{/* <Intro show={show} setShow={setShow} /> */}
			</Box>
		</div>
	);
};

export default Login;