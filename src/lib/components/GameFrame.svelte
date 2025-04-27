<script lang="ts">
  import "$lib/styles/theme.css";
  import type { GameBaseConfig } from "$lib/types";
  import siteConfig from "$lib/data/site.json";
  import { getCoverUrl, getIframeUrl } from "$lib/helper";

  export let config: GameBaseConfig;

  let isPlaying = false;
  
  function togglePlay() {
    isPlaying = true;
  }
</script>

<svelte:head>
  <style>
    body {
      margin: 0;
      height: 100%;
      overflow: hidden;
    }
    
    html {
      height: 100%;
    }
  </style>
</svelte:head>

<!-- Game Preview (shown when not playing) -->
<div class="game-container">
  {#if !isPlaying}
    <div class="game-preview">
      <!-- Background image with blur -->
      <div class="game-preview-bg" style="background-image: url({getCoverUrl(siteConfig, config)})"></div>
      
      <div class="game-preview-content">
        <div class="game-info">
          <div class="title-container">
            <h1 class="game-title">{config.title}</h1>
            <p class="game-subtitle">{config.subtitle}</p>
          </div>
          
          <button class="play-button" on:click={togglePlay}>
            <div class="play-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span>Play Now</span>
          </button>
        </div>
        
        <div class="preview-circle-container">
          <div class="preview-circle" style="background-image: url({getCoverUrl(siteConfig, config)})"></div>
          <div class="circle-decoration circle-1"></div>
          <div class="circle-decoration circle-2"></div>
          <div class="circle-decoration circle-3"></div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Game iframe (shown when playing) -->
    <div class="game-iframe-wrapper">
      <iframe
        title={config.title}
        src={getIframeUrl(siteConfig, config)}
        class="game-iframe"
        allowfullscreen
        allow="autoplay; fullscreen; microphone"
      ></iframe>
    </div>
  {/if}
</div>

<style>
  :global(#app) {
    height: 100%;
  }

  .game-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }

  /* Game Preview */
  .game-preview {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #111;
    overflow: hidden;
    flex-grow: 1;
  }
  
  /* This is the blurred background */
  .game-preview-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(30px);
    transform: scale(1.1); /* Prevent blur edges from showing */
    z-index: 1;
    opacity: 0.8;
  }

  .game-preview-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light));
  }

  .game-preview-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 2;
    overflow: hidden;
  }

  .game-info {
    flex: 1;
    padding: 5% 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center vertically */
    color: white;
    background: linear-gradient(to right, rgba(0,0,0,0.7) 60%, transparent);
    z-index: 3;
  }

  .title-container {
    margin-bottom: 2.5rem;
  }

  .game-title {
    font-size: min(4rem, 8vw); /* Responsive font size */
    line-height: 1.1;
    margin: 0;
    font-weight: 800;
    text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.5);
    background: linear-gradient(to right, #fff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShine 3s ease-in-out infinite alternate;
  }

  @keyframes textShine {
    from { background-position: 0%; }
    to { background-position: 100%; }
  }

  .game-subtitle {
    font-size: clamp(1rem, 2vw, 1.3rem); /* Responsive font size */
    margin: 1rem 0 0;
    opacity: 0.9;
    max-width: 80%;
    font-weight: 400;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  /* Larger play button styles */
  .play-button {
    display: flex;
    align-items: center;
    background: var(--gradient-primary);
    border: none;
    color: white;
    padding: 0;
    font-weight: 700;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 25px var(--color-primary-light);
    align-self: flex-start;
    overflow: hidden;
    margin-top: 2rem;
    position: relative; /* For hover effect */
    transform: scale(1.15);
    transform-origin: center center;
  }

  .play-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(60px, 6vw, 85px);
    height: clamp(60px, 6vw, 85px);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    margin-right: 10px;
  }

  .play-icon svg {
    width: 40%;
    height: 40%;
    margin-left: 5%;
  }

  .play-button span {
    padding: 0 clamp(25px, 3.5vw, 40px) 0 clamp(15px, 2.5vw, 30px);
    letter-spacing: 0.5px;
    font-size: clamp(1.1rem, 1.8vw, 1.5rem);
    font-weight: 600;
  }

  .play-button:hover {
    transform: translateY(-5px) scale(1.17);
    box-shadow: 0 15px 30px var(--color-primary-light);
  }

  .play-button:active {
    transform: translateY(2px) scale(1.15);
  }

  .play-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary-hover);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .play-button:hover::after {
    opacity: 1;
  }

  .preview-circle-container {
    position: relative;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .preview-circle {
    position: relative;
    width: min(220px, 20vw); /* Responsive size */
    height: min(220px, 20vw); /* Responsive size */
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.1), 0 0 30px rgba(0, 0, 0, 0.3);
    background-size: cover;
    background-position: center;
    z-index: 3;
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .circle-decoration {
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
    z-index: 2;
  }

  .circle-1 {
    width: clamp(40px, 4vw, 60px);
    height: clamp(40px, 4vw, 60px);
    background: var(--gradient-primary);
    top: 20%;
    right: 15%;
    animation: float 6s ease-in-out infinite;
  }

  .circle-2 {
    width: clamp(30px, 3vw, 40px);
    height: clamp(30px, 3vw, 40px);
    background: linear-gradient(45deg, var(--color-secondary), var(--color-primary));
    bottom: 20%;
    right: 25%;
    animation: float 7s ease-in-out infinite 1s;
  }

  .circle-3 {
    width: clamp(20px, 2vw, 25px);
    height: clamp(20px, 2vw, 25px);
    background: linear-gradient(45deg, var(--color-secondary), var(--color-primary-dark));
    top: 40%;
    right: 30%;
    animation: float 5s ease-in-out infinite 0.5s;
  }

  @keyframes float {
    0% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-10px) translateX(10px); }
    100% { transform: translateY(0) translateX(0); }
  }

  .game-iframe-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #000;
    flex-grow: 1;
    overflow: hidden; /* Prevent overflow issues */
  }
  
  .game-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  /* Large screens */
  @media screen and (min-width: 1801px) and (min-height: 320px) {
    .game-title {
      font-size: min(5rem, 8vw);
    }
    
    .game-subtitle {
      font-size: min(1.5rem, 2vw);
      max-width: 70%;
    }
    
    .preview-circle {
      width: min(280px, 25vw);
      height: min(280px, 25vw);
    }
    
    .play-button {
      transform: scale(1.2);
    }
    
    .play-button:hover {
      transform: translateY(-5px) scale(1.22);
    }
    
    .play-button:active {
      transform: translateY(2px) scale(1.2);
    }
  }

  /* Medium screens / tablets */
  @media (max-width: 768px) and (min-height: 320px) {
    .game-info {
      padding: 3rem 1.5rem;
      text-align: center;
      align-items: center;
      width: 100%;
      background: linear-gradient(to bottom, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.5) 70%, transparent);
      justify-content: flex-start;
    }
    
    .title-container {
      margin-bottom: 1.5rem;
      margin-top: 2rem;
      position: relative;
      z-index: 10; /* Ensure title appears above the circle */
    }

    .game-title {
      font-size: min(2.5rem, 9vw);
    }

    .game-subtitle {
      display: none;
    }

    .preview-circle-container {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .preview-circle {
      width: min(150px, 30vw);
      height: min(150px, 30vw);
      margin-top: 0;
      transform: translateY(5vh);
      box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.15), 0 0 40px var(--color-primary-light);
    }
    
    .circle-1 {
      right: auto;
      left: 25%;
    }
    
    .circle-2 {
      right: 25%;
    }
    
    .circle-3 {
      right: auto;
      left: 40%;
      top: 60%;
    }

    /* Fixed button centering for mobile */
    .play-button {
      margin-top: 0;
      position: absolute;
      bottom: clamp(3.5rem, 15vh, 7rem); /* Increased bottom margin to move button up */
      left: 50%;
      transform: translateX(-50%) scale(1.15);
      z-index: 5;
      align-self: center;
      min-width: 200px;
    }
    
    .play-button:hover {
      transform: translateX(-50%) translateY(-5px) scale(1.17);
    }
    
    .play-button:active {
      transform: translateX(-50%) translateY(2px) scale(1.15);
    }
    
    .play-icon {
      width: 55px;
      height: 55px;
    }
    
    .play-icon svg {
      width: 26px;
      height: 26px;
    }
    
    .play-button span {
      padding: 0 24px 0 12px;
      font-size: 1.2rem;
    }
  }
  
  /* Small phones */
  @media (max-width: 480px) {
    .game-info {
      padding: 2rem 1rem;
    }
    
    .title-container {
      margin-bottom: 1rem;
      margin-top: 1.5rem;
    }
    
    .game-title {
      font-size: min(2rem, 9vw);
    }
    
    .preview-circle {
      width: min(110px, 30vw);
      height: min(110px, 30vw);
      transform: translateY(-2vh); /* Moved circle up slightly */
      box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.15), 0 0 30px var(--color-primary-light);
    }
    
    /* Improved centering for small screens */
    .play-button {
      bottom: clamp(3rem, 12vh, 5rem); /* Increased bottom margin to move button up */
      transform: translateX(-50%) scale(1.1);
      min-width: 180px;
      left: 50%;
    }
    
    .play-button:hover {
      transform: translateX(-50%) translateY(-5px) scale(1.12);
    }
    
    .play-button:active {
      transform: translateX(-50%) translateY(2px) scale(1.1);
    }
    
    /* Adjusted play button sizing for small screens */
    .play-icon {
      width: 50px;
      height: 50px;
    }
    
    .play-button span {
      padding: 0 20px 0 10px;
      font-size: 1.1rem;
    }
    
    .circle-1 {
      width: 40px;
      height: 40px;
      opacity: 0.4;
    }
    
    .circle-2 {
      width: 30px;
      height: 30px;
      opacity: 0.4;
    }
    
    .circle-3 {
      width: 20px;
      height: 20px;
      opacity: 0.4;
    }
  }
  
  /* Very small phones or landscape mode on small phones */
  @media (max-height: 560px) and (orientation: landscape)  {
    .preview-circle {
      transform: translateY(-1vh); /* Moved circle slightly up */
    }

    
    .play-button {
      bottom: clamp(2rem, 8vh, 3rem); /* Increased bottom margin for very small screens */
      transform: translateX(-50%) scale(1.05);
    }
    
    .play-button:hover {
      transform: translateX(-50%) translateY(-3px) scale(1.07);
    }
    
    .play-button:active {
      transform: translateX(-50%) translateY(2px) scale(1.05);
    }
    
    .title-container {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
    
    /* Keep button reasonably sized in landscape mode */
    .play-icon {
      width: 46px;
      height: 46px;
    }
    
    .play-button span {
      padding: 0 16px 0 8px;
      font-size: 1rem;
    }
  }

  @media (max-height: 272px) and (orientation: landscape) {
    .game-title {
      font-size: min(1.5rem, 9vw);
    }

    .game-subtitle {
      display: none;
    }
  }
</style>