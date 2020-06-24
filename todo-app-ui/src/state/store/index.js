import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as api from "../../api";
import * as actionCreators from "../actions";

import reducers from "../reducers";

const store = createStore(
	reducers,
	process.env.NODE_ENV === "development"
		? composeWithDevTools({
				actionCreators,
				trace: true,
				traceLimit: 25
		  })(applyMiddleware(reduxThunk.withExtraArgument(api)))
		: applyMiddleware(reduxThunk.withExtraArgument(api))
);

export default store;
