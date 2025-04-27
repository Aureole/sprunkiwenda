<script lang="ts">
  import GamePage from '$lib/components/GamePage.svelte';
  import type { GameConfig } from '$lib/types';
  import puzzleMasterConfig from '$lib/data/games/sprunki-phase-777-3-7.json';
  import puzzleMasterInstructions from '$lib/data/games/sprunki-phase-777-3-7.md?raw';
  
  let config: GameConfig = {
    ...puzzleMasterConfig,
    instructions: puzzleMasterInstructions
  };
</script>

<GamePage config={config} />