import React, { useState } from "react";
import {
	Input,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Stack,
	Button,
	TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createMedicine } from "../Slices/medicineSlice";

const AddMedicine = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [price, setPrice] = useState(0);
	const [expiryDate, setExpiryDate] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted");
		const medicineData = {
			name,
			type,
			price,
			expiryDate,
		};

		dispatch(createMedicine(medicineData));
		console.log("Medicine Data:", medicineData);
		setName("");
		setType("");
		setPrice(0);
		setExpiryDate("");
	};

  return (
    <div>
      <h1 style={{ color: "black" , paddingTop: "100px", paddingLeft: "510px" , paddingRight:"500px" , textAlign:"left" , fontSize:"40px"}}>Add Medicine Details</h1>
			<form
				style={{
					paddingTop: "50px",
					paddingLeft: "500px",
					paddingRight: "500px",
				}}
				onSubmit={handleSubmit}
			>
				<Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
					<FormControl>
						<InputLabel htmlFor="name">Medicine Name</InputLabel>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<FormHelperText id="my-helper-text">
							Please enter medicine name.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="type">Medicine Type</InputLabel>
						<Select
							id="type"
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<MenuItem value={"tablet"}>Tablet</MenuItem>
							<MenuItem value={"injection"}>Injection</MenuItem>
							<MenuItem value={"syrup"}>Syrup</MenuItem>
						</Select>
						<FormHelperText id="my-helper-text">
							Please select medicine type.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="price">Price</InputLabel>
						<Input
							id="price"
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<FormHelperText id="my-helper-text">
							Enter medicine price.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<TextField
							id="expiry-date"
							label="Expiry Date"
							type="date"
							value={expiryDate}
							onChange={(e) => setExpiryDate(e.target.value)}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<FormHelperText id="my-helper-text">
							Select the expiry date.
						</FormHelperText>
					</FormControl>
				</Stack>

				<Button variant="contained" color="primary" type="submit">
					Add Medicine
				</Button>
			</form>
		</div>
	);
};

export default AddMedicine;
