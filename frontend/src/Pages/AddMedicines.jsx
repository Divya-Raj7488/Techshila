import React, { useState } from "react";
import {
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Stack,
  Button,
} from "@mui/material";

const AddMedicine = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const medicineData = {
      name,
      type,
      price,
      quantity,
    };
    console.log("Medicine Data:", medicineData);
    // Reset form fields
    setName("");
    setType("");
    setPrice(0);
    setQuantity(0);
  };

  return (
    <div>
      <h1 style={{ color: "darkgrey" , paddingTop: "100px", paddingLeft: "510px" , paddingRight:"500px" , textAlign:"left" }}>Add Medicine Details</h1>

      <form style={{ paddingTop: "50px", paddingLeft: "500px" , paddingRight:"500px" }} onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
          <FormControl>
            <InputLabel htmlFor="name">Medicine Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Please enter medicine name.</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="type">Medicine Type</InputLabel>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Please enter medicine type (e.g., Pain Relief, Antibiotic).</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Enter medicine price.</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="quantity">Quantity</InputLabel>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <FormHelperText id="my-helper-text">Enter initial quantity.</FormHelperText>
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