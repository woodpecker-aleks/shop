import { Http } from "../functions";
import { callAlert } from "../redux/reducers/appAlertReducer";

export function httpValidateStatus(dispatch) {
  return (res) => {
    if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );
    
    return res;
  }
}