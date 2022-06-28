import * as fs from "fs";
import * as path from "path";

export const hiddenDirname = ".learn-typing";

export interface Core {
	run(): void;
}

class CoreImpl implements Core {
	private static readonly blacklist = [".git", hiddenDirname];

	constructor(private readonly source: string) {
		if (!fs.existsSync(this.source)) {
			throw new Error(`${this.source} does not exists`);
		}

		const stats = fs.statSync(this.source);

		if (!stats.isDirectory()) {
			throw new Error(`${this.source} is not directory`);
		}
	}

	private recursivePrepareFilesystem(source: string, target: string) {
		const stats = fs.statSync(source);

		if (!stats.isDirectory()) {
			fs.copyFileSync(source, target);
			fs.writeFileSync(source, "");
			return;
		}

		fs.mkdirSync(target);
		fs.readdirSync(source).forEach((file) => {
			if (CoreImpl.blacklist.includes(file)) {
				return;
			}
			const filename = path.join(source, file);
			this.recursivePrepareFilesystem(
				filename,
				path.join(
					this.source,
					hiddenDirname,
					path.relative(this.source, filename)
				)
			);
		});
	}

	run(): void {
		const destination = path.join(this.source, hiddenDirname);

		if (!fs.existsSync(destination)) {
			this.recursivePrepareFilesystem(this.source, destination);
		}
	}
}

const createCore = (source: string): Core => {
	return new CoreImpl(source);
};

export default createCore;
