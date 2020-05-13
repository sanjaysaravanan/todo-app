import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";
import { CopyrightOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	footer: {
		backgroundColor: theme.palette.primary.dark,
		height: "5vh",
		color: "#ffffff",
		width: "100%",
		paddingTop: 5
	},
	gridCont: {
		padding: theme.spacing(4),
		backgroundColor: "#E83556",
		width: "100%"
	},
	footerIconDiv: {
		borderRadius: "50%",
		height: 60,
		width: 60,
		backgroundColor: "#61D0D4",
		color: "#E83556",
		paddingTop: 12,
		float: "left",
		display: "block"
	},
	footerComponent: {
		paddingRight: 50
	},
	navigationLink: {
		"&:hover": {
			color: "#3f00fc",
			textDecoration: "none"
		}
	}
}));

export default function FooterComponent() {
	const classes = useStyles();

	return (
		<div className={classes.footer}>
			<Typography variant="h6" align="center">
				Copyright <CopyrightOutlined />{" "}
				<Link
					color="inherit"
					href="https://www.linkedin.com/in/sanjaysaravanan21/"
					className={classes.navigationLink}
					target="_blank"
				>
					sanjaysaravanan
				</Link>{" "}
				{new Date().getFullYear()}
			</Typography>
		</div>
	);
}
