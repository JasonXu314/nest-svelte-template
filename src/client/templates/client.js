import Component from '__route.svelte';

new Component({ target: document.body, hydrate: true, props: window.__INITIAL_PROPS });
delete window.__INITIAL_PROPS;
document.getElementById('__init_script__').remove();

