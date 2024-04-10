import React from "react";
import { Button } from "@mui/material";
import { addOneToCart, removeOneFromCart } from "../../Slices/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useDispatch } from "react-redux";

const UpdateCartBtn = (props) => {
	const { medicine, supplier } = props;
	const dispatch = useDispatch();
	const add = (medicine) => {
		dispatch(addOneToCart(medicine));
	};

	const remove = (medicine) => {
		dispatch(removeOneFromCart(medicine));
	};

	return (
		<>
			<Button
				variant="outlined"
				onClick={() =>
					remove({
						medicineID: medicine.ID,
						supplierID: supplier.ID,
					})
				}
			>
				<RemoveIcon />
			</Button>
			<Button
				sx={{ paddingX: 1 }}
				variant="outlined"
				onClick={() =>
					add({
						medicineID: medicine.ID,
						supplierID: supplier.ID,
					})
				}
			>
				<AddIcon />
			</Button>
		</>
	);
};

export default UpdateCartBtn;
