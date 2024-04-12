import React, { useEffect, useState } from "react";
import {
	TableCell,
	TextField,
	Button,
	TableRow,
	Grow,
	Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import { addQuantity, removeItem } from "../../Slices/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
// import SupplierDialog from "./SupplierDialog";

const AddQuantityBtn = ({ med, supplierId }) => {
	const [checked, setChecked] = useState(false);
	const [quantity, setQuantity] = useState(0);
	const dispatch = useDispatch();
	const addToCart = (medicineId, name, supplierId, quantity) => {
		if (quantity && quantity > 0) {
			dispatch(addQuantity({ medicineId, supplierId, quantity, name }));
		}
	};
	const handleChange = () => {
		setChecked((prev) => !prev);
	};
	return (
		<>
			{!checked && <Button onClick={handleChange}>Add Quantity</Button>}
			{checked && (
				<Grow
					in={checked}
					style={{ transformOrigin: "0 0 0" }}
					{...(checked ? { timeout: 1000 } : {})}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "stretch",
							}}
						>
							<TextField
								type="number"
								inputProps={{ min: 1 }}
								value={quantity}
								onChange={(e) =>
									setQuantity(parseInt(e.target.value, 10))
								}
							/>
							<Button
								variant="outlined"
								onClick={() =>
									addToCart(
										med.ID,
										med.name,
										supplierId,
										quantity
									)
								}
							>
								<AddIcon />
							</Button>
							<Button
								variant="outlined"
								onClick={() => {
									if (quantity != 0)
										dispatch(
											removeItem({
												medicineId: med.ID,
												supplierId: supplierId,
											})
										);
									handleChange();
								}}
							>
								<DeleteIcon />
							</Button>
						</div>
					</div>
				</Grow>
			)}
		</>
	);
};

const StockRow = ({ med }) => {
	const [quantity, setQuantity] = useState([]);

	const handleQuantityChange = (medicineId, value) => {
		const itemIndex = quantity.findIndex(
			(item) => item.medicineId === medicineId
		);

		if (itemIndex === -1) {
			setQuantity([...quantity, { medicineId, quantity: value }]);
		} else {
			const updatedQuantity = [...quantity];
			updatedQuantity[itemIndex].quantity = value;
			setQuantity(updatedQuantity);
		}
	};

	const [open, setOpen] = useState(false);
	const user = useSelector((state) => state.user.userLoggedIn);
	const dispatch = useDispatch();
	return (
		<React.Fragment key={med.ID}>
			<TableRow>
				<TableCell
					sx={{
						fontFamily: "Poppins",
					}}
				>
					{med.supplierName}
				</TableCell>
				<TableCell
					sx={{
						fontFamily: "Poppins",
					}}
				>
					{med.name}
				</TableCell>
				<TableCell
					sx={{
						fontFamily: "Poppins",
					}}
				>
					{med.type}
				</TableCell>
				<TableCell
					sx={{
						fontFamily: "Poppins",
					}}
				>
					{med.quantity}
				</TableCell>
				<TableCell
					sx={{
						fontFamily: "Poppins",
					}}
				>
					{med.expiryDate}
				</TableCell>
				<TableCell
					sx={{
						fontFamily: "Poppins",
					}}
				>
					{med.price}
				</TableCell>
				{user?.role === "manager" && (
					<TableCell align="center">
						<AddQuantityBtn med={med} supplierId={med.sID} />
					</TableCell>
				)}
			</TableRow>
		</React.Fragment>
	);
};
export default StockRow;
