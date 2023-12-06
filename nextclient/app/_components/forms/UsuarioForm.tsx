import React, { useState } from "react";
import { instance } from "../../_services/axios";
import { apiUrls } from "@/app/_services/apiUrls";
import { IUsuario } from "@/app/_interfaces/IUsuario";
import { Perfil } from "@/app/_utils/constants";
import SaveIcon from "@/app/_icons/SaveIcon";
import AddIcon from "@/app/_icons/AddIcon";

interface Props {
	usuario: IUsuario | null;
	handleCloseModal: () => void;
	setUsuarios: React.Dispatch<React.SetStateAction<IUsuario[]>>;
}

const UsuarioForm = ({ usuario, handleCloseModal, setUsuarios }: Props) => {
	const [newUser, setNewUser] = useState({
		id: usuario?.id || "",
		nome: usuario?.nome || "",
		usuario: usuario?.usuario || "",
		grupo: usuario?.grupo || Perfil.N1,
	});

	const handleInputChange = (e: any) => {
		if (e.target.value !== "") {
			setNewUser({ ...newUser, [e.target.name]: e.target.value });
		} else {
			setNewUser({ ...newUser, [e.target.name]: "" });
		}
	};

	const submitUpdateUsuario = async (e: any) => {
		e.preventDefault();
		await instance.post(apiUrls.actualizarUsuario, newUser);
		const { data } = await instance.get(apiUrls.usuarios);
		setUsuarios(data);
		handleCloseModal();
	};

	const submitEngadirUsuario = async (e: any) => {
		e.preventDefault();
		await instance.post(apiUrls.engadirUsuario, newUser);
		const { data } = await instance.get(apiUrls.usuarios);
		setUsuarios(data);
		handleCloseModal();
	};

	return (
		<form
			autoComplete="off"
			onSubmit={usuario ? submitUpdateUsuario : submitEngadirUsuario}
		>
			<div className="flex items-end justify-center gap-x-5">
				<div className="flex flex-col">
					<label
						htmlFor="nome"
						className="font-medium text-center mb-4"
					>
						Nome
					</label>
					<input
						type="text"
						name="nome"
						maxLength={300}
						value={newUser.nome}
						onChange={handleInputChange}
						className="border border-solid border-gray-300 h-8 2xl:w-96 rounded-md px-4 outline-none"
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="usuario"
						className="font-medium text-center mb-4"
					>
						Usuario
					</label>
					<input
						type="text"
						name="usuario"
						maxLength={20}
						value={newUser.usuario}
						onChange={handleInputChange}
						className="border border-solid border-gray-300 h-8 rounded-md px-4 outline-none"
						disabled={usuario != null}
						style={{
							backgroundColor:
								usuario != null ? "rgb(209 213 219)" : "",
						}}
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="grupo"
						className="font-medium text-center mb-4"
					>
						Grupo
					</label>
					<select
						name="grupo"
						id="grupo"
						defaultValue={newUser.grupo}
						onChange={handleInputChange}
						className="border border-solid border-gray-300 rounded-md h-8 px-4 outline-none"
					>
						<option value={Perfil.N1}>N1</option>
						<option value={Perfil.Sistemas}>Sistemas N2</option>
						<option value={Perfil.Aplicacions}>
							Aplicacións N2
						</option>
						<option value={Perfil.Admin}>Administrador</option>
					</select>
				</div>
				<div>
					{usuario != undefined ? (
						<button
							onClick={submitUpdateUsuario}
							className="bg-primary-color rounded-md h-8 px-1 text-white font-medium"
						>
							<SaveIcon height={20} strokeWidth={1.5} />
						</button>
					) : (
						<button
							onClick={submitEngadirUsuario}
							className="bg-primary-color rounded-md h-8 px-1 text-white font-medium"
						>
							<AddIcon height={20} strokeWidth={1.5} />
						</button>
					)}
				</div>
			</div>
		</form>
	);
};

export default UsuarioForm;
