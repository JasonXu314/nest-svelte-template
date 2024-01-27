import { InternalServerErrorException } from '@nestjs/common';
import { readFileSync } from 'fs';

const template = readFileSync('src/client/templates/page.html').toString();

export function svelte(path: string, data: any, next: (e: any, rendered?: string) => void) {
	console.log(data);

	const { props, __meta } = data;

	import(/* @vite-ignore */ `${process.cwd()}/dist/client/routes/${__meta.route}`)
		.then(({ default: page }) => {
			try {
				const { html, head } = page.render(props, __meta);

				next(
					null,
					template
						.replace(
							'%SVELTE_HEAD%',
							`${head}\n<script id="__init_script__">window.__INITIAL_PROPS=${JSON.stringify(props)};window.__ROUTE_META=${JSON.stringify(
								__meta
							)}</script>`
						)
						.replace('%SVELTE_BODY%', `${html}\n<script type="module" src="/__app/${__meta.route}.js"></script>`)
				);
			} catch (err) {
				console.error(err);
				next(new InternalServerErrorException(`Unable to render route /${__meta.route.replace('/index.js', '')}`));
			}
		})
		.catch((err) => {
			console.error(err);
			next(new InternalServerErrorException(`Unable to render route /${__meta.route.replace('/index.js', '')}`));
		});
}

