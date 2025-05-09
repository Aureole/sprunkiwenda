<script lang="ts">
  import "$lib/styles/theme.css";
  import { onMount } from 'svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import siteConfig from "$lib/data/site.json";
  import { getCoverUrl, getGameUrl } from '$lib/helper';
  import GoogleAnalytics from './GoogleAnalytics.svelte';
  import type { CategoryConfig } from '$lib/types';
  
  export let config: CategoryConfig;
  export let content: string = ''; // Markdown content for the category description
  
  // Responsive state
  let isMobile = false;
  
  // Array to store loaded game data
  let games: Array<{
    id: string;
    title: string;
    coverImage: string;
    href: string;
  }> = [];

  onMount(() => {
    // Initial check
    checkMobileState();
    
    // Add resize listener
    window.addEventListener('resize', checkMobileState);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobileState);
    };
  });
  
  function checkMobileState() {
    isMobile = window.innerWidth <= 1200;
  }
  
  // Load game data for each game ID in the category
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

<svelte:head>
  <title>{config.seoTitle}</title>
  <meta name="title" content={config.seoTitle} />
  <meta name="description" content={config.description} />
  <link rel="canonical" href={`${siteConfig.baseUrl}/categories/${config.id}`} />
  <meta property="og:title" content={config.seoTitle} />
  <meta property="og:type" content='website'/>
  <meta property="og:description" content={config.description} />
  <meta property="og:url" content={`${siteConfig.baseUrl}/categories/${config.id}`} />
  <meta name="twitter:card" content='summary' />
  <meta name="twitter:title" content={config.seoTitle} />
  <meta name="twitter:description" content={config.description} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      height: 100%;
    }
    
    html {
      height: 100%;
    }
  </style>
  {#if siteConfig.microsoftClarityId}
    <script type="text/javascript">
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "rahuv2gc8i");
    </script>
  {/if}
</svelte:head>

<div class="app">
  <div class="page-container">
    <Header/>
    
    <main class="main-content">
      <section class="category-section">
        <h1 class="category-title">{config.title}</h1>
        
        <div class="category-games-grid">
          {#each games as game}
            <a href={game.href} class="game-card">
              <div class="game-card-image-container">
                <img src={game.coverImage} alt={game.title} class="game-card-image" />
              </div>
              <div class="game-card-title" style="--title: '{game.title}'"></div>
            </a>
          {/each}
        </div>
      </section>
      
      {#if content}
        <section class="category-description">
          <div class="content-wrapper">
            <SvelteMarkdown source={content} />
          </div>
        </section>
      {/if}
    </main>
    
    <Footer/>
  </div>
  {#if siteConfig.googleAnalyticsId}
    <GoogleAnalytics measurementId={siteConfig.googleAnalyticsId} />
  {/if}
</div>

<style>
  .page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #f8f9fa, #f0f2f5);
  }

  .main-content {
    flex-grow: 1;
    padding: 2rem;
    width: 90%;
    max-width: 1800px;
    margin: 0 auto;
  }

  .category-section {
    margin-bottom: 3rem;
  }

  .category-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #333;
    margin-bottom: 2rem;
    position: relative;
    padding-left: 1.5rem;
    line-height: 1.2;
    background: linear-gradient(to right, #333, #555);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }

  .category-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 70%;
    background: linear-gradient(to bottom, #0cebeb, #20e3b2);
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(12, 235, 235, 0.4);
  }

  .category-games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 2rem;
    width: 100%;
  }

  .game-card {
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 20px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    position: relative;
    animation: fadeIn 0.5s ease forwards;
  }

  .game-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(12, 235, 235, 0.2);
  }

  .game-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #0cebeb, #20e3b2);
    transform: scaleX(0);
    transition: transform 0.4s ease;
    transform-origin: left;
  }

  .game-card:hover::after {
    transform: scaleX(1);
  }

  .game-card-image-container {
    position: relative;
    padding-top: 100%; /* 1:1 Aspect Ratio */
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
    padding: 1rem;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Category description section */
  .category-description {
    background-color: white;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
    margin: 2rem 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  .category-description:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, #0cebeb, #20e3b2);
  }

  .content-wrapper {
    line-height: 1.7;
    color: #444;
    font-size: 1.05rem;
    max-width: 100%;
  }

  .content-wrapper :global(h1),
  .content-wrapper :global(h2),
  .content-wrapper :global(h3),
  .content-wrapper :global(h4),
  .content-wrapper :global(h5),
  .content-wrapper :global(h6) {
    color: #333;
    margin-top: 1.8em;
    margin-bottom: 0.8em;
    font-weight: 700;
  }

  .content-wrapper :global(h1) {
    font-size: 1.8rem;
    background: linear-gradient(to right, #0cebeb, #20e3b2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .content-wrapper :global(h2) {
    font-size: 1.5rem;
    position: relative;
    padding-bottom: 0.6rem;
  }
  
  .content-wrapper :global(h2:after) {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(to right, #0cebeb, #20e3b2);
    border-radius: 3px;
  }

  .content-wrapper :global(p) {
    margin: 1em 0;
  }

  .content-wrapper :global(ul),
  .content-wrapper :global(ol) {
    padding-left: 2.2rem;
    margin: 1em 0;
  }

  .content-wrapper :global(li) {
    margin: 0.5em 0;
  }
  
  .content-wrapper :global(li::marker) {
    color: #0cebeb;
  }

  .app {
    width: 100%;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Staggered animations */
  .category-games-grid > :nth-child(1) { animation-delay: 0.1s; }
  .category-games-grid > :nth-child(2) { animation-delay: 0.2s; }
  .category-games-grid > :nth-child(3) { animation-delay: 0.3s; }
  .category-games-grid > :nth-child(4) { animation-delay: 0.4s; }
  .category-games-grid > :nth-child(5) { animation-delay: 0.5s; }
  .category-games-grid > :nth-child(n+6) { animation-delay: 0.6s; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Responsive styles */
  @media screen and (min-width: 1601px) {
    .category-games-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 2.2rem;
    }
    
    .category-description {
      padding: 2.5rem 3.5rem;
    }
    
    .content-wrapper {
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 1.2rem;
    }
    
    .category-title {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }
    
    .category-games-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1.2rem;
    }
    
    .game-card {
      border-radius: 16px;
    }
    
    .game-card-title {
      font-size: 1rem;
      padding: 0.8rem;
    }
    
    .category-description {
      padding: 1.5rem;
      border-radius: 20px;
    }
  }

  @media (max-width: 480px) {
    .category-title {
      font-size: 1.5rem;
    }
    
    .category-games-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
    }
  }
</style>