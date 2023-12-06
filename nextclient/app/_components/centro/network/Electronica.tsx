"use client";
import React, { useState } from "react";
import CirclePlusIcon from "@/app/_icons/CirclePlusIcon";
import { IElectronica } from "@/app/_interfaces/ICentro";
import ContainerWrap from "../../container/ContainerWrap";
import { useCentro } from "@/app/_context/useCentro";
import { useUser } from "@/app/_context/useUser";
import { Perfil } from "@/app/_utils/constants";
import NetworkDeviceItem from "./NetworkDeviceItem";
import PlusIcon from "@/app/_icons/PlusIcon";
import RoundButtonIcon from "../../buttons/RoundButtonIcon";

interface Props {
	title?: string;
	electronica: IElectronica[] | undefined;
	showAddButton?: boolean;
}
export default function Electronica({
	title,
	electronica,
	showAddButton = true,
}: Props) {
	const user = useUser((state) => state.user);
	//const electronica = useCentro((state) => state.selectedCentro?.electronica);

	const isLoading = useCentro((state) => state.isLoading);

	const [addingNewItem, setAddingNewItem] = useState(false);
	const toggleAddingNewItem = () => {
		setAddingNewItem(!addingNewItem);
	};

	return (
		<ContainerWrap>
			<ContainerWrap.Title title={title || "Electrónica"} />
			{(user?.grupo == Perfil.Sistemas || user?.grupo == Perfil.Admin) &&
				showAddButton && (
					<div className="absolute z-50 top-2 right-2 flex items-center justify-center">
						<RoundButtonIcon
							icon={
								<PlusIcon
									height={14}
									width={14}
									strokeWidth={2.5}
								/>
							}
							action={toggleAddingNewItem}
						/>
					</div>
				)}
			<ContainerWrap.Content className="px-4 p-2 h-[calc(100%-2.5rem)]">
				<div className="grid grid-cols-3 gap-2 h-fit">
					{addingNewItem && (
						<NetworkDeviceItem
							device={null}
							toggleAddingNewItem={toggleAddingNewItem}
						/>
					)}
					{electronica &&
						electronica.map((device: IElectronica) => {
							return (
								<NetworkDeviceItem
									key={device.id}
									device={device}
									toggleAddingNewItem={toggleAddingNewItem}
								/>
							);
						})}
					{isLoading && (!electronica || electronica.length < 1) && (
						<>
							{Array.apply(0, Array(24)).map((x, i) => {
								return (
									<div
										key={i}
										className="py-1 px-2 w-full h-full"
									>
										<div
											className={`skeleton rounded-full h-5`}
										></div>
									</div>
								);
							})}
						</>
					)}
				</div>
			</ContainerWrap.Content>
		</ContainerWrap>
	);
}
