import React, { useEffect, useState } from "react";
import {
	Collapse,
	IconButton,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Box,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InventoryDialog from "./InventoryDialog";
import { useDispatch } from "react-redux";
import { setInventory, setDialogOpen } from "../../Slices/inventorySlice";
import { setManagerID } from "../../Slices/managerSlice";

const InventoryRow = (props) => {
	const dispatch = useDispatch();
	const { row } = props;
	const [open, setOpen] = useState(false);
	return (
		<React.Fragment>
			<TableRow
				sx={{
					"& > *": { borderBottom: "unset" },
					backgroundColor: "#f5f5f5",
				}}
				onClick={(event) => {
					if (event.target.cellIndex !== 0) {
						console.log(row);
						dispatch(setInventory(row));
						dispatch(setDialogOpen());
						dispatch(
							setManagerID({
								managerID: row.managerID,
								manager: row.Manager,
							})
						);
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
				<TableCell sx={{ fontFamily: "Poppins" }} align="right">
					{row.location}
				</TableCell>
				<TableCell sx={{ fontFamily: "Poppins" }} align="right">
					{row.revenueCurrentDay}
				</TableCell>
				<TableCell sx={{ fontFamily: "Poppins" }} align="right">
					{row.revenueCurrentMonth}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					sx={{ fontFamily: "Poppins" }}
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={7}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
							>
								Assigned Store Managers
							</Typography>
							<Table size="small" aria-label="details">
								<TableHead>
									<TableRow>
										<TableCell />
										<TableCell
											sx={{ fontFamily: "Poppins" }}
										>
											Joining Date
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
										>
											Name
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
										>
											Gender
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
											align="right"
										>
											Phone
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
											align="right"
										>
											Email
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
											align="right"
										>
											Department
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.managers.map((manager) => (
										<TableRow key={manager.ID}>
											<TableCell />
											<TableCell
												sx={{ fontFamily: "Poppins" }}
												component="th"
												scope="row"
											>
												{manager.joiningDate}
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												{manager.name}
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
											>
												{manager.gender}
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
												align="right"
											>
												{manager.phone}
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
												align="right"
											>
												{manager.email}
											</TableCell>
											<TableCell
												sx={{ fontFamily: "Poppins" }}
												align="right"
											>
												{manager.department}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<InventoryDialog />
		</React.Fragment>
	);
};
export default InventoryRow;
