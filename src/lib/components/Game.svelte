<script lang="ts">
  import { onMount } from 'svelte';
  import { type GameConfig } from '$lib/types';
  import siteConfig from '$lib/data/site.json';
  import { getCoverUrl } from '$lib/helper';
  
  export let config: GameConfig;
  
  let isFullScreen = false;
  let gameContainer: HTMLElement;
  
  function toggleFullScreen() {
    // Check if the element exists
    if (!gameContainer) {
      console.error('Game container element not found');
      return;
    }

    // Handle entering fullscreen
    if (!document.fullscreenElement && 
        !(document as any).webkitFullscreenElement && 
        !(document as any).mozFullScreenElement) {
      
      // Mobile detection
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Try different methods based on browser support
      try {
        // Safari and iOS specific handling
        if ((gameContainer as any).webkitRequestFullscreen) {
          (gameContainer as any).webkitRequestFullscreen();
        }
        // Standard method
        else if (gameContainer.requestFullscreen) {
          gameContainer.requestFullscreen();
        }
        // Firefox
        else if ((gameContainer as any).mozRequestFullScreen) {
          (gameContainer as any).mozRequestFullScreen();
        }
        // IE/Edge
        else if ((gameContainer as any).msRequestFullscreen) {
          (gameContainer as any).msRequestFullscreen();
        }
        // For mobile Safari which might not support any of the above
        else if (isMobile) {
          // Mobile fallback - apply CSS to simulate fullscreen
          isFullScreen = true;
        }
        else {
          alert('Fullscreen is not supported in your browser');
        }
      } catch (err) {
        console.error('Fullscreen error:', err);
        // Mobile fallback if error occurs
        if (isMobile) {
          isFullScreen = true;
        } else {
          alert(`Error attempting to enable fullscreen: ${err.message}`);
        }
      }
    } 
    // Handle exiting fullscreen
    else {
      isFullScreen = false;
      try {
        // Safari and iOS
        if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        }
        // Standard method
        else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        // Firefox
        else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        }
        // IE/Edge
        else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
        // Manual exit for mobile fallback
        else {
          isFullScreen = false;
        }
      } catch (err) {
        console.error('Error exiting fullscreen:', err);
        isFullScreen = false;
      }
    }
  }
  
  // Function to handle exiting fullscreen specifically for mobile fallback
  function exitMobileFullscreen() {
    isFullScreen = false;
  }
  
  onMount(() => {
    document.addEventListener('fullscreenchange', () => {
      isFullScreen = !!document.fullscreenElement;
    });
    
    return () => {
      document.removeEventListener('fullscreenchange', () => {
        isFullScreen = !!document.fullscreenElement;
      });
    };
  });
</script>

<div class="game-component" bind:this={gameContainer} class:fullscreen={isFullScreen}>
  <div class="game-iframe-container" class:fullscreen={isFullScreen}>
    <iframe
      title={config.title}
      src={`${siteConfig.baseUrl}/games/${config.id}`}
      class="game-iframe"
      class:fullscreen={isFullScreen}
      allowfullscreen
      allow="autoplay; fullscreen; microphone"
    ></iframe>
    
    <!-- Mobile exit fullscreen button - only visible when in fullscreen mode on mobile -->
    {#if isFullScreen}
      <button class="mobile-exit-fullscreen" on:click={exitMobileFullscreen}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
        </svg>
        Exit
      </button>
    {/if}
  </div>
  
  <!-- Control bar - Always visible except in fullscreen mode -->
  <div class="game-control-bar" class:hidden={isFullScreen}>
    <div class="game-info-bar">
      <div class="game-icon" style="background-image: url({getCoverUrl(siteConfig, config)})"></div>
      <div class="game-info-text">
        <p class="game-bar-title">{config.title}</p>
        <div class="game-stats">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
          </svg>
          <p class="game-plays">{config.plays.toLocaleString()} plays</p>
        </div>
      </div>
    </div>
    
    <button class="fullscreen-button" on:click={toggleFullScreen}>
      <div class="fullscreen-icon">
        {#if isFullScreen}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
          </svg>
        {/if}
      </div>
      <span class="fullscreen-text">{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
    </button>
  </div>
</div>

<style>
  .game-component {
    width: 100%;
    border-radius: 24px;
    overflow: hidden;
    background-color: #111;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  
  /* For fullscreen state */
  .game-component.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw; /* Use viewport width */
    height: 100vh; /* Use viewport height */
    z-index: 9999;
    margin: 0;
    border-radius: 0;
    display: flex;
    flex-direction: column;
  }

  .game-component.fullscreen::after {
    content: none; /* Remove the "Press ESC" message since it's not applicable on mobile */
  }
  
  .game-iframe-container {
    border: none;
    width: 100%;
    min-height: 600px;
    height: 600px;
    position: relative;
    background-color: #111;
    overflow: hidden;
    flex: 1;
  }

  @media (max-width: 768px) {
    .game-iframe-container {
      min-height: 480px;
      height: 480px;
    }
  }

  @media (max-width: 480px) {
    .game-iframe-container {
      min-height: 400px;
      height: 400px;
    }
  }

  .game-iframe-container.fullscreen {
    height: 100vh; /* Use viewport height */
    width: 100vw;  /* Use viewport width */
    max-height: none; /* Remove the max-height limit in fullscreen */
    min-height: 100vh; /* Set min-height to viewport height */
  }
  
  .game-iframe {
    width: 100%;
    height: 100%;
    border: none;
    object-fit: contain; /* Change from cover to contain */
    display: block; /* Ensure the iframe is displayed as a block */
    position: absolute; /* Position absolutely within the container */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .game-iframe.fullscreen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* Control bar */
  .game-control-bar {
    width: 100%;
    height: 70px;
    background: linear-gradient(to right, rgba(20, 20, 20, 0.95), rgba(30, 30, 30, 0.95));
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    z-index: 5;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    flex-shrink: 0;
  }

  .game-control-bar.hidden {
    display: none;
  }

  .game-info-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 1.5rem;
  }

  .game-icon {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .game-info-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .game-bar-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .game-stats {
    display: flex;
    align-items: center;
    gap: 5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .game-stats svg {
    opacity: 0.8;
  }

  .game-plays {
    margin: 0;
    font-size: 0.85rem;
  }

  .fullscreen-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(12, 235, 235, 0.2);
    border: 1px solid rgba(12, 235, 235, 0.3);
    color: white;
    cursor: pointer;
    padding: 0.6rem 1.2rem;
    margin-right: 1.5rem;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .fullscreen-icon {
    display: flex;
    align-items: center;
  }
  
  .fullscreen-icon svg {
    width: 20px;
    height: 20px;
  }

  .fullscreen-text {
    letter-spacing: 0.3px;
  }

  .fullscreen-button:hover {
    background-color: rgba(12, 235, 235, 0.4);
    transform: translateY(-2px);
  }
  
  .fullscreen-button:active {
    transform: translateY(1px);
  }

  /* Mobile exit fullscreen button */
  .mobile-exit-fullscreen {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 10000;
    cursor: pointer;
    font-size: 14px;
  }
  
  .mobile-exit-fullscreen svg {
    width: 18px;
    height: 18px;
  }

  @media (min-width: 769px) {
    /* Hide the mobile exit button on desktop/larger screens */
    .mobile-exit-fullscreen {
      display: none;
    }
    
    /* Show the ESC message only on desktop */
    .game-component.fullscreen::after {
      content: 'Press ESC to exit fullscreen';
      position: absolute;
      top: 20px;
      right: 20px;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      opacity: 0.7;
      transition: opacity 0.3s ease;
      pointer-events: none;
      animation: fadeOut 3s forwards 2s;
    }
  }

  @keyframes fadeOut {
    from { opacity: 0.7; }
    to { opacity: 0; }
  }

  @media (max-width: 768px) {
    .game-component {
      border-radius: 18px;
      min-height: 480px;
    }
    
    .game-iframe-container {
      min-height: 420px;
    }

    .game-control-bar {
      height: 60px;
    }

    .game-info-bar {
      gap: 0.7rem;
      padding-left: 1rem;
    }

    .game-icon {
      width: 35px;
      height: 35px;
      border-radius: 8px;
    }

    .game-bar-title {
      font-size: 0.9rem;
    }

    .game-plays {
      font-size: 0.7rem;
    }
    
    /* For smaller screens, we can hide the fullscreen text to save space */
    .fullscreen-text {
      display: none;
    }
    
    .fullscreen-button {
      padding: 0.5rem;
      margin-right: 1rem;
      border-radius: 6px;
    }
  }
  
  @media (max-width: 480px) {
    .game-component {
      min-height: 400px;
    }
    
    .game-iframe-container {
      min-height: 340px;
    }
  }

  @media (orientation: landscape) and (max-height: 480px) {
    .mobile-exit-fullscreen {
      display: flex;
    }

    .game-component {
      min-height: 320px;
    }
    
    .game-iframe-container {
      min-height: 280px;
      height: calc(100vh - 40px);
    }

    .game-control-bar {
      height: 40px;
    }

    .game-icon {
      width: 28px;
      height: 28px;
      border-radius: 6px;
    }
    
    .game-bar-title {
      font-size: 0.8rem;
    }
    
    .game-plays {
      font-size: 0.65rem;
    }
    
    .fullscreen-button {
      padding: 0.3rem;
      margin-right: 0.8rem;
    }
    
    .fullscreen-icon svg {
      width: 16px;
      height: 16px;
    }
  }
</style>