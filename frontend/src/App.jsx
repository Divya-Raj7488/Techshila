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
import createTheme from "@mui/material/styles/createTheme";

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
					<Route
						exact
						path="/store-manager"
						element={<StoreManagerPage />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
