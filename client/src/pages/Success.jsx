import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Success = () => {
	const location = useLocation();
	//in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
	const data = location.state.stripeData;
	const cart = location.state.cart;
	const currentUser = useSelector((state) => state.user.currentUser);
	const [orderId, setOrderId] = useState(null);

	useEffect(() => {
		const createOrder = async () => {
			try {
				const res = await userRequest.post("/orders", {
					userId: currentUser._id,
					products: cart.products.map((item) => ({
						productId: item._id,
						quantity: item._quantity,
					})),
					amount: cart.total,
					address: data.shipping_address_collection,
				});
				setOrderId(res.data.id);
			} catch {}
		};
		data && createOrder();
	}, [cart, data, currentUser]);

	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{orderId
				? `Order has been created successfully. Your order number is ${orderId}`
				: `Successful. If you like this demo website, email me at andrewcbuensalida@gmail.com. I'm open for work.`}
			<Link to="/">
				<button style={{ padding: 10, marginTop: 20 }}>
					Go to Homepage
				</button>
			</Link>
		</div>
	);
};

export default Success;
