export interface IUser {
	token: string;
	grupo: string;
	nome: string;
	usuario: string;
	autenticado_glpi?: boolean;

	glpi_csrf_token?: string;
	glpi_cookie?: string;
	glpi_search_id?: string;
}
