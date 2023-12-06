"use client";
import React, { useState } from "react";
import { useCentro } from "@/app/_context/useCentro";
import { ResultadosCargando } from "../../ResultadosCargando";
import { ILan } from "@/app/_interfaces/ICentro";
import ContainerWrap from "../../container/ContainerWrap";
import { useUser } from "@/app/_context/useUser";
import { Perfil } from "@/app/_utils/constants";
import LAN from "./LAN";
import PlusIcon from "@/app/_icons/PlusIcon";

const LANs = () => {
	const user = useUser((state) => state.user);
	const lans = useCentro((state) => state.selectedCentro?.lans);
	const isLoading = useCentro((state) => state.isLoading);

	const [addingNewItem, setAddingNewItem] = useState(false);

	const toggleAddingNewItem = () => {
		setAddingNewItem(!addingNewItem);
	};

	return (
		<ContainerWrap>
			{(user?.grupo == Perfil.Sistemas ||
				user?.grupo == Perfil.Admin) && (
				<div className="absolute z-50 top-2 right-2 flex items-center justify-center">
					<button
						className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110"
						onClick={toggleAddingNewItem}
					>
						<PlusIcon height={14} width={14} strokeWidth={2.5} />
					</button>
				</div>
			)}
			<ContainerWrap.Title title="LANs" />
			<ContainerWrap.Content className="h-[calc(100%-2.5rem)]">
				<div className="flex flex-col gap-y-2 py-1">
					{isLoading && !lans ? (
						<ResultadosCargando rows={3} cols={3} height={5} />
					) : (
						<></>
					)}
					{addingNewItem && (
						<LAN
							lan={null}
							toggleAddingNewItem={toggleAddingNewItem}
						/>
					)}
					{lans &&
						lans.map((lan: any) => {
							return (
								<LAN
									key={lan.id}
									lan={lan}
									toggleAddingNewItem={toggleAddingNewItem}
								/>
							);
						})}
				</div>
			</ContainerWrap.Content>
		</ContainerWrap>
	);
};

export default LANs;
