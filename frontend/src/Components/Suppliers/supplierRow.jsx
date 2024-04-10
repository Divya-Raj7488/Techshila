import React, { useEffect, useState, useSyncExternalStore } from "react";
import {
	Collapse,
	IconButton,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	Button,
	TableRow,
	Box,
} from "@mui/material";
import { useDispatch } from "react-redux";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { setSupplierID, setDialogOpen } from "../../Slices/supplierSlice";
import { addToCart, removeFromCart } from "../../Slices/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// import SupplierDialog from "./SupplierDialog";

const SupplierRow = (props) => {
	const dispatch = useDispatch();
	const { row } = props;
	const [open, setOpen] = useState(false);
	const medicines = row.medicines;

	const add = (medicine) => {
		dispatch(addToCart(medicine));
	};

	const remove = (medicine) => {
		dispatch(removeFromCart(medicine));
	};

	return (
		<React.Fragment>
			<TableRow
				sx={{
					"& > *": { borderBottom: "unset" },
					backgroundColor: "#f5f5f5",
				}}
				onClick={(event) => {
					if (event.target.cellIndex !== 0) {
						dispatch(setSupplierID(row.ID));
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
								Medicines They Provide
							</Typography>
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
										<TableRow key={medicine.ID}>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												{medicine.name}
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												{medicine.type}
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												{medicine.price}
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												{medicine.expiryDate}
											</TableCell>
											<TableCell align="right">
												<Button
													variant="outlined"
													onClick={() =>
														remove(medicine)
													}
												>
													<RemoveIcon />
												</Button>
												<Button
													sx={{ paddingX: 1 }}
													variant="outlined"
													onClick={() =>
														add(medicine)
													}
												>
													<AddIcon />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			{/* <SupplierDialog /> */}
		</React.Fragment>
	);
};
export default SupplierRow;
