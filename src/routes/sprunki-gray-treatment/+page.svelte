<script lang="ts">
  import GamePage from '$lib/components/GamePage.svelte';
  import type { GameConfig } from '$lib/types';
  import puzzleMasterConfig from '$lib/data/games/sprunki-gray-treatment.json';
  import puzzleMasterInstructions from '$lib/data/games/sprunki-gray-treatment.md?raw';
  
  let config: GameConfig = {
    ...puzzleMasterConfig,
    instructions: puzzleMasterInstructions
  };
</script>

<GamePage config={config} />