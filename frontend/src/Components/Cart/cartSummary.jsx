import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotal, selectCartItems } from "../../Slices/cartSlice";
import { Card, CardContent, Typography } from "@mui/material";

const CartSummary = () => {
	const cartItems = useSelector(selectCartItems);
	const total = useSelector(selectCartTotal);

	return (
		<Card>
			<CardContent>
				<Typography variant="h5">Cart Summary</Typography>
				{cartItems.map((item) => (
					<div key={item.id}>
						<Typography>{item.name}</Typography>
						<Typography>{item.price}</Typography>
					</div>
				))}
				<Typography>Total: {total}</Typography>
			</CardContent>
		</Card>
	);
};

export default CartSummary;
