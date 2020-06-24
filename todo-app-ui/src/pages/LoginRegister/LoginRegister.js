import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Link, Container } from "@material-ui/core";
import { Tabs, Tab, Box } from "@material-ui/core";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `wrapped-tab-${index}`,
		"aria-controls": `wrapped-tabpanel-${index}`
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.paper
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}
}));

export default function LoginRegister() {
	const classes = useStyles();
	const [value, setValue] = React.useState("one");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.paper}>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="wrapped label tabs example"
			>
				<Tab value="one" label="SignIn" {...a11yProps("one")} />
				<Tab value="two" label="SignUp" {...a11yProps("two")} />
			</Tabs>
			<TabPanel value={value} index="one">
				<SignIn />
			</TabPanel>
			<TabPanel value={value} index="two">
				<SignUp />
			</TabPanel>
		</div>
	);
}
