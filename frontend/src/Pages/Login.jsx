import React, { useState } from "react";
import * as Components from "../Components/LoginSignup/loginsignup";
import { createUser, login } from "../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
	const dispatch = useDispatch();
	const [signIn, toggle] = React.useState(true);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [locality, setLocality] = useState("");
	const [houseName, setHouseName] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [pincode, setPincode] = useState("");

	const handleLogin = async () => {
		const userData = {
			email: email,
			password: password,
		};
		dispatch(login(userData))
			.then((response) => {
				if (response.type === "user/login/fulfilled") {
					window.location.href = "user";
				}
			})
			.catch((error) => {
				console.error("Failed to create the param:", error);
			});
	};
	const handleSignUp = async () => {
		const userData = {
			email: email,
			password: password,
			fullName: name,
			address: [
				{
					houseName: houseName,
					locality: locality,
					city: city,
					state: state,
					country: country,
					pincode: pincode,
				},
			],
		};
		dispatch(createUser(userData));
	};

	const error = useSelector((state) => state.user?.error);
	return (
		<Components.Container>
			<Components.SignUpContainer signinIn={signIn}>
				<Components.Form>
					<Components.Title>Create Account</Components.Title>
					<Components.Input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Components.Input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Components.Input
						type="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Components.Input
						type="text"
						placeholder="HouseName"
						value={houseName}
						onChange={(e) => setHouseName(e.target.value)}
					/>
					<Components.Input
						type="text"
						placeholder="Locality"
						value={locality}
						onChange={(e) => setLocality(e.target.value)}
					/>
					<Components.Input
						type="text"
						placeholder="City"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
					<Components.Input
						type="text"
						placeholder="State"
						value={state}
						onChange={(e) => setState(e.target.value)}
					/>
					<Components.Input
						type="text"
						placeholder="Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
					<Components.Input
						type="text"
						placeholder="Pincode"
						value={pincode}
						onChange={(e) => setPincode(e.target.value)}
					/>
					<Components.Button onClick={handleSignUp}>
						Sign Up
					</Components.Button>
				</Components.Form>
			</Components.SignUpContainer>

			<Components.SignInContainer signinIn={signIn}>
				<Components.Form>
					<Components.Title>Sign in</Components.Title>
					<Components.Input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Components.Input
						type="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Components.Anchor href="#">
						Forgot your password?
					</Components.Anchor>
					{error && <Components.Error>{error}</Components.Error>}
					<Components.Button
						onClick={(e) => {
							e.preventDefault();
							handleLogin();
						}}
					>
						Sign In
					</Components.Button>
				</Components.Form>
			</Components.SignInContainer>

			<Components.OverlayContainer signinIn={signIn}>
				<Components.Overlay signinIn={signIn}>
					<Components.LeftOverlayPanel signinIn={signIn}>
						<Components.Title>Welcome Back!</Components.Title>
						<Components.Paragraph>
							To keep connected with us please login with your
							personal info
						</Components.Paragraph>
						<Components.GhostButton onClick={() => toggle(true)}>
							Sign In
						</Components.GhostButton>
					</Components.LeftOverlayPanel>

					<Components.RightOverlayPanel signinIn={signIn}>
						<Components.Title>Hello, Friend!</Components.Title>
						<Components.Paragraph>
							Enter Your personal details and start journey with
							us
						</Components.Paragraph>
						<Components.GhostButton
							onClick={() => {
								toggle(false);
							}}
						>
							Sign Up
						</Components.GhostButton>
					</Components.RightOverlayPanel>
				</Components.Overlay>
			</Components.OverlayContainer>
		</Components.Container>
	);
}

export default Login;
