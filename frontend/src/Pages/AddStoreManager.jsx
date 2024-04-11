import React, { useState } from "react";
import {
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Stack,
  Button,
  MenuItem,
  Select
} from "@mui/material";

const AddStoreManager = () => {

  const [email, setEmail] = useState("");
  const [selectedInventory, setSelectedInventory] = useState("");

  const inventories = [
    { id: 1, name: "Inventory 1" },
    { id: 2, name: "Inventory 2" },
    { id: 3, name: "Inventory 3" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const managerData = {
      
      email,
      selectedInventory
    };
    console.log("Manager Data:", managerData);
    // Reset form fields
   
    setEmail("");
    setSelectedInventory("");
  };

  return (
    <div>
      <h1 style={{ color: "darkgrey" , paddingTop: "100px", paddingLeft: "510px" , paddingRight:"500px" , textAlign:"left" , fontSize:"30px"}}>Add Store Manager Details</h1>

      <form style={{ paddingTop: "50px", paddingLeft: "500px" , paddingRight:"500px" }} onSubmit={handleSubmit}>
        <Stack spacing={1} direction="column" sx={{ marginBottom: 4}}>
          
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Enter email address.</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel id="inventory-label">Select Inventory</InputLabel>
            <Select
              labelId="inventory-label"
              id="inventory"
              value={selectedInventory}
              onChange={(e) => setSelectedInventory(e.target.value)}
              input={<Input />}
            >
              {inventories.map((inventory) => (
                <MenuItem key={inventory.id} value={inventory.name}>
                  {inventory.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select an inventory to assign.</FormHelperText>
          </FormControl>
        </Stack>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddStoreManager;
