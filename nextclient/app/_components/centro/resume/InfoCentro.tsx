import React from "react";
import { useCentro } from "@/app/_context/useCentro";
import { useUser } from "@/app/_context/useUser";
import { Perfil } from "@/app/_utils/constants";
import PencilIcon from "@/app/_icons/PencilIcon";
import ContainerWrap from "../../container/ContainerWrap";

interface Props {
	setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
const InfoCentro = ({ setEdit }: Props) => {
	const user = useUser((state) => state.user);
	const selectedCentro = useCentro((state) => state.selectedCentro);

	return (
		<ContainerWrap>
			<ContainerWrap.Content>
				{user?.grupo === Perfil.Sistemas ||
				user?.grupo === Perfil.Admin ? (
					<div className="absolute top-4 right-4 flex items-center gap-x-2">
						<button
							className="bg-white rounded-full p-[2px] border border-gray-300 hover:scale-110"
							onClick={(e) => setEdit(true)}
						>
							<PencilIcon
								height={16}
								width={16}
								strokeWidth={2}
							/>
						</button>
					</div>
				) : (
					<></>
				)}
				<div className="bg-white p-3 rounded-xl overflow-hidden">
					<div className="h-40">
						<img
							className="h-full w-full rounded-lg"
							src={
								selectedCentro?.imaxe || "/images/scenary2.jpg"
							}
							alt=""
						/>
					</div>
					<div className="mt-8">
						<div className="flex flex-col gap-y-2 text-[11px]">
							<div className="flex gap-x-5">
								<div className="w-16 font-medium">Centro</div>
								<div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
									{selectedCentro?.centro}
								</div>
							</div>
							<div className="flex gap-x-5">
								<div className="w-16 font-medium">ID</div>
								<div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
									{selectedCentro?.sf}
								</div>
							</div>
							<div className="flex gap-x-5">
								<div className="w-16 font-medium">Concello</div>
								<div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
									{selectedCentro?.concello}
								</div>
							</div>
							<div className="flex gap-x-5">
								<div className="w-16 font-medium">TAP</div>
								<div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
									{selectedCentro?.tap}
								</div>
							</div>
							<div className="flex gap-x-5">
								<div className="w-16 font-medium">TAR</div>
								<div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
									{selectedCentro?.tar}
								</div>
							</div>
							<div className="mt-4 flex flex-col gap-y-2">
								<div className="w-16 font-medium whitespace-nowrap">
									Información adicional
								</div>
								<div>
									{selectedCentro?.comentario !== "" ? (
										<>
											<textarea
												className="outline-none p-2 resize-none w-full h-28"
												name="comentario"
												id="comentario"
												disabled
												value={
													selectedCentro?.comentario
												}
											></textarea>
										</>
									) : (
										<div>
											<span>
												Non hai información adicional
											</span>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</ContainerWrap.Content>
		</ContainerWrap>
	);
};

export default InfoCentro;
