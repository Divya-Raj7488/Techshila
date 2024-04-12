import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	Button,
	Grow,
	TextField,
	Slide,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines } from "../../Slices/medicineSlice";
import { buyMedicines } from "../../Slices/cartSlice";

const Search = () => {
	const addToCart = (medicineId, name, inventoryId, quantity, price) => {
		console.log(name, quantity, price);
		if (quantity && quantity > 0) {
			dispatch(
				buyMedicines({ medicineId, inventoryId, quantity, name, price })
			);
		}
	};

	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const [showTable, setShowTable] = useState(false);
	const [filteredData, setFilteredData] = useState([]);
	const [quantities, setQuantities] = useState([]);
	const items = useSelector((state) => state.cart.items);

	useEffect(() => {
		setQuantities(filteredData.map(() => 0));
	}, [filteredData]);

	useEffect(() => {
		console.log(quantities);
		console.log(items);
	}, [quantities, items]);
	const medicines = useSelector((state) => state.medicine?.medicinesList);

	useEffect(() => {
		dispatch(getMedicines());
	}, []);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			filterData(search);
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [search]);

	const filterData = (searchQuery) => {
		if (searchQuery.trim() === "") {
			setShowTable(false);
			setFilteredData([]);
		} else {
			const filtered = medicines.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
			const transformedData = filtered.flatMap((item) =>
				item.inventories.map((inventory) => ({
					medicineId: item._id,
					name: item.name,
					type: item.type,
					inventoryName: inventory.inventoryName,
					inventoryId: inventory._id,
					price: item.price,
					expiryDate: item.expiryDate,
					manager: inventory.manager,
					address: inventory.address,
					todaysRevenue: inventory.todaysRevenue,
					currentMonthRevenue: inventory.currentMonthRevenue,
				}))
			);
			setShowTable(true);
			setFilteredData(transformedData);
		}
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleDecreaseQuantity = (index) => {
		if (quantities[index] > 0) {
			setQuantities((prevQuantities) => {
				const newQuantities = [...prevQuantities];
				newQuantities[index] -= 1;
				return newQuantities;
			});
		}
	};

	const handleIncreaseQuantity = (index) => {
		setQuantities((prevQuantities) => {
			const newQuantities = [...prevQuantities];
			newQuantities[index] += 1;
			return newQuantities;
		});
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: "max-content",
				position: "relative", // Added position relative for proper positioning
			}}
		>
			<Box
				sx={{
					position: "absolute",
					top: showTable ? 0 : "15%", // Move to top when table is shown
					transition: `top ${showTable ? 2 : 0.8}s ease-in-out`, // Transition effect
					transform: showTable ? "translateY(-40%)" : "translateY(0)", // Center when not shown
					width: "100%",
					maxWidth: 500,
					marginBottom: 2,
					marginTop: 5,
					zIndex: 1, // Ensure search bar stays above table
				}}
			>
				<TextField
					fullWidth
					label="Search Medicine"
					variant="outlined"
					value={search}
					onChange={handleSearchChange}
				/>
			</Box>

			<Slide direction="down" in={showTable} mountOnEnter unmountOnExit>
				<Box
					sx={{
						width: "100%",
						maxWidth: 1200,
						marginTop: showTable ? 15 : 0, // Add margin when table is shown
					}}
				>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Name
										</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Type
										</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Inventory
										</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Price
										</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Quantity
										</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										></Typography>
									</TableCell>
									<TableCell align="center">
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Total Amount
										</Typography>
									</TableCell>
									<TableCell />
									<TableCell />
									<TableCell />
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredData.map((item, index) => (
									<TableRow key={`${item._id}`}>
										<TableCell>{item.name}</TableCell>
										<TableCell align="right">
											{item.type}
										</TableCell>
										<TableCell align="center">
											{item.inventoryName}
										</TableCell>
										<TableCell align="center">
											{item.price}
										</TableCell>
										<TableCell align="center">
											{quantities[index]}
										</TableCell>
										<TableCell align="center">
											<Button
												variant="outlined"
												onClick={() =>
													handleDecreaseQuantity(
														index,
														item._id
													)
												}
											>
												<RemoveIcon />
											</Button>
											<Button
												variant="contained"
												onClick={() =>
													handleIncreaseQuantity(
														index,
														item._id
													)
												}
											>
												<AddIcon />
											</Button>
										</TableCell>

										<TableCell align="center">
											{item.price * quantities[index]}
										</TableCell>

										<TableCell>
											<Button
												variant="contained"
												onClick={() =>
													addToCart(
														item.medicineId,
														item.name,
														item.inventoryId,
														quantities[index],
														item.price
													)
												}
											>
												Add to Cart
											</Button>
										</TableCell>
										<TableCell></TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Slide>
		</Box>
	);
};

export default Search;
