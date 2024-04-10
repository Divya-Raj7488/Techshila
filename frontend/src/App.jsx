import { useState } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import SuppliersPage from "./Pages/SuppliersPage";
import StockPage from "./Pages/StocksPage";
import Sidebar from './Pages/Sidebar'; 
import AddSupplier from './Pages/AddSupplierPage'
import AddStoreManager from './Pages/AddStoreManager'
import Bar from "./Pages/Bar";

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
					<Route exact path="/stocks" element={<StockPage />} />
					<Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/add-store-manager" element={<AddStoreManager />} />
          <Route path="/*" element={<Sidebar/>} /> {/* Default route */}
					<Route
						exact
						path="/bar"
						element={<Bar />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
