import { InternalServerErrorException } from '@nestjs/common';
import { readFileSync } from 'fs';

const template = readFileSync('src/client/templates/page.html').toString();

export function svelte(path: string, data: any, next: (e: any, rendered?: string) => void) {
	const props = { ...data };
	delete props._locals;
	delete props.cache;
	delete props.settings;

	const parts = path.split('/').map((part, i, arr) => (i === arr.length - 1 ? part.replace('.svelte', '.js') : part));
	const route = parts.slice(parts.indexOf('routes') + 1).join('/');
	import(/* @vite-ignore */ `${process.cwd()}/dist/client/routes/${route}`).then(({ default: page }) => {
		try {
			const { html, head } = page.render(props);

			next(
				null,
				template
					.replace('%SVELTE_HEAD%', `${head}\n<script id="__init_script__">window.__INITIAL_PROPS = ${JSON.stringify(props)}</script>`)
					.replace('%SVELTE_BODY%', `${html}\n<script type="module" src="/__app/${route}"></script>`)
			);
		} catch (err) {
			console.error(err);
			next(new InternalServerErrorException(`Unable to render route /${route.replace('/index.js', '')}`));
		}
	});
}

