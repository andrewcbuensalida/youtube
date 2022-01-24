import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import ScrollToTop from "./ScrollToTop";

const App = () => {
	const user = useSelector((state) => state.user.currentUser);
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
					<ScrollToTop />
				</Route>
				<Route path="/products/:category">
					<ProductList />
					<ScrollToTop />
				</Route>
				<Route path="/product/:id">
					<Product />
					<ScrollToTop />
				</Route>
				<Route path="/cart">
					<Cart />
					<ScrollToTop />
				</Route>
				<Route path="/success">
					<Success />
					<ScrollToTop />
				</Route>
				<Route path="/login">
					{user ? <Redirect to="/" /> : <Login />}
					<ScrollToTop />
				</Route>
				<Route path="/register">
					{user ? <Redirect to="/" /> : <Register />}
					<ScrollToTop />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
