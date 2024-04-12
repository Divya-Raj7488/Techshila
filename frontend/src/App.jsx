import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SuppliersPage from "./Pages/SuppliersPage";
import StoreManagerPage from "./Pages/StoreManagerPage";

import StockPage from "./Pages/StocksPage";
import Sidebar from "./Components/Navnsidebar/sidebar";
import AddSupplier from "./Pages/AddSupplierPage";
import AddStoreManager from "./Pages/AddStoreManager";
import Bar from "./Pages/Bar";
import Login from "./Pages/Login";
import InventoriesPage from "./Pages/InventoriesPage";
import UserPage from "./Pages/UserPage";
import UserProfile from "./Pages/UserProfile";
import Summary from "./Pages/OrderSummary";
import AddMedicine from "./Pages/AddMedicines";
import OrderStatus from "./Pages/OrderStatus";
import Navbar from "./Components/Navnsidebar/navbar";
import ManagerCeo from "./Pages/ManagerCeo";import TrackOrderPage from "./Pages/TrackOrderPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/suppliers" element={<SuppliersPage />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/add-store-manager" element={<AddStoreManager />} />
          <Route path="/*" element={<Sidebar />} /> {/* Default route */}
          <Route exact path="/bar" element={<Bar />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/user" element={<UserPage />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route exact path="/summary" element={<Summary />} />
          <Route exact path="/store-manager" element={<StoreManagerPage />} />
          <Route exact path="/orderstatus" element={<OrderStatus />} />
          <Route exact path="/managerceo" element={<ManagerCeo />} />
          <Route exact path="/stocks" element={<StockPage />} />
          <Route exact path="/inventories" element={<InventoriesPage />} />
            {/*	<Route path="/managers" element={<ManagersPage />} /> */}					<Route
						exact
						path="/trackorder"
						element={<TrackOrderPage />}
					/>

        </Routes>
      </Router>
    </>
  );

}

export default App;
