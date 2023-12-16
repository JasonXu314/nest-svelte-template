<script>
	import { extra, path, user } from '$meta';

	export let __meta, __props, __route;

	$path = __meta.path;
	$user = __meta.user;
	$extra = __meta.extra;
</script>

<svelte:component this={__route} {...__props}></svelte:component>
