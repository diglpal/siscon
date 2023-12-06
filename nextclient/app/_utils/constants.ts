export enum Perfil {
	N1 = "n1",
	Aplicacions = "aplicacions",
	Sistemas = "sistemas",
	Admin = "admin",
}

export enum TipoRede {
	SEN_DETERMINAR = "Sen determinar",
	PRINCIPAL = "Rede principal",
	SECUNDARIA = "Rede secundaria",
	EDU_XUNTA_GAL = "Rede edu.xunta.gal",
}

export const PRIORIDADES = {
	"Moi urxente": "moi-urxente",
	Urxente: "urxente",
	Mediana: "mediana",
	Baixa: "baixa",
	"Moi baixa": "moi-baixa",
};

export const ESTADOS = {
	"En curso (asignada)": "en-curso",
	"En espera": "en-espera",
	Rematado: "rematado",
	Pechado: "pechado",
};

export enum TipoVista {
	Resume = 1,
	Network = 2,
	Racks = 3,
	BuildingPlans = 4,
}

export enum TipoElectronica {
	SEN_DETERMINAR = "Sen determinar",
	ROUTER = "Rede principal",
	SWITCH_ABALAR = "Rede secundaria",
	SWITCH_SIEGA = "SW_Siega",
	SWITCH_SECUNDARIO = "Switch",
	AP_SIEGA = "AP_Siega",
	AP_EDU_XUNTA_GAL = "AP_edu_xunta_gal",
}

export enum TipoRack {
	SEN_DETERMINAR = "Sen determinar",
	ARMARIO = "Armario",
	DE_PAREDE = "De parede",
}
