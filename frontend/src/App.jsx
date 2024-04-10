import { useState } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import SuppliersPage from "./Pages/SuppliersPage";
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
