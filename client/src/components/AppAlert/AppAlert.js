import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../../redux/reducers/appAlertReducer";

function AppAlert() {
  const dispatch = useDispatch();
  const dispatchClearAlert = useCallback(() => dispatch( clearAlert() ), [dispatch]);
  const { type, children, duration } = useSelector(store => store.alert);
  const snackbarPosition = useMemo(() => ({
    vertical: 'bottom',
    horizontal: 'center'
  }), []);

  useEffect(() => setTimeout(dispatchClearAlert, duration), [dispatchClearAlert, duration]);

  return (
    <Snackbar
      anchorOrigin={snackbarPosition}
      open={Boolean(children)}
      onClose={dispatchClearAlert}
    >
      <Alert variant="filled" severity={type}>{children}</Alert>
    </Snackbar>
  )
}

export default memo(AppAlert);