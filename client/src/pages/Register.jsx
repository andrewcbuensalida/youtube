import styled from "styled-components";
import { useState } from "react";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 40%;
	padding: 20px;
	background-color: white;
	${mobile({ width: "75%" })}
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
`;

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
`;

const Agreement = styled.span`
	font-size: 12px;
	margin: 20px 0px;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`;
const Error = styled.span`
	color: red;
`;
const Register = () => {
	const [username, setUsername] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const dispatch = useDispatch();

	const { isFetching, error,errorMessage } = useSelector((state) => state.user);
	

	console.log(`This is errorMessage`)
	console.log(errorMessage)
	
	const handleClick = (e) => {
		e.preventDefault();
		register(dispatch, { username, password,email });
	};
	return (
		<Container>
			<Wrapper>
				<Title>CREATE AN ACCOUNT</Title>
				<Form onSubmit={handleClick}>
					<Input
						required
						placeholder="username"
						onChange={(e) => setUsername(e.target.value)}
					/>{" "}
					<Input
						required
						type="email"
						placeholder="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						required
						placeholder="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Agreement>
						By creating an account, I consent to the processing of
						my personal data in accordance with the{" "}
						<b>PRIVACY POLICY</b>
					</Agreement>
					<Button disabled={isFetching}>CREATE</Button>
					{error && <Error>{errorMessage}</Error>}
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Register;
