import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Tooltip, Button, TextField } from "@mui/material";
import { red, green, blue } from "@mui/material/colors";

const ManagerCard = ({ manager, color }) => {
	const dispatch = useDispatch();
	const managerIDsList = useSelector(
		(state) => state.manager?.managerIDsList
	);
	const param = managerIDsList?.find((param) => param.id === manager.ID);

	return (
		<>
			<div
				style={{
					position: "relative",
					fontFamily: "Poppins",
					padding: 30,
					margin: 2,
					width: "max-content",
					minWidth: 300,
					boxShadow:
						"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
					borderBottomStyle: "solid",
					borderBottomWidth: "6px",
					borderBottomColor: blue[500],
				}}
			>
				<Tooltip title={manager.onLeaveToday ? "On leave" : "At work"}>
					<Box
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							width: 24,
							height: 24,
							borderRadius: "50%",
							backgroundColor: manager.onLeaveToday
								? red[600]
								: green[500],
						}}
					/>
				</Tooltip>
				<Typography
					fontFamily={"Poppins"}
					variant="h5"
					sx={{ fontWeight: "bold", mb: 1 }}
				>
					{manager.name}
				</Typography>
				<Typography
					fontFamily={"Poppins"}
					variant="body1"
					sx={{ mb: 2 }}
				>
					{manager.department}
				</Typography>
				<Typography
					fontFamily={"Poppins"}
					variant="body1"
					sx={{ mb: 2 }}
				>
					{manager.joiningDate}
				</Typography>
				<Typography
					fontFamily={"Poppins"}
					variant="h6"
					sx={{ fontWeight: "medium", color: green[500] }}
				>
					Work Days: {manager.workDays}
				</Typography>
				<Typography
					fontFamily={"Poppins"}
					variant="body1"
					sx={{ mb: 2, color: red[600] }}
				>
					Leaves: {manager.leaves}
				</Typography>
			</div>
		</>
	);
};

export default ManagerCard;
