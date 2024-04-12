import React, { useEffect, useState } from "react";
import useGetUser from "../utils/useGetUser";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getManagers } from "../Slices/managerSlice";

import {
	createInventory,
	getInventories,
	updateManager,
} from "../Slices/inventorySlice";

import InventoryTable from "../Components/Inventory/InventoryTable";

const InventoriesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getManagers());
    dispatch(getInventories());
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedManager, setSelectedManager] = useState("");
  const [selectedInventory, setSelectedInventory] = useState("");
  const [houseName, setHouseName] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [medId, setMedId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const managers = useSelector((state) => state.manager.managersList);
  const inventories = useSelector((state) => state.inventory.inventoriesList);

  const handleSave = () => {
    dispatch(
      createInventory({
        inventoryName: selectedInventory,
        manager: selectedManager,
        address: [
          {
            houseName,
            locality,
            city,
            state,
            country: "India",
            pincode,
          },
        ],
        medicines: [
          {
            medId,
            Quantity: quantity,
            price,
          },
        ],
      })
    ).then(() => {
      dispatch(getInventories());
      handleClose();
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography p={3} variant="h4" fontFamily="Poppins">
        Inventories
      </Typography>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add Inventory
        </Button>
        <Dialog maxWidth="md" open={open} onClose={handleClose}>
          <DialogTitle>Add an Inventory</DialogTitle>
          <DialogContent>
            <Box sx={{ px: 4, py: 3, width: "400px" }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Manager</InputLabel>
                <Select
  value={selectedManager}
  label="Manager"
  onChange={(e) => setSelectedManager(e.target.value)}
>
  {managers && managers.map((manager) => (
    <MenuItem key={manager.ID} value={manager.ID}>
      {manager.name}
    </MenuItem>
  ))}
</Select>

              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Inventory</InputLabel>
                <Select
  value={selectedInventory}
  onChange={(e) => setSelectedInventory(e.target.value)}
>
  <MenuItem value="" disabled>
    Select Inventory
  </MenuItem>
  {inventories && inventories.map((inventory) => (
    <MenuItem key={inventory.ID} value={inventory.ID}>
      {inventory.inventoryName}
    </MenuItem>
  ))}
</Select>

              </FormControl>
              {/* Address fields */}
              {/* Medicines fields */}
              {/* Your remaining form fields */}
			  	{/* Address fields */}
				  <FormControl
								fullWidth
								sx={{ mb: 2 }}
							>
								<input
									type="text"
									value={houseName}
									onChange={(e) =>
										setHouseName(e.target.value)
									}
									placeholder="House Name"
									style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
								/>
							</FormControl>
							<FormControl
								fullWidth
								sx={{ mb: 2 }}
							>
								<input
									type="text"
									value={locality}
									onChange={(e) =>
										setLocality(e.target.value)
									}
									placeholder="Locality"
									style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
								/>
							</FormControl>
							<FormControl
								fullWidth
								sx={{ mb: 2 }}
							>
								<input
									type="text"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									placeholder="City"
									style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
								/>
							</FormControl>
							<FormControl
								fullWidth
								sx={{ mb: 2 }}
							>
								<Select
									value={state}
									onChange={(e) => setState(e.target.value)}
									displayEmpty
									inputProps={{ "aria-label": "Without label" }}
									style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
								>
									<MenuItem value="" disabled>
										Select State

	const handleSave = () => {
		const data = {
			managerId: selectedManager,
			inventoryId: selectedInventory,
		};
		dispatch(updateManager(data));
		handleClose();
	};
	const inventories = useSelector((state) => state.inventory.inventorysList);
	const managers = useSelector((state) => state.manager.managersList);
	useGetUser();
	const user = useSelector((state) => state.user.userLoggedIn);
	const role = user?.role;
	useEffect(() => {
		if (role === "user") window.location.href = "/login";
	}, [role]);

	useEffect(() => {
		dispatch(getManagers());
		if (user?.email) dispatch(getInventories({ email: user?.email }));
	}, [user]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Inventories
			</Typography>
			<div>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClickOpen}
				>
					Add Inventory
				</Button>
				<Dialog maxWidth="md" open={open} onClose={handleClose}>
					<DialogTitle>Add a Inventory</DialogTitle>
					<Box sx={{ px: 4, py: 3, width: "400px" }}>
						<FormControl fullWidth>
							<InputLabel>Manager</InputLabel>
							<Select
								value={selectedManager}
								label="Manager"
								onChange={(e) => {
									setSelectedManager(e.target.value);
								}}
							>
								{managers?.map((manager) => (
									<MenuItem
										key={manager._id}
										value={manager._id}
									>
										{manager.fullName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl fullWidth style={{ marginTop: "20px" }}>
							<InputLabel>Inventory</InputLabel>
							<Select
								value={selectedInventory}
								label="Inventory"
								onChange={(e) => {
									setSelectedInventory(e.target.value);
								}}
							>
								{inventories?.map((inventory) => (
									<MenuItem
										key={inventory._id}
										value={inventory._id}
									>
										{inventory.inventoryName}

									</MenuItem>
									{[
										"Andaman and Nicobar Islands",
										"Andhra Pradesh",
										"Arunachal Pradesh",
										"Assam",
										"Bihar",
										"Chandigarh",
										"Chhattisgarh",
										"Dadra and Nagar Haveli and Daman and Diu",
										"Delhi",
										"Goa",
										"Gujarat",
										"Haryana",
										"Himachal Pradesh",
										"Jammu and Kashmir",
										"Jharkhand",
										"Karnataka",
										"Kerala",
										"Ladakh",
										"Lakshadweep",
										"Madhya Pradesh",
										"Maharashtra",
										"Manipur",
										"Meghalaya",
										"Mizoram",
										"Nagaland",
										"Odisha",
										"Puducherry",
										"Punjab",
										"Rajasthan",
										"Sikkim",
										"Tamil Nadu",
										"Telangana",
										"Tripura",
										"Uttar Pradesh",
										"Uttarakhand",
										"West Bengal",
									].map((stateName) => (
										<MenuItem
											key={stateName}
											value={stateName}
										>
											{stateName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl
								fullWidth
								sx={{ mb: 2 }}
							>
								<input
									type="number"
									value={pincode}
									onChange={(e) =>
										setPincode(e.target.value)
									}
									placeholder="Pincode"
									style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
								/>
							</FormControl>
							{/* Medicines fields */}
							<FormControl
								fullWidth
								sx={{ mb: 2 }}
							>
								<input
									type="number"
									value={medId}
									onChange={(e) => setMedId(e.target.value)}
									placeholder="Medicine ID"
									style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
								/>
							</FormControl>
							<FormControl
								fullWidth
								sx={{ mb: 2 }}
							>
								<input
									type="number"
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
									placeholder="Quantity"
									style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
								/>
							</FormControl>
							<FormControl
								fullWidth
								sx={{ mb: 2 }}
							>
								<input
									type="number"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									placeholder="Price"
									style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
								/>
							</FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
      <InventoryTable />
    </Box>
  );
};

export default InventoriesPage;
