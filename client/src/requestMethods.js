import axios from "axios";

console.log(`This is process.env.NODE_ENV..`)
console.log(process.env.NODE_ENV)

let BASE_URL
if (process.env.NODE_ENV === "development") {
	 BASE_URL = "http://localhost:5000/api/"; //for development
} else {
	//  BASE_URL = "https://justdoit.anhonestobserver.com/api/"; //for production if in aws or gcp
	 BASE_URL = "/api/";//for production in heroku
}

// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;

const currentUser = user && JSON.parse(user).currentUser;

const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
