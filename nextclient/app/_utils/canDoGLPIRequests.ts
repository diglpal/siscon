import { IUser } from "../_interfaces/IUser";

export default function canDoGLPIRequests(user: IUser) {
	if (user.glpi_search_id && user.glpi_csrf_token && user.glpi_search_id)
		return true;
	else return false;
}
