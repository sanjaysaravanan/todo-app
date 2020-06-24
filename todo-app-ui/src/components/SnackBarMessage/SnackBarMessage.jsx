import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { clearNotificationDisplay } from "../../state/actions";

function SnackBarMessage() {
	const dispatch = useDispatch();

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
		setTimeout(() => dispatch(clearNotificationDisplay()), 200);
	};
	const { message, severity = "error", isOpen } = useSelector(
		({ notify: { notification } }) => notification
	);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);
	return (
		<Snackbar open={open} autoHideDuration={2000} onClose={handleSnackbarClose}>
			<MuiAlert severity={severity} elevation={6} variant="filled">
				{message}
			</MuiAlert>
		</Snackbar>
	);
}

export default SnackBarMessage;
