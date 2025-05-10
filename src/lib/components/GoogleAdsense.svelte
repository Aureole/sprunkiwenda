<script lang="ts">
  export let adsenseId: string;
</script>

<svelte:head>
  {@html `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}"
     crossorigin="anonymous"></script>`}
</svelte:head>