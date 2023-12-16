/// <reference types="svelte" />
/// <reference types="vite/client" />

type Writable<T> = import('svelte/store').Writable<T>;

interface User {
	id: number;
	name: string;
}

declare module '*.svelte' {
	const component: ConstructorOfATypedSvelteComponent;
	export default component;
}

declare module '$meta' {
	export const path: Writable<string>;
	export const user: Writable<User>;
	export const extra: Writable<User>;
}

