import React, { useState } from "react";
import {
  Input,  FormControl,  InputLabel,  FormHelperText,  FormControlLabel,    Stack,  Button,  TextField , Select,
  MenuItem} from "@mui/material";
  




  


  const AddSupplier = () => {
    const [firstName, setFirstName] = useState("");

    const [email, setEmail] = useState("");
    const [phnNumber, setPhoneNumber] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [selectedMedicines, setSelectedMedicines] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        const supplierData = {
          firstName,
          
          email,
          phnNumber,
          dateOfJoining,
          selectedMedicines
        };
        console.log("Supplier Data:", supplierData);
        // You can perform further actions like sending data to backend here

        setFirstName("");
  setEmail("");
  setPhoneNumber("");
  setDateOfJoining("");
  setSelectedMedicines([]);
      };

      
    
  
    return (
      <div>
        <h1 style={{ color: "darkgrey" , paddingTop: "100px", paddingLeft: "510px" , paddingRight:"500px" , textAlign:"left" }}>Add Supplier's Details</h1>
        
        <form style={{ paddingTop: "50px", paddingLeft: "500px" , paddingRight:"500px" }}  onSubmit={handleSubmit}>
          <Stack spacing={1} direction="column" sx={{ marginBottom: 3 }}>
            <FormControl>
              <InputLabel htmlFor="fname">Name</InputLabel>
              <Input
                autoFocus="true"
                id="fname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormHelperText id="my-helper-text">
                Please enter name.
              </FormHelperText>
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
              <FormHelperText id="my-helper-text">
                Enter email address.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="phnNumber">Phone Number</InputLabel>
              <Input
                id="phnNumber"
                value={phnNumber}
                aria-describedby="my-helper-text"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <FormHelperText id="my-helper-text">
                Please enter phone number here.
              </FormHelperText>
            </FormControl>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4}}>
          <FormControl>
            <InputLabel id="medicines-label">Select Medicines</InputLabel>
            <Select
              labelId="medicines-label"
              id="medicines"
              multiple
              value={selectedMedicines}
              onChange={(e) => setSelectedMedicines(e.target.value)}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Paracetamol">Paracetamol</MenuItem>
              <MenuItem value="Ibuprofen">Ibuprofen</MenuItem>
              <MenuItem value="Aspirin">Aspirin</MenuItem>
              <MenuItem value="Dolo">Dolo65</MenuItem>
              <MenuItem value="Aspirin">Aspirin</MenuItem>

              {/* Add more MenuItem components for other medicines */}
            </Select>
            <FormHelperText> Select one or more medicines.</FormHelperText>
          </FormControl>
        </Stack>


            

          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <FormControlLabel
              control={
                <TextField
                  type="date"
                  value={dateOfJoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                ></TextField>
              }
              label="  Select date of Joining"
            />
          </Stack>
          
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>

          

        </form>
      </div>
    );
  };

  export default AddSupplier;