<script lang="ts">
  import { type GameConfig } from '$lib/types';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import Game from './Game.svelte';
  import GameCollection from './GameCollection.svelte';
  import GameInstructions from './GameInstructions.svelte';
  import { onMount } from 'svelte';
  import siteConfig from "$lib/data/site.json";
  import gameCollections from '$lib/data/game-collections.json';
  import { getGameUrl, getCoverUrl, getSeoTitle } from '$lib/helper';
  import GoogleAnalytics from './GoogleAnalytics.svelte';
  
  export let config: GameConfig;
  
  // Responsive state
  let isMobile = false;
  
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
</script>

<svelte:head>
  <title>{getSeoTitle(siteConfig, config)}</title>
  <meta name="title" content={getSeoTitle(siteConfig, config)} />
  <meta name="description" content={config.description} />
  <link rel="canonical" href={getGameUrl(siteConfig, config)} />
  <meta property="og:title" content={getSeoTitle(siteConfig, config)} />
  <meta property="og:type" content='website'/>
  <meta property="og:description" content={config.description} />
  <meta property="og:url" content={getGameUrl(siteConfig, config)} />
  <meta property="og:image" content={getCoverUrl(siteConfig, config)} />
  <meta name="twitter:card" content='summary' />
  <meta name="twitter:title" content={getSeoTitle(siteConfig, config)} />
  <meta name="twitter:description" content={config.description} />
  <meta name="twitter:image" content={getCoverUrl(siteConfig, config)} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <div class="content-layout">
        <div class="main-column">
          <Game {config} />

          {#if gameCollections.popular}
            <div class="section-header">
              <div class="section-dot"></div>
              <div class="section-line"></div>
            </div>
            <GameCollection config={gameCollections.popular} orientation="horizontal" />
          {/if}
          
          <GameInstructions 
            instructions={config.instructions} 
            title={config.title}
          />
        </div>
        
        {#if gameCollections.trending}
          <div class="side-column">
            <div class="side-content">
              <GameCollection 
                config={gameCollections.trending} 
                orientation={isMobile ? "horizontal" : "vertical"} 
              />
            </div>
          </div>
        {/if}
      </div>
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
    max-width: 1800px;  /* Increased from 1200px */
    margin: 0 auto;
  }

  .content-layout {
    display: flex;
    gap: 2rem;
  }

  .main-column {
    flex: 1;
    min-width: 0; /* Prevents flex item from overflowing */
  }

  .side-column {
    width: 340px;  /* Fixed width for sidebar */
    flex-shrink: 0;
  }

  .side-content {
    position: relative;
    background: white;
    border-radius: 24px;
    padding: 1.2rem;  /* Reduced from 1.5rem to 1.2rem */
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .side-content:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(to right, #0cebeb, #20e3b2);
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .section-header {
    display: flex;
    align-items: center;
    margin: 3rem 0 2rem;
    position: relative;
  }
  
  .section-dot {
    width: 16px;
    height: 16px;
    background: linear-gradient(45deg, #0cebeb, #20e3b2);
    border-radius: 50%;
    margin-right: 12px;
    box-shadow: 0 3px 8px rgba(12, 235, 235, 0.4);
  }
  
  .section-line {
    height: 3px;
    background: linear-gradient(to right, rgba(12, 235, 235, 0.4), rgba(12, 235, 235, 0.1));
    flex-grow: 1;
    border-radius: 3px;
  }

  @media (max-width: 1200px) {
    .content-layout {
      flex-direction: column;
    }

    .side-column {
      width: 100%;
    }
    
    .side-content {
      position: relative;
      top: 0;
      overflow-x: auto;
    }
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 1.2rem;
    }
    
    .section-header {
      margin: 2rem 0 1.5rem;
    }
  }

  .app {
    width: 100%;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  @media (orientation: landscape) and (max-height: 560px) {
    .main-content {
      padding-top: 0.5rem;
    }
  }
</style>