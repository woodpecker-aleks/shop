import { Divider, Paper, Typography } from "@material-ui/core";
import { memo, useMemo } from "react";
import { useStyles } from "./ProfilePageClasses";
import moment from "moment";
import { transferCurrency } from "../../functions";
import { useSelector } from "react-redux";

function OrderItem({ order, ...props }) {
	const classes = useStyles();
	const date = moment(order.date).fromNow();
	const currency = useSelector(store => store.appCurrency);
	const totalPrice = useMemo(() => transferCurrency(order.totalPrice, currency), [currency, order.totalPrice]);
	
	return (
		<Paper
			variant="outlined"
			className={classes.order}
		>
			<div className={classes.orderHeader}>
				<Typography variant="caption">
					Id: {order._id}
				</Typography>
				<Typography
					variant="subtitle2"
					className={classes.time}
				>
					{date}
				</Typography>
			</div>
			<Divider />
			<div className={classes.orderBody}>
				<Typography variant="h6">{order.text}</Typography>
				<Typography>{order.adress}</Typography>
			</div>
			<Divider />
			<div className={classes.orderFooter}>
				<Typography variant="body2">Total price: { totalPrice }</Typography>
			</div>
		</Paper>
	)
}

export default memo(OrderItem);