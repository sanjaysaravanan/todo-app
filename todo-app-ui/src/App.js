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
import LoginRegister from "../src/pages/LoginRegister/LoginRegister";
import AuthenticatedRoute from "../src/components/AuthenticatedRoute/AuthenticatedRoute";
import LogoutComponent from "../src/components/Logout/LogoutComponent";
import LoadingIndicator from "../src/components/Loader/Loader";
import SnackBarMessage from "../src/components/SnackBarMessage/SnackBarMessage";
import Sample from "../src/pages/sample";
import CopyRights from "../src/components/CopyRight/CopyRight";

const theme = createMuiTheme({
	palette: {
		secondary: {
			main: "#61D0D4",
			dark: "#a13e0e",
			light: "#eb7b43"
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
								<Route exact path="/login" component={LoginRegister} />
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
							<SnackBarMessage />
							<LoadingIndicator />
						</Router>
					</div>
					<CopyRights />
				</div>
			</ThemeProvider>
		</StylesProvider>
	);
}

export default App;
