import { loginFailure, loginStart, logoutStart,loginSuccess ,registerStart,registerSuccess,registerFailure} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
    
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const logout = async dispatch=>{
  dispatch(logoutStart())
}

export const register = async (dispatch, user) => {
	dispatch(registerStart());
	try {
		const res = await publicRequest.post("/auth/register", user);
    // res.data becomes action.payload
		dispatch(registerSuccess(res.data));
	} catch (err) {
    console.log(`This is err.response in catch`)
    console.log(err.response)
		dispatch(registerFailure(err.response.data.errors.email));
	}
};
