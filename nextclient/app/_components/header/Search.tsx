import { useCentro } from "@/app/_context/useCentro";
import CloseIcon from "@/app/_icons/CloseIcon";
import SearchIcon from "@/app/_icons/SearchIcon";
import { ICentro } from "@/app/_interfaces/ICentro";
import { buscarCentro, escollerCentro } from "@/app/_services/centros";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Search() {
	const [search, setSearch] = useState("");
	const [predictions, setPredictions] = useState<ICentro[]>([]);
	const img = "/images/scenary2.jpg";
	const selectCentro = useCentro((state) => state.selectCentro);

	const refInputPlaceholder = useRef<any>(null);
	const inputRef = useRef<any>(null);
	const predictionsRef = useRef<any>(null);

	const handleInputRef = (e: any) => {
		if (
			predictionsRef.current &&
			predictionsRef.current.contains(e.target)
		) {
			refInputPlaceholder.current.classList.remove("hidden");
		} else if (inputRef.current && !inputRef.current.contains(e.target)) {
			refInputPlaceholder.current.classList.remove("hidden");
			setSearch("");
		}
	};

	const hideInputPlaceholder = () => {
		refInputPlaceholder.current.classList.add("hidden");
	};

	const handleSeleccionarCentro = async (centroId: number) => {
		const data = await escollerCentro(centroId);
		selectCentro(data);
		setSearch("");
		refInputPlaceholder.current.classList.remove("hidden");
	};

	const handleSubmitSearch = (e: any) => {
		e.preventDefault();
		if (predictions.length > 0) handleSeleccionarCentro(predictions[0].id);
	};

	const request = debounce(async (input: string) => {
		if (input != "") {
			const data = await buscarCentro(input);
			setPredictions(data);
		} else setPredictions([]);
	}, 200);

	const debounceRequest = useCallback((input: string) => request(input), []);

	const onChange = (e: any) => {
		setSearch(e.target.value);
		debounceRequest(e.target.value);
	};

	useEffect(() => {
		window.addEventListener("mousedown", handleInputRef);
		return () => {
			window.removeEventListener("mousedown", handleInputRef);
		};
	}, []);

	return (
		<div className="flex flex-col relative self-center justify-self-center">
			<div className="relative flex items-center text-gray-300">
				<form onSubmit={handleSubmitSearch}>
					<input
						ref={inputRef}
						type="text"
						id="centro"
						autoComplete="off"
						value={search}
						onChange={onChange}
						onFocus={hideInputPlaceholder}
						className="bg-black25 rounded-md w-80 h-[28px] 2xl:w-96 pl-4 z-10"
					/>
					<div
						className="absolute inset-0 flex items-center justify-center gap-x-1 z-0 pointer-events-none"
						ref={refInputPlaceholder}
					>
						<div>
							<SearchIcon
								height={16}
								width={16}
								strokeWidth={1.2}
							/>
						</div>
						<div className="font-medium">Buscar...</div>
					</div>
				</form>
				<div className="absolute right-0">
					{search.trim() !== "" && (
						<button
							onClick={() => setSearch("")}
							className="h-8 w-8 rounded-full flex items-center justify-center"
						>
							<CloseIcon height={16} width={16} strokeWidth={2} />
						</button>
					)}
				</div>
			</div>
			{predictions && predictions.length > 0 && search.trim() !== "" ? (
				<div
					className="absolute top-10 w-full left-0 z-50 bg-white rounded-md shadow-md border border-black25 overflow-hidden"
					ref={predictionsRef}
				>
					{predictions &&
						predictions.map((prediction) => {
							return (
								<div
									key={prediction.id}
									onClick={() =>
										handleSeleccionarCentro(prediction.id)
									}
									className="p-2 flex gap-x-4 cursor-pointer hover:bg-gray-200"
								>
									<div className="w-16 h-14">
										<img
											className="w-full h-full rounded-md"
											src={prediction.imaxe || img}
											alt=""
										/>
									</div>
									<div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-xs">
										<div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
											{prediction.centro}
										</div>
										<div className="font-medium text-slate-600">
											{prediction.concello}
										</div>
									</div>
								</div>
							);
						})}
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
