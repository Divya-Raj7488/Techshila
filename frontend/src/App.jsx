import { useState } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import SuppliersPage from "./Pages/SuppliersPage";
import Sidebar from './Pages/Sidebar'; 
import AddSupplier from './Pages/AddSupplierPage'
import AddStoreManager from './Pages/AddStoreManager'

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Router>
				<Routes>
					<Route
						exact
						path="/suppliers"
						element={<SuppliersPage />}
					/>
					<Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/add-store-manager" element={<AddStoreManager />} />
          <Route path="/*" element={<Sidebar/>} /> {/* Default route */}
				</Routes>
			</Router>
		</>
	);
}

export default App;
