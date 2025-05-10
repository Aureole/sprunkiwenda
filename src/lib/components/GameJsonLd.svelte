<script lang="ts">
  import type { GameConfig } from '$lib/types';
  import siteConfig from '$lib/data/site.json';
    import { getCoverUrl, getGameUrl } from '$lib/helper';
  export let config: GameConfig;
</script>
<svelte:head>
  {@html `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["VideoGame", "WebApplication"],
  "applicationCategory": "Game",
  "name": "${config.title}",
  "url": "${getGameUrl(siteConfig, config)}",
  "description": "${config.description}",
  "image": "${getCoverUrl(siteConfig, config)}",
  "publisher": {
    "@type": "Organization",
    "name": "${siteConfig.organization}"
  }
}
  </script>`}
</svelte:head>