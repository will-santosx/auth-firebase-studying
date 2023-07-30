import {
	FaEnvelope,
	FaLock,
	FaUser,
	FaGoogle,
	FaSignInAlt,
} from "react-icons/fa";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "./config/firebase";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	signOut,
} from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [nameInput, setNameInput] = useState("");
	const [emailInput, setSetEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [loading, setLoading] = useState(false);

	auth ? signOut(auth) : null;

	function showNotification(text, type) {
		if (text && text !== "") {
			switch (type) {
				case "success":
					toast.success(`${text}`);
					break;
				case "error":
					toast.error(`${text}`);
					break;
				default:
					toast.info(`${text}`);
			}
		}
	}

	async function signUpWithEmail() {
		try {
			setLoading(true);
			await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
			const currentUser = auth.currentUser;

			if (currentUser) {
				await updateProfile(currentUser, {
					displayName: nameInput,
				});
				showNotification("Conta criada com sucesso.", "success");
			} else {
				showNotification("Ocorreu um erro ao criar a conta.", "error");
			}
		} catch (error) {
			console.error("Ocorreu um erro:", error);
			showNotification("Ocorreu um erro ao criar a conta.", "error");
		} finally {
			setLoading(false);
			console.log(auth.currentUser);
		}
	}

	if (auth.currentUser) {
		return (
			<main className="w-screen h-screen flex flex-col justify-center items-center">
				<span>Logado.</span>
			</main>
		);
	}

	if (loading) {
		return (
			<main className="w-screen h-screen flex flex-col justify-center items-center">
				<BeatLoader size={30} color="#121063" />
			</main>
		);
	}

	return (
		<main className="w-screen h-screen flex flex-col font-mono">
			<ToastContainer
				position="bottom-left"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="dark"
			/>
			<div className="bg-midnight p-2 h-6 flex items-center justify-center">
				<span className="tracking-wider text-light">
					aprendendo a utilizar os métodos de autenticação do firebase.
				</span>
			</div>
			<div className="w-full h-full flex flex-col items-center justify-start bg-gray-50">
				<h1 className="text-3xl text-center mt-10 text-midnight tracking-wide font-semibold">
					CREATE ACCOUNT
				</h1>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						signUpWithEmail();
					}}
					className="mt-10">
					<div className="flex bg-light px-2 py-1 items-center rounded-md gap-2 mb-4 focus-within:shadow-md">
						<label htmlFor="Nome">
							<FaUser size={18} className="text-midnight" />
						</label>
						<input
							onChange={(event) => setNameInput(event.target.value)}
							name="Nome"
							autoComplete="off"
							placeholder="* Nome Completo"
							required
							type="text"
							minLength={5}
							maxLength={40}
							className="bg-transparent flex-1 focus:outline-none"
						/>
					</div>
					<div className="flex bg-light px-2 py-1 items-center rounded-md gap-2 mb-4 focus-within:shadow-md">
						<label htmlFor="Email">
							<FaEnvelope size={18} className="text-midnight" />
						</label>
						<input
							onChange={(event) => setSetEmailInput(event.target.value)}
							name="Email"
							placeholder="* Email"
							autoComplete
							type="email"
							required
							className="bg-transparent flex-1 focus:outline-none"
						/>
					</div>
					<div className="flex bg-light px-2 py-1 items-center rounded-md gap-2 focus-within:shadow-md">
						<label htmlFor="Senha">
							<FaLock size={18} className="text-midnight" />
						</label>
						<input
							onChange={(event) => setPasswordInput(event.target.value)}
							name="Senha"
							required
							type="password"
							autoComplete="off"
							placeholder="* Senha"
							className="bg-transparent flex-1 focus:outline-none"
						/>
					</div>
					<button
						type="submit"
						className="bg-midnight transition-all hover:bg-blue-800 text-light w-full uppercase flex justify-center items-center my-6 gap-3 p-2 rounded-md">
						<FaSignInAlt />
						Acessar
					</button>
					<span className="flex w-full justify-center my-2">OU</span>
					<button className="bg-light text-midnight transition-all hover:bg-zinc-400 w-full uppercase flex justify-center items-center gap-3 p-2 rounded-md">
						<FaGoogle />
						Continue with Google
					</button>
				</form>
			</div>
		</main>
	);
}

export default App;
