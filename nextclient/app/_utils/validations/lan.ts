export function isValidLAN(str: string) {
	let regex = new RegExp(
		/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(3[0-2]|[12]?[0-9])$/
	);

	if (str == null) return false;

	if (regex.test(str) == true) return true;
	else return false;
}

export function isValidIP(str: string) {
	let regex = new RegExp(
		/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
	);

	if (str == null) return false;

	if (regex.test(str) == true) return true;
	else return false;
}
