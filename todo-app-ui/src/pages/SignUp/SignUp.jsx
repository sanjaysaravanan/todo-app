import React from "react";
import { Button, Link, Grid, Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import ValidateTextField from "../../components/Form/ValidateTextField";
import Regex from "../../utils/Regex";
import Message from "../../utils/Message";
import { createUser } from "../../state/actions";

const useStyles = makeStyles(theme => ({
	form: {
		width: "100%",
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function SignUp() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const onSubmit = async event => {
		event.preventDefault();
		const userData = Array.from(event.target.elements)
			.filter(f => f.nodeName === "INPUT")
			.reduce((ac, a) => ({ ...ac, [a.name]: a.value }), {});
		if (event.target.checkValidity()) {
			await dispatch(createUser(userData));
		}
		document.getElementById("signUpForm").reset();
	};
	return (
		<Container component="main" maxWidth="xs">
			<form
				id="signUpForm"
				className={classes.form}
				autoComplete="off"
				onSubmit={onSubmit}
			>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<ValidateTextField
							name="firstName"
							variant="outlined"
							required
							fullWidth
							id="firstName"
							label="First Name"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<ValidateTextField
							variant="outlined"
							required
							fullWidth
							id="lastName"
							label="Last Name"
							name="lastName"
							autoComplete="lname"
						/>
					</Grid>
					<Grid item xs={12}>
						<ValidateTextField
							variant="outlined"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							inputProps={{
								pattern: Regex.validEmail.source
							}}
							helperText={Message.en.invalidEmail}
						/>
					</Grid>
					<Grid item xs={12}>
						<ValidateTextField
							variant="outlined"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							inputProps={{
								pattern: Regex.validPassword.source
							}}
							patternerrormessage={Message.en.patternPassword}
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					Sign Up
				</Button>
			</form>
		</Container>
	);
}
