export interface ICentro {
	id: number;
	sf: string;
	centro: string;
	concello: string;
	comentario: string;
	imaxe: string;
	tap: string;
	tar: string;
	lans: ILan[];
	infoSistemas: IInfoSistemas;
	avarias: [];
	incidencias: IIncidencia[];
	electronica: IElectronica[];
	racks: IRack[];
	edificios: IEdificio[];
	electronicaComprobada: boolean;
}

export interface IInfoSistemas {
	controladora: string;
	contrasinal_edu_xunta: string;
	contrasinal_siega: string;
}

export interface ILan {
	id: number;
	centro_id: number;
	rango: string;
	rede: string;
	dhcp: boolean;
}

export interface IIncidencia {
	ticket: string;
	url: string;
	titulo: string;
	entidade: string;
	estado: string;
	prioridade: string;
	categoria: string;
	tecnico_asignado: string;
}

export interface IElectronica {
	id: number;
	centro_id: number;
	nome: string;
	tipo: string;
	modelo: string;
	ubicacion: string;
	estado?: string;
	ip: string;
}

export interface IRack {
	id: number;
	centro_id: number;
	nome: string;
	ubicacion: string;
	tipo: string;
}

export interface IEdificio {
	id: number;
	centro_id: number;
	nome: string;
	plano_url: string;
	plantas: IPlanta[];
}

export interface IPlanta {
	id: number;
	edificio_id: number;
	nome: string;
	plano_url: string;
}
