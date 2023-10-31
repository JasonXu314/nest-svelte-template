/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
	const component: ConstructorOfATypedSvelteComponent;
	export default component;
}

