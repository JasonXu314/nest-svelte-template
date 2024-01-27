<script lang="ts">
	import { params, path, route, user } from '$meta';

	export let initial: number = 0;

	let counter: number = initial;
</script>

<h1>Hello, {$params.name}</h1>
<button on:click={() => counter++}>{counter}</button>
<pre>{$path}</pre>
<pre>{$route}</pre>
<pre>{$user}</pre>
<pre>{JSON.stringify($params, null, 4)}</pre>
