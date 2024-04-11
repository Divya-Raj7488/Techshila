import React, { useEffect, useState  } from "react";
import {useSelector} from 'react-redux'
import {
	Collapse,
	IconButton,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TextField,
	Button,
	TableRow,
	Grow,
	Box,
} from "@mui/material";
import { useDispatch } from "react-redux";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import { setSupplierID, setDialogOpen } from "../../Slices/supplierSlice";
import { addQuantity, removeItem } from "../../Slices/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import useGetUser from "../../utils/useGetUser";


// import SupplierDialog from "./SupplierDialog";

const AddQuantityBtn = ({ medicine, supplierId }) => {
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
	// const userRole = useSelector(state => state.user.role); // Assuming you have access to user role in Redux store

	useGetUser()
	const [showAddQuantityButton, setShowAddQuantityButton] = useState(true); 
	 const user = useSelector((state) => state.user.userLoggedIn)
	 const role = user?.role
	//const userRole = useSelector(state => state.user.role);
	 useEffect(() => {
	 	if(role === 'ceo')
		{
			setShowAddQuantityButton(false);
		  } else {
			setShowAddQuantityButton(true);
		  }
	},[role]);
	return (
		<>
			{(showAddQuantityButton && !checked) && <Button onClick={handleChange}>Add Quantity</Button>}
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
										medicine._id,
										medicine.name,
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
												medicineId: medicine._id,
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

const SupplierRow = (props) => {
	const dispatch = useDispatch();
	const { row } = props;
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
	const medicines = row.medicines;

	return (
		<React.Fragment>
			<TableRow
				sx={{
					"& > *": { borderBottom: "unset" },
					backgroundColor: "#f5f5f5",
				}}
				onClick={(event) => {
					if (event.target.cellIndex !== 0) {
						dispatch(setSupplierID(row._id));
						dispatch(setDialogOpen());
					}
				}}
			>
				<TableCell sx={{ fontFamily: "Poppins" }}>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={(e) => {
							e.stopPropagation();
							setOpen(!open);
						}}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell
					sx={{ fontFamily: "Poppins" }}
					component="th"
					scope="row"
				>
					{row.name}
				</TableCell>
				<TableCell sx={{ fontFamily: "Poppins" }}>
					{row.email}
				</TableCell>
				<TableCell sx={{ fontFamily: "Poppins" }}>
					{row.phone}
				</TableCell>
				<TableCell sx={{ fontFamily: "Poppins" }}>
					{row.joiningDate}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					sx={{ fontFamily: "Poppins" }}
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={7}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1, px: 15 }}>
							<Typography
								fontFamily={"Poppins"}
								variant="body1"
								fontWeight={500}
								gutterBottom
								component="div"
							>
								{medicines?.length > 0
									? "Medicines They Provide"
									: "No Medicines Provided Yet"}
							</Typography>
							{medicines && medicines.length > 0 && (
								<Table size="small" aria-label="details">
									<TableHead>
										<TableRow>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												Name
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												Type
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												Price
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												Expiry Date
											</TableCell>
											<TableCell />
										</TableRow>
									</TableHead>
									<TableBody>
										{medicines.map((medicine) => (
											<React.Fragment key={medicine._id}>
												<TableRow>
													<TableCell
														sx={{
															fontFamily:
																"Poppins",
														}}
													>
														{medicine.name}
													</TableCell>
													<TableCell
														sx={{
															fontFamily:
																"Poppins",
														}}
													>
														{medicine.type}
													</TableCell>
													<TableCell
														sx={{
															fontFamily:
																"Poppins",
														}}
													>
														{medicine.price}
													</TableCell>
													<TableCell
														sx={{
															fontFamily:
																"Poppins",
														}}
													>
														{medicine.expiryDate}
													</TableCell>
													<TableCell align="center">
														<AddQuantityBtn
															medicine={medicine}
															supplierId={row._id}
														/>
													</TableCell>
												</TableRow>
											</React.Fragment>
										))}
									</TableBody>
								</Table>
							)}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			{/* <SupplierDialog /> */}
		</React.Fragment>
	);
};
export default SupplierRow;
