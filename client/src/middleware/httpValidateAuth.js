import { logout } from "../redux/reducers/appAuthReducer"

export function httpValidateAuth(dispatch) {
  return async (res) => {
    if (res.status === 401) dispatch( logout() );
  }
}