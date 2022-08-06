export function validateEnv() {
	const requiredEnvs = ['TOKEN', 'MONGO_URI', 'CLIENT_ID'];

	requiredEnvs.forEach((envName) => {
		if (!process.env[envName]) {
			console.warn('ENV MISSING: ' + envName);
			return false;
		}
		return true;
	});
}
