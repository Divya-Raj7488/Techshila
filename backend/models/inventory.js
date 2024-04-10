const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    medicine_id: {
        type: Number,
        required: true,
    },

    medicineName: {
        type: String,
        required: true,

    },

    quantity: {
        type: Number,
        required: true,

    },

    price: {
        type: Number,
        required: true,
    },

    expiryDate: {
        type: Date,
        required: true,
    }
    ,

    address: [
        {
          houseName: {
            type: String,
            required: true,
          },
          locality: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            required: true,
            enum: [
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
            ],
          },
          country: {
            type: String,
            default: "India",
          },
          pincode: {
            type: Number,
            required: true
          },
        },
    ],
    
    managers: [
        {
            manager_number: {
                type: Number,
                required: true,
            },

            managerId: {
                tpye: String,
                required: true,
            },
        }
    ]



});

const InventoryModel = mongoose.model("Inventory", InventorySchema);
module.exports = InventoryModel;
