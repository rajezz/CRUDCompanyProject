import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import { NotFound } from "./pages/NotFound";
import Companies from "./pages/companies";
import Users from "./pages/users";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/companies" element={<Companies />} />
				<Route path="/users" element={<Users />} />
				<Route path="/" element={<Navigate to={"/companies"} replace={true} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
