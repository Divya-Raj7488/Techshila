import React, { useState, useEffect } from "react";
import {
	Input,
	FormControl,
	InputLabel,
	FormHelperText,
	Stack,
	Button,
	TextField,
	Select,
	MenuItem,
} from "@mui/material";
import { createSupplier } from "../Slices/supplierSlice";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines } from "../Slices/medicineSlice";

const AddSupplier = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phnNumber, setPhoneNumber] = useState("");
	const [selectedMedicines, setSelectedMedicines] = useState([]);

	const medicines = useSelector((state) => state.medicine.medicinesList);

	useEffect(() => {
		dispatch(getMedicines());
	}, []);

	const handleSubmit = () => {
		dispatch(
			createSupplier({
				name: name,
				email: email,
				phone: phnNumber,
				medicines: selectedMedicines.map(
					(name) =>
						medicines.find((medicine) => medicine.name === name)._id
				),
			})
		);
	};

	return (
		<div>
			<form
				style={{ minWidth: "30rem", padding: "2rem" }}
				onSubmit={handleSubmit}
			>
				<Stack spacing={1} direction="column" sx={{ marginBottom: 3 }}>
					<FormControl>
						<InputLabel htmlFor="fname">Name</InputLabel>
						<Input
							id="fname"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>
				</Stack>
				<Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
					<FormControl>
						<InputLabel htmlFor="email">Email address</InputLabel>
						<Input
							id="email"
							value={email}
							aria-describedby="my-helper-text"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="phnNumber">
							Phone Number
						</InputLabel>
						<Input
							id="phnNumber"
							value={phnNumber}
							aria-describedby="my-helper-text"
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</FormControl>

					<Stack
						spacing={2}
						direction="row"
						sx={{ marginBottom: 4, width: "100%" }}
					>
						<FormControl>
							<InputLabel id="medicines-label">
								Select Medicines
							</InputLabel>
							<Select
								id="medicines"
								multiple
								fullWidth
								value={selectedMedicines}
								onChange={(e) =>
									setSelectedMedicines(e.target.value)
								}
								input={<Input />}
								renderValue={(selected) => selected.join(", ")}
							>
								{medicines?.length > 0 &&
									medicines.map((medicine) => (
										<MenuItem
											key={medicine._id}
											value={medicine.name}
										>
											{medicine.name}
										</MenuItem>
									))}
							</Select>
							<FormHelperText>
								{" "}
								Select one or more medicines.
							</FormHelperText>
						</FormControl>
					</Stack>
				</Stack>

				<Button variant="contained" color="success" type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default AddSupplier;
