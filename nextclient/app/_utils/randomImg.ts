export const randomImg = () => {
	const imgs = 7;
	const random = Math.floor(Math.random() * imgs);
	return `/images/scenary${random}.jpg`;
};
