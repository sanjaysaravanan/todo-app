import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { hideGlobalLoading } from "../../state/actions/notifyActions";
const useStyles = makeStyles(theme => ({
	backDrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff"
	}
}));
let currentlyTimeOutId;
const LoadingIndicator = () => {
	const classStyle = useStyles();
	const { isLoading = [] } = useSelector(({ notify }) => notify);
	const dispatch = useDispatch();
	const [openClosed, setOpenClosed] = useState(false);

	useEffect(() => {
		setOpenClosed(!!isLoading.length);
	}, [isLoading]);

	if (openClosed) {
		clearTimeout(currentlyTimeOutId);
		currentlyTimeOutId = setTimeout(() => {
			isLoading.forEach(r => dispatch(hideGlobalLoading()));
		}, 12000);
	} else clearTimeout(currentlyTimeOutId);
	return (
		<Backdrop className={classStyle.backDrop} open={openClosed}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default LoadingIndicator;
