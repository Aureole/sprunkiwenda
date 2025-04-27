<script lang="ts">
  import '$lib/styles/theme.css';
  import { onMount } from 'svelte';
  import config from '$lib/data/header.json';
  
  let sidebarOpen = false;
  let screenWidth = 1200;
  
  const toggleSidebar = () => {
    sidebarOpen = !sidebarOpen;
  };
  
  const closeSidebar = () => {
    sidebarOpen = false;
  };
  
  // Handle resize events and ESC key to close sidebar
  onMount(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        sidebarOpen = false;
      }
    };
    
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        sidebarOpen = false;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeydown);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  function setSidebarItemDelays() {
    if (typeof document !== 'undefined') {
      const items = document.querySelectorAll('.sidebar-nav-item');
      items.forEach((item, index) => {
        (item as HTMLElement).style.setProperty('--index', (index + 1).toString());
      });
    }
  }
  
  if (typeof window !== 'undefined') {
    // Run after DOM is ready
    window.addEventListener('DOMContentLoaded', setSidebarItemDelays);
  }
</script>

<header class="header-container">
  <div class="header-content">
    <!-- Mobile Hamburger Button (now on left) -->
    {#if config.navItems && config.navItems.length > 0}
      <button class="hamburger-button" on:click={toggleSidebar} aria-label="Toggle navigation menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    {/if}
    
    <a href={config.logo.href} class="logo-link">
      <div class="logo-container">
        <img src={config.logo.src} alt={config.logo.alt} class="logo-image" />
      </div>
      <div class="site-title">
        <span class="title-text">{config.logo.alt}</span>
      </div>
    </a>
    
    {#if config.navItems && config.navItems.length > 0}
      <!-- Desktop Navigation -->
      <nav class="nav-container desktop-nav">
        <ul class="nav-list">
          {#each config.navItems as navItem}
            <li class="nav-item">
              <a href={navItem.href} class="nav-link">{navItem.title}</a>
            </li>
          {/each}
        </ul>
      </nav>
      
      <!-- Empty div to maintain space when hamburger is visible -->
      <div class="spacer"></div>
    {/if}
  </div>
  
  <!-- Mobile Sidebar -->
  {#if sidebarOpen}
    <div class="overlay" on:click={closeSidebar}></div>
  {/if}
  
  <div class="sidebar" class:sidebar-open={sidebarOpen}>
    <button class="close-button" on:click={closeSidebar} aria-label="Close navigation menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    {#if config.navItems && config.navItems.length > 0}
      <nav class="sidebar-nav">
        <ul class="sidebar-nav-list">
          {#each config.navItems as navItem}
            <li class="sidebar-nav-item">
              <a href={navItem.href} class="sidebar-nav-link" on:click={closeSidebar}>{navItem.title}</a>
            </li>
          {/each}
        </ul>
      </nav>
    {/if}
  </div>
</header>

<style>
  .header-container {
    width: 100%;
    background-color: var(--color-black);
    box-shadow: var(--shadow-medium);
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(220, 20, 60, 0.2);
  }

  .header-content {
    width: 90%;
    max-width: 1800px;
    margin: 0 auto;
    padding: var(--space-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: var(--transition-bounce);
    animation: fadeIn 0.5s ease forwards;
    gap: 12px;
  }
  
  .logo-link:hover {
    transform: scale(1.05);
  }

  .logo-container {
    width: 45px;
    height: 45px;
    border-radius: var(--radius-circle);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-black);
    box-shadow: var(--shadow-small);
    border: 2px solid rgba(220, 20, 60, 0.4);
    transition: var(--transition-medium);
  }
  
  .logo-container:hover {
    box-shadow: 0 5px 15px rgba(220, 20, 60, 0.5);
    border-color: rgba(220, 20, 60, 0.7);
  }

  .logo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .site-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title-text {
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    transition: var(--transition-medium);
  }

  .logo-link:hover .title-text {
    background-position: right center;
  }

  /* Desktop Navigation */
  .nav-container {
    display: flex;
    align-items: center;
  }

  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1.5rem;
  }

  .nav-item {
    margin: 0;
    animation: fadeIn 0.5s ease forwards;
  }
  
  .nav-list > :nth-child(1) { animation-delay: 0.1s; }
  .nav-list > :nth-child(2) { animation-delay: 0.2s; }
  .nav-list > :nth-child(3) { animation-delay: 0.3s; }
  .nav-list > :nth-child(4) { animation-delay: 0.4s; }
  .nav-list > :nth-child(n+5) { animation-delay: 0.5s; }

  .nav-link {
    text-decoration: none;
    color: var(--color-white);
    font-weight: 600;
    font-size: 0.95rem;
    transition: var(--transition-medium);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-round);
    position: relative;
    overflow: hidden;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .nav-link:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(220, 20, 60, 0.15), rgba(220, 20, 60, 0.25));
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: -1;
    border-radius: var(--radius-round);
  }

  .nav-link:hover {
    color: var(--color-crimson);
    text-shadow: 0 1px 2px rgba(220, 20, 60, 0.2);
  }
  
  .nav-link:hover:before {
    transform: scaleX(1);
    transform-origin: left;
  }

  /* Hamburger Button */
  .hamburger-button {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
  }

  .hamburger-line {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 10px;
    background: var(--color-white);
    transition: var(--transition-medium);
  }
  
  /* Empty spacer to maintain layout */
  .spacer {
    width: 30px; /* Same as hamburger button width */
    display: none;
  }

  /* Sidebar Styles */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 101;
    animation: fadeIn 0.3s ease forwards;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -320px;
    width: 280px;
    height: 100%;
    background-color: var(--color-black);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 102;
    padding: var(--space-lg) var(--space-sm);
    transition: left 0.3s ease-in-out;
    overflow-y: auto;
  }

  .sidebar-open {
    left: 0;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-white);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-circle);
    transition: background-color 0.2s ease;
  }

  .close-button:hover {
    background-color: rgba(220, 20, 60, 0.15);
  }

  .sidebar-nav {
    margin-top: var(--space-lg);
  }

  .sidebar-nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar-nav-item {
    margin-bottom: 0.75rem;
    animation: slideInRight 0.3s ease forwards;
    animation-delay: calc(0.05s * var(--index, 1));
    opacity: 0;
  }

  .sidebar-nav-link {
    display: block;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: var(--color-white);
    font-weight: 600;
    border-radius: var(--radius-sm);
    transition: var(--transition-medium);
    position: relative;
    overflow: hidden;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    font-size: 0.95rem;
  }

  .sidebar-nav-link:hover {
    color: var(--color-crimson);
    background-color: rgba(220, 20, 60, 0.1);
    padding-left: 1.5rem;
    text-shadow: 0 1px 2px rgba(220, 20, 60, 0.2);
  }

  /* Media Queries */
  @media (max-width: 920px) {
    .desktop-nav {
      display: none;
    }
    
    .hamburger-button {
      display: flex;
    }
    
    .spacer {
      display: block;
    }
    
    .header-content {
      justify-content: space-between;
    }
  }

  @media (max-width: 768px) {
    .header-content {
      padding: 0.75rem;
    }
    
    .logo-container {
      width: 38px;
      height: 38px;
    }
    
    .title-text {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    .header-content {
      padding: 0.5rem 0.75rem;
    }
    
    .logo-container {
      width: 32px;
      height: 32px;
      border-width: 1.5px;
    }
    
    .title-text {
      font-size: 1rem;
    }
    
    .hamburger-button {
      width: 24px;
      height: 18px;
    }
  }

  @media (orientation: landscape) and (max-height: 560px) {
    .header-container {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    }
    
    .header-content {
      padding: 0.3rem 0.75rem;
    }
    
    .logo-container {
      width: 18px;
      height: 18px;
      border-width: 1px;
    }
    
    .title-text {
      font-size: 0.85rem;
    }
    
    .hamburger-button {
      width: 20px;
      height: 15px;
    }
    
    .hamburger-line {
      height: 1.5px;
    }
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
</style>