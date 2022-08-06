import { readdirSync } from 'fs';

function getFiles(path, ending) {
	return readdirSync(path).filter((file) => file.endsWith(ending));
}

export default getFiles;
