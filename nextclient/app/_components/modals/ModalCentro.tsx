import React, { useEffect, useState } from "react";
import { useCentro } from "../../_context/useCentro";
import Modal from "./Modal";
import { useUser } from "@/app/_context/useUser";
import { TipoVista } from "@/app/_utils/constants";
import NetworkIcon from "@/app/_icons/NetworkIcon";
import Aside from "../centro/aside/Aside";
import Resume from "../centro/resume/Resume";
import Network from "../centro/network/Network";
import LayoutGridIcon from "@/app/_icons/LayoutGridIcon";
import RackIcon from "@/app/_icons/RackIcon";
import RacksView from "../centro/racks/RacksView";
import PlanIcon from "@/app/_icons/PlanIcon";
import BuildingPlansView from "../centro/buildings/BuildingPlansView";
import { ToastContainer } from "react-toastify";

const ModalCentro = ({ handleCloseModal }: any) => {
	const user = useUser((state) => state.user);
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const isLoading = useCentro((state) => state.isLoading);
	const getInfoCentro = useCentro((state) => state.getInfoCentro);

	const [view, setView] = useState(TipoVista.Resume);

	const handleChooseView = (view: number) => {
		setView(view);
	};

	useEffect(() => {
		if (selectedCentro) getInfoCentro(selectedCentro);
	}, []);

	return (
		<Modal>
			<Modal.Title title={selectedCentro?.centro || ""} />
			<Modal.Close
				handleCloseModal={handleCloseModal}
				isLoading={isLoading}
			/>
			<Modal.Content>
				<div className="border border-solid border-gray-300 rounded-xl p-4 pl-2 grid grid-cols-[36px_1fr] gap-x-2 h-full">
					<Aside>
						<Aside.Button
							title="Resumo"
							view={TipoVista.Resume}
							isLoading={isLoading}
							choosedView={view}
							handleChooseView={handleChooseView}
							icon={
								<LayoutGridIcon
									height={20}
									width={20}
									strokeWidth={2}
								/>
							}
						/>
						<Aside.Button
							title="Rede"
							view={TipoVista.Network}
							isLoading={isLoading}
							choosedView={view}
							handleChooseView={handleChooseView}
							icon={
								<NetworkIcon
									height={20}
									width={20}
									strokeWidth={2}
								/>
							}
						/>
						<Aside.Button
							title="Racks"
							view={TipoVista.Racks}
							isLoading={isLoading}
							choosedView={view}
							handleChooseView={handleChooseView}
							icon={
								<RackIcon
									height={20}
									width={20}
									strokeWidth={2}
								/>
							}
						/>
						{selectedCentro?.edificios &&
							selectedCentro.edificios.length > 0 && (
								<Aside.Button
									title="Planos"
									view={TipoVista.BuildingPlans}
									isLoading={isLoading}
									choosedView={view}
									handleChooseView={handleChooseView}
									icon={
										<PlanIcon
											height={20}
											width={20}
											strokeWidth={2}
										/>
									}
								/>
							)}
					</Aside>
					{view === TipoVista.Resume ? <Resume /> : <></>}
					{view === TipoVista.Network ? <Network /> : <></>}
					{view === TipoVista.Racks ? <RacksView /> : <></>}
					{view === TipoVista.BuildingPlans ? (
						<BuildingPlansView />
					) : (
						<></>
					)}
				</div>
			</Modal.Content>
			<ToastContainer />
		</Modal>
	);
};

export default ModalCentro;
