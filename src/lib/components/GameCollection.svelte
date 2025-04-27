<script lang="ts">
  import "$lib/styles/theme.css";
  import { type GameCollectionConfig } from '$lib/types';
  import siteConfig from '$lib/data/site.json';
  import { getCoverUrl, getGameUrl } from '$lib/helper';
  
  export let config: GameCollectionConfig;
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  
  // Array to store loaded game data
  let games: Array<{
    id: string;
    title: string;
    coverImage: string;
    href: string;
  }> = [];
  
  // Load game data for each game ID
  $: {
    const loadGames = async () => {
      if (config.gameIds) {
        const tmp = await Promise.all(
          config.gameIds.map(async (id) => {
            try {
              // Dynamic import of game data
              const gameModule = await import(`../data/games/${id}.json`);
              const gameData = gameModule.default;
              
              return {
                id: gameData.id,
                title: gameData.title,
                coverImage: getCoverUrl(siteConfig, gameData),
                href: getGameUrl(siteConfig, gameData),
              };
            } catch (error) {
              return undefined;
            }
          })
        )
        games = tmp.filter((game) => game !== undefined);
      }
    };
    
    loadGames();
  }
</script>

<div class="game-collection" class:vertical={orientation === 'vertical'}>
  <h2 class="collection-title">{config.title}</h2>
  
  <div class="games-grid" class:vertical={orientation === 'vertical'}>
    {#each games as game}
      <a href={game.href} class="game-card">
        <div class="game-card-image-container">
          <img src={game.coverImage} alt={game.title} class="game-card-image" />
        </div>
        <div class="game-card-title" style="--title: '{game.title}'"></div>
      </a>
    {/each}
  </div>
</div>

<style>
  .game-collection {
    margin: 2rem 0;
    width: 100%;
  }

  .collection-title {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 1.5rem 0;
    color: var(--color-text-primary);
    position: relative;
    padding-left: 1.2rem;
    background: linear-gradient(to right, var(--color-text-primary), var(--color-text-tertiary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .collection-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 1.2em;
    background: var(--gradient-primary);
    border-radius: 6px;
    box-shadow: 0 3px 10px var(--color-primary-light);
  }

  .games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 1.8rem;
    width: 100%;
  }

  .games-grid.vertical {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .game-card {
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 20px;
    overflow: hidden;
    background-color: var(--color-background-primary);
    box-shadow: 0 10px 20px var(--color-shadow-secondary);
    position: relative;
  }

  .game-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px var(--color-primary-light);
  }

  .game-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transition: transform 0.4s ease;
    transform-origin: left;
  }

  .game-card:hover::after {
    transform: scaleX(1);
  }

  .game-card-image-container {
    position: relative;
    padding-top: 75%; /* 1:1 Aspect Ratio */
    overflow: hidden;
  }

  .game-card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .game-card:hover .game-card-image {
    transform: scale(1.08);
  }

  .game-card-title::before {
    content: var(--title);
  }

  .game-card-title {
    padding: 0.8rem;
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary);
    text-align: center;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Vertical orientation specific styles */
  .vertical {
    max-height: 100%;
    overflow-y: auto;
  }

  .vertical .game-card {
    border-radius: 16px;
    box-shadow: 0 5px 10px var(--color-shadow-tertiary);
  }

  .vertical .game-card-title {
    font-size: 0.75rem;
    padding: 0.6rem 0.4rem;
    -webkit-line-clamp: 2;
  }

  .vertical .collection-title {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }

  .vertical .game-card:hover {
    transform: translateY(-5px);
  }

  .vertical .game-card-image-container {
    padding-top: 75%; /* Keep 1:1 aspect ratio */
  }

  @media (max-width: 768px) {
    .collection-title {
      font-size: 1.5rem;
      margin-bottom: 1.2rem;
    }
    
    .games-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1.2rem;
    }
    
    .game-card {
      border-radius: 16px;
    }
    
    .game-card-title {
      font-size: 0.9rem;
      padding: 0.7rem;
    }
  }

  @media screen and (min-width: 1601px) {
    .games-grid {
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 2rem;
    }
  }
  
  @media screen and (min-width: 1801px) {
    .games-grid {
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 2.2rem;
    }
  }
  
  /* Add some subtle animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .game-card {
    animation: fadeIn 0.5s ease forwards;
  }
  
  .games-grid > :nth-child(1) { animation-delay: 0.1s; }
  .games-grid > :nth-child(2) { animation-delay: 0.2s; }
  .games-grid > :nth-child(3) { animation-delay: 0.3s; }
  .games-grid > :nth-child(4) { animation-delay: 0.4s; }
  .games-grid > :nth-child(5) { animation-delay: 0.5s; }
  .games-grid > :nth-child(n+6) { animation-delay: 0.6s; }
</style>