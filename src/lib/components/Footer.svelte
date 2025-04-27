<script lang="ts">
  import '$lib/styles/theme.css';
  import config from '$lib/data/footer.json';
</script>

<footer class="footer-container">
  <div class="footer-content">
    {#if config.relatedGameLinks && config.relatedGameLinks.length > 0}
      <div class="footer-game-links">
        {#each config.relatedGameLinks as section}
          <div class="game-link-section">
            <h3 class="game-section-title">{section.title}</h3>
            <ul class="game-links">
              {#each section.games as game}
                <li>
                  <a href={game.href} class="game-link">
                    <span class="game-link-dot"></span>
                    {game.title}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/if}

    <div class="footer-bottom">
      <div class="footer-links">
        {#each config.links as link}
          <a href={link.href} class="footer-link">{link.title}</a>
        {/each}
      </div>
      
      <div class="footer-copyright">
        {config.copyright}
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-container {
    background: linear-gradient(to bottom, var(--color-black), var(--color-dark-gray));
    padding: var(--space-xl) 0 var(--space-lg);
    margin-top: var(--space-xl);
    border-top: 1px solid rgba(220, 20, 60, 0.2);
    position: relative;
  }
  
  .footer-container:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, var(--color-crimson-dark), var(--color-crimson), var(--color-crimson-dark), var(--color-crimson));
    opacity: 0.8;
  }

  .footer-content {
    width: 90%;
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    padding-top: var(--space-lg);
    border-top: 1px solid rgba(220, 20, 60, 0.2);
    margin-top: var(--space-lg);
  }

  .footer-links {
    display: flex;
    gap: 2.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-link {
    color: var(--color-light-gray);
    text-decoration: none;
    transition: var(--transition-medium);
    font-size: 0.95rem;
    position: relative;
    font-weight: 500;
  }

  .footer-link:hover {
    color: var(--color-crimson);
  }
  
  .footer-link:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: var(--gradient-crimson);
    transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 2px;
  }
  
  .footer-link:hover:after {
    width: 100%;
  }

  .footer-copyright {
    color: var(--color-light-gray);
    font-size: 0.85rem;
    text-align: center;
    margin-top: 0.5rem;
  }

  .footer-game-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
    padding-bottom: 1rem;
  }

  .game-section-title {
    margin: 0 0 1.2rem 0;
    font-size: 1.15rem;
    color: var(--color-white);
    position: relative;
    padding-bottom: 0.7rem;
    font-weight: 600;
  }
  
  .game-section-title:after {
    content: '';
    position: absolute;
    width: 45px;
    height: 4px;
    bottom: 0;
    left: 0;
    background: var(--gradient-crimson);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  
  .game-link-section:hover .game-section-title:after {
    width: 65px;
  }

  .game-links {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .game-link {
    color: var(--color-light-gray);
    text-decoration: none;
    transition: var(--transition-bounce);
    font-size: 0.95rem;
    display: flex;
    align-items: center;
  }
  
  .game-link-dot {
    width: 8px;
    height: 8px;
    background: linear-gradient(45deg, var(--color-crimson-dark), var(--color-crimson));
    border-radius: 50%;
    margin-right: 10px;
    transition: var(--transition-bounce);
    opacity: 0.6;
  }

  .game-link:hover {
    color: var(--color-crimson);
    transform: translateX(5px);
  }
  
  .game-link:hover .game-link-dot {
    opacity: 1;
    transform: scale(1.3);
    box-shadow: 0 0 10px rgba(220, 20, 60, 0.7);
  }

  @media screen and (min-width: 1801px) {
    .footer-game-links {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .footer-container {
      padding: var(--space-lg) 0 var(--space-md);
      margin-top: var(--space-xl);
    }
    
    .footer-content {
      padding: 0 var(--space-sm);
    }

    .footer-links {
      gap: 1.5rem;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .footer-bottom {
      padding-top: var(--space-md);
    }

    .footer-game-links {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: var(--space-lg);
    }
    
    .game-section-title {
      text-align: center;
      font-size: 1.1rem;
    }
    
    .game-section-title:after {
      left: 50%;
      transform: translateX(-50%);
    }
    
    .game-links {
      align-items: center;
    }
  }
  
  /* Animation for footer appearance */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .footer-container {
    animation: fadeInUp 0.8s ease-out;
  }
</style>