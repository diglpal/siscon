import { useCentro } from "@/app/_context/useCentro";
import { useUser } from "@/app/_context/useUser";
import React, { useState } from "react";
import Electronica from "../network/Electronica";
import ContainerWrap from "../../container/ContainerWrap";
import { IRack } from "@/app/_interfaces/ICentro";
import RackItem from "./RackItem";
import { Perfil, TipoElectronica } from "@/app/_utils/constants";
import PlusIcon from "@/app/_icons/PlusIcon";
import RoundButtonIcon from "../../buttons/RoundButtonIcon";
import { isSwitch } from "@/app/_utils/networkDevice";

export default function RacksView() {
	const user = useUser((state) => state.user);
	const electronica = useCentro((state) => state.selectedCentro?.electronica);
	const racks = useCentro((state) => state.selectedCentro?.racks);

	const [selectedRack, setSelectedRack] = useState(
		(racks && racks[0]) || null
	);
	const [addingNewItem, setAddingNewItem] = useState(false);
	const toggleAddingNewItem = () => {
		setAddingNewItem(!addingNewItem);
	};

	return (
		<div className="grid grid-cols-[500px_520px] grid-rows-[calc(500px+2rem)] gap-x-4">
			<div>
				<ContainerWrap>
					<ContainerWrap.Title title="Racks" />
					{(user?.grupo == Perfil.Sistemas ||
						user?.grupo == Perfil.Admin) && (
						<div className="absolute z-50 top-2 right-2 flex items-center justify-center">
							<RoundButtonIcon
								action={toggleAddingNewItem}
								icon={
									<PlusIcon
										height={14}
										width={14}
										strokeWidth={2.5}
									/>
								}
							/>
						</div>
					)}
					<ContainerWrap.Content className="px-4 p-2 h-[calc(100%-2.5rem)]">
						<div className="flex flex-col gap-y-2 py-1">
							{addingNewItem && (
								<RackItem
									rack={null}
									toggleAddingNewItem={toggleAddingNewItem}
									selectedRack={selectedRack}
									setSelectedRack={setSelectedRack}
								/>
							)}
							{racks &&
								racks.map((rack: IRack) => {
									return (
										<RackItem
											key={rack.id}
											rack={rack}
											toggleAddingNewItem={
												toggleAddingNewItem
											}
											selectedRack={selectedRack}
											setSelectedRack={setSelectedRack}
										/>
									);
								})}
						</div>
					</ContainerWrap.Content>
				</ContainerWrap>
			</div>
			<div className="grid grid-rows-2 gap-y-8">
				{selectedRack && (
					<Electronica
						title={`Electrónica en ${selectedRack?.nome}`}
						electronica={electronica?.filter(
							(el) => el.ubicacion == selectedRack?.nome
						)}
						showAddButton={false}
					/>
				)}
				<Electronica
					title="Routers e switches sen asignar"
					electronica={electronica?.filter(
						(el) =>
							(isSwitch(el.tipo as TipoElectronica) ||
								el.tipo == TipoElectronica.ROUTER) &&
							!el.ubicacion
					)}
					showAddButton={false}
				/>
			</div>
		</div>
	);
}
