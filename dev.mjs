import { build, createServer } from 'vite';
import { collectDir } from './dev-utils.mjs';

process.env.NODE_ENV = 'development';

async function buildClient() {
	const sources = collectDir('src/client/routes').flatMap((route) => {
		let matches;
		if ((matches = /src\/client\/routes\/(.+)\.svelte$/.exec(route)) !== null) {
			return [`src/__client/routes/${matches[1]}`];
		} else {
			return [];
		}
	});

	await build({
		configFile: 'config/client/vite.config.mts',
		mode: 'development',
		build: {
			rollupOptions: {
				input: sources,
				output: {
					dir: 'dist/client'
				}
			}
		}
	});

	return build({
		configFile: 'config/client/vite.config.mts',
		mode: 'development',
		build: {
			ssr: true,
			emptyOutDir: false,
			rollupOptions: {
				input: sources,
				output: {
					dir: 'dist/client'
				}
			}
		}
	});
}

const server = await createServer({
	configFile: 'config/server/vite.config.mts',
	mode: 'development'
});

server.watcher.on('change', async (path) => {
	if (path.includes('src/client')) {
		await buildClient();
	}
});

await buildClient();
await server.listen();

