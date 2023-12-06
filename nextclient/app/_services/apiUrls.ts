const baseUrl =
	process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
		? "http://10.61.141.247:8080/"
		: "http://localhost:8000/";

export const apiUrls = {
	// CENTROS
	centros: baseUrl + "centros",
	doPing: baseUrl + "conexion",
	lansCentro: baseUrl + "centros/lans",
	infoCentro: baseUrl + "centros/info",
	infoSistemasCentro: baseUrl + "centros/info-sistemas",
	prediccions: baseUrl + "centros/busqueda",
	electronicaCentro: baseUrl + "centros/electronica",
	racksCentro: baseUrl + "centros/racks",

	// AUTH
	buscarUsuario: baseUrl + "usuarios/buscar-usuario",
	login: baseUrl + "usuarios/login",
	recuperarUsuario: baseUrl + "usuarios/me",

	// USUARIOS
	usuarios: baseUrl + "usuarios",
	engadirUsuario: baseUrl + "usuarios/engadir",
	actualizarUsuario: baseUrl + "usuarios/actualizar",
	actualizarContrasinal: baseUrl + "usuarios/actualizar-contrasinal",
	eliminarUsuario: baseUrl + "usuarios/eliminar",

	// GLPI
	authGLPI: baseUrl + "glpi/auth",
	obterIncidenciasCentro: baseUrl + "glpi/incidencias-centro",
};
