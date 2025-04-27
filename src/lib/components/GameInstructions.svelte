<script lang="ts">
  import '$lib/styles/theme.css';
  import SvelteMarkdown from 'svelte-markdown'
  
  export let instructions: string;
  export let title: string = 'How to Play';
</script>

<div class="instructions-container">
  <h1 class="instructions-title">{title}</h1>
  
  <div class="instructions-content">
    <SvelteMarkdown source={instructions} />
  </div>
</div>

<style>
  .instructions-container {
    background-color: var(--color-black);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-large);
    margin: var(--space-lg) 0;
    border: 1px solid rgba(220, 20, 60, 0.2);
    position: relative;
    overflow: hidden;
  }
  
  .instructions-container:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--gradient-crimson);
  }

  .instructions-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 1.5rem 0;
    color: var(--color-white);
    position: relative;
    padding-left: 1.2rem;
    display: inline-block;
  }

  .instructions-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 1.2em;
    background: linear-gradient(to bottom, var(--color-crimson-dark), var(--color-crimson));
    border-radius: 6px;
    box-shadow: var(--shadow-small);
  }

  .instructions-content {
    line-height: 1.7;
    color: var(--color-light-gray);
    font-size: 1.05rem;
    max-width: 100%;
  }

  .instructions-content :global(h1),
  .instructions-content :global(h2),
  .instructions-content :global(h3),
  .instructions-content :global(h4),
  .instructions-content :global(h5),
  .instructions-content :global(h6) {
    color: var(--color-white);
    margin-top: 1.8em;
    margin-bottom: 0.8em;
    font-weight: 700;
  }

  .instructions-content :global(h1) {
    font-size: 1.8rem;
    background: var(--gradient-crimson);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .instructions-content :global(h2) {
    font-size: 1.5rem;
    position: relative;
    padding-bottom: 0.6rem;
  }
  
  .instructions-content :global(h2:after) {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--gradient-crimson);
    border-radius: 3px;
  }

  .instructions-content :global(h3) {
    font-size: 1.3rem;
  }

  .instructions-content :global(p) {
    margin: 1em 0;
  }

  .instructions-content :global(ul),
  .instructions-content :global(ol) {
    padding-left: 2.2rem;
    margin: 1em 0;
  }

  .instructions-content :global(li) {
    margin: 0.5em 0;
  }
  
  .instructions-content :global(li::marker) {
    color: var(--color-crimson);
  }

  .instructions-content :global(img) {
    max-width: 100%;
    border-radius: var(--radius-md);
    margin: 1.5rem 0;
    box-shadow: var(--shadow-medium);
    transition: var(--transition-medium);
  }
  
  .instructions-content :global(img:hover) {
    transform: scale(1.02);
  }

  .instructions-content :global(code) {
    background-color: rgba(220, 20, 60, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.95em;
    color: var(--color-crimson);
  }

  .instructions-content :global(pre) {
    background-color: var(--color-dark-gray);
    padding: 1.2rem;
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: 1.2rem 0;
    border: 1px solid rgba(220, 20, 60, 0.2);
  }

  .instructions-content :global(blockquote) {
    border-left: 5px solid var(--color-crimson);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    color: var(--color-light-gray);
    font-style: italic;
    background-color: rgba(220, 20, 60, 0.1);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }

  .instructions-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-medium);
  }

  .instructions-content :global(th),
  .instructions-content :global(td) {
    border: 1px solid var(--color-dark-gray);
    padding: 0.8rem 1rem;
    text-align: left;
  }

  .instructions-content :global(th) {
    background: linear-gradient(to right, rgba(220, 20, 60, 0.3), rgba(220, 20, 60, 0.2));
    color: var(--color-white);
    font-weight: 600;
  }
  
  .instructions-content :global(tr:nth-child(even)) {
    background-color: rgba(220, 20, 60, 0.05);
  }

  @media screen and (min-width: 1801px) {
    .instructions-container {
      padding: 2.5rem 3.5rem;
    }
    
    .instructions-content {
      font-size: 1.1rem;
      line-height: 1.8;
    }
    
    .instructions-title {
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    .instructions-container {
      padding: 1.5rem;
      border-radius: var(--radius-md);
    }
    
    .instructions-title {
      font-size: 1.5rem;
    }
    
    .instructions-content {
      font-size: 1rem;
    }
    
    .instructions-content :global(h1) {
      font-size: 1.5rem;
    }
    
    .instructions-content :global(h2) {
      font-size: 1.3rem;
    }
    
    .instructions-content :global(h3) {
      font-size: 1.1rem;
    }
  }
  
  /* Match animation style with other components */
  .instructions-container {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>