import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.quantity += action.payload.quantity;
			state.products.push(action.payload);
			state.total += action.payload.price * action.payload.quantity;
		},
		deleteCart: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		},
		editQuantity: (state, action) => {
			const batch = state.products.find(
				(product) => action.payload.batchID === product.batchID
			);
			if (action.payload.type === "inc" && batch) {
				batch.quantity += 1;
				state.quantity += 1;
				state.total += batch.price;
			} else if (action.payload.type === "dec" && batch) {
				batch.quantity -= 1;
				state.quantity -= 1;
				state.total -= batch.price;
				if (batch.quantity === 0) {
					state.products = state.products.filter(
						(batch) => batch.batchID !== action.payload.batchID
					);
				}
			}
		},
	},
});

export const { addProduct, deleteCart, editQuantity } = cartSlice.actions;
export default cartSlice.reducer;
