import React from "react";
import "./App.css";

import {
	StylesProvider,
	ThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ToDoApp from "../src/pages/ToDoApp/ToDoApp";
import LoginComponent from "../src/components/Login/LoginComponent";
import AuthenticatedRoute from "../src/components/AuthenticatedRoute/AuthenticatedRoute";
import LogoutComponent from "../src/components/Logout/LogoutComponent";
import Footer from "../src/components/Footer/FooterComponent";
import Sample from "../src/pages/sample";

const theme = createMuiTheme({
	palette: {
		secondary: {
			main: "#61D0D4",
			dark: "#a13e0e",
			light: "#eb7b43"
		},
		success: {
			main: "#61D0D4",
			light: "#61D0D4"
		},
		background: { default: "#f9fafb" }
	},
	typography: {
		fontFamily: "Lato, Roboto, Helvetica, Arial, sans-serif"
	}
});

function App() {
	return (
		<StylesProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="root">
					<div className="main">
						<Router>
							<Switch>
								<Route exact path="/sample" component={Sample} />
								<Route exact path="/logout" component={LogoutComponent} />
								<Route exact path="/login" component={LoginComponent} />
								<AuthenticatedRoute path="/" component={ToDoApp} />
								<Route
									path="*"
									render={() => (
										<div
											style={{
												height: "100vh",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												fontSize: "3em",
												color: "#cecece"
											}}
										>
											No Found
										</div>
									)}
								/>
							</Switch>
						</Router>
					</div>
					<Footer />
				</div>
			</ThemeProvider>
		</StylesProvider>
	);
}

export default App;
