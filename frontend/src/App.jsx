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
				</Routes>
			</Router>
		</>
	);
}

export default App;
