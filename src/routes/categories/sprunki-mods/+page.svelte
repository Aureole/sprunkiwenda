<script lang="ts">
  import { GameCategoryPage } from '$lib/components';
  import config from '$lib/data/categories/sprunki-mods.json';
  import content from '$lib/data/categories/sprunki-mods.md?raw';
</script>

<GameCategoryPage {config} {content} />