import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import MessageErrors from "../../utils/Message";
import PropTypes from "prop-types";

const ValidateTextField = props => {
	const [valid, setValid] = useState(true);
	const [messageError, setMsgError] = useState("error");

	useEffect(() => {
		if (valid === props.error) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			setValid(!props.error);
			// eslint-disable-next-line react-hooks/rules-of-hooks
			setMsgError(props.helperText);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.error, props.helperText]);

	const _props = { ...props };
	return (
		<TextField
			{..._props}
			variant="outlined"
			margin="normal"
			error={!valid}
			helperText={messageError}
			FormHelperTextProps={{ hidden: valid }}
			onBlur={e => {
				// eslint-disable-next-line no-unused-expressions
				(props.onBlur && props.onBlur(e)) |
					// eslint-disable-next-line react-hooks/rules-of-hooks
					setValid(e.target.checkValidity());
			}}
			onInvalid={e => {
				e.preventDefault();
				const el = e.target,
					status = el.validity;

				if (status.patternMismatch)
					// eslint-disable-next-line react-hooks/rules-of-hooks
					setMsgError(
						props.patternerrormessage ||
							props.helperText ||
							e.target.validationMessage
					);
				// eslint-disable-next-line react-hooks/rules-of-hooks
				else setMsgError(MessageErrors.en.formNotBlank);
				// eslint-disable-next-line react-hooks/rules-of-hooks
				setValid(false);
			}}
			onChange={e => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				!valid && setValid(e.target.checkValidity());
				props.onChange && props.onChange(e);
			}}
		/>
	);
};

ValidateTextField.propTypes = {
	required: PropTypes.bool,
	name: PropTypes.string,
	label: PropTypes.string,
	className: PropTypes.string,
	color: PropTypes.string,
	defaultValue: PropTypes.string,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	type: PropTypes.string,
	patternerrormessage: PropTypes.string
};

export default ValidateTextField;
