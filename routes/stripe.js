const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/payment", async (req, res) => {
	console.log(`This is req.body`)
	console.log(req.body)
	
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: "T-shirt",
					},
					unit_amount: Math.round(req.body.amount*100),
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: "http://localhost:3000/success/",
		cancel_url: "http://localhost:3000/cancel/",
	});
  console.log(`This is session`)
  console.log(session)
  
	res.status(200).json({data:session});
});

module.exports = router;
