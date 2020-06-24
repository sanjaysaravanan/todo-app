import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link, Grid, Box, Container, makeStyles } from "@material-ui/core";
import ValidateTextField from "../../components/Form/ValidateTextField";
import Message from "../../utils/Message";
import Regex from "../../utils/Regex";
import { login } from "../../state/actions";
const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function SignIn() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { isLoading, isAuthenticated } = useSelector(({ auth }) => auth);
	if (isAuthenticated) {
		return <Redirect to="/" />;
	}
	const onSubmit = async event => {
		event.preventDefault();
		const userData = Array.from(event.target.elements)
			.filter(f => f.nodeName === "INPUT")
			.reduce((ac, a) => ({ ...ac, [a.name]: a.value }), {});
		console.log(userData);
		if (event.target.checkValidity()) {
			console.log(userData);
			await dispatch(login(userData));
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<form className={classes.form} autoComplete="off" onSubmit={onSubmit}>
				<ValidateTextField
					variant="outlined"
					margin="normal"
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
				<ValidateTextField
					variant="outlined"
					margin="normal"
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
					patternerrormessage={Message.en.invalidPassword}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					disabled={isLoading}
				>
					Sign In
				</Button>
			</form>
		</Container>
	);
}
