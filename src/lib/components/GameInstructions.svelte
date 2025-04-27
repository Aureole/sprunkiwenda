<script lang="ts">
  import "$lib/styles/theme.css";
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
    background-color: var(--color-background-primary);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 15px 35px var(--color-shadow-secondary), 0 5px 15px var(--color-shadow-primary);
    margin: 2rem 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
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
    background: var(--gradient-primary);
  }

  .instructions-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 1.5rem 0;
    color: var(--color-text-primary);
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
    background: var(--gradient-primary);
    border-radius: 6px;
    box-shadow: 0 3px 10px var(--color-primary-light);
  }

  .instructions-content {
    line-height: 1.7;
    color: var(--color-text-secondary);
    font-size: 1.05rem;
    max-width: 100%;
  }

  .instructions-content :global(h1),
  .instructions-content :global(h2),
  .instructions-content :global(h3),
  .instructions-content :global(h4),
  .instructions-content :global(h5),
  .instructions-content :global(h6) {
    color: var(--color-text-primary);
    margin-top: 1.8em;
    margin-bottom: 0.8em;
    font-weight: 700;
  }

  .instructions-content :global(h1) {
    font-size: 1.8rem;
    background: var(--gradient-primary);
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
    background: var(--gradient-primary);
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
    color: var(--color-primary);
  }

  .instructions-content :global(img) {
    max-width: 100%;
    border-radius: 12px;
    margin: 1.5rem 0;
    box-shadow: 0 5px 15px var(--color-shadow-primary);
    transition: transform 0.3s ease;
  }
  
  .instructions-content :global(img:hover) {
    transform: scale(1.02);
  }

  .instructions-content :global(code) {
    background-color: var(--color-background-code);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.95em;
    color: var(--color-primary-dark);
  }

  .instructions-content :global(pre) {
    background-color: var(--color-background-tertiary);
    padding: 1.2rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 1.2rem 0;
    border: 1px solid var(--color-border-input);
  }

  .instructions-content :global(blockquote) {
    border-left: 5px solid var(--color-primary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    color: var(--color-text-tertiary);
    font-style: italic;
    background-color: var(--color-background-code);
    border-radius: 0 12px 12px 0;
  }

  .instructions-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px var(--color-shadow-primary);
  }

  .instructions-content :global(th),
  .instructions-content :global(td) {
    border: 1px solid var(--color-border-light);
    padding: 0.8rem 1rem;
    text-align: left;
  }

  .instructions-content :global(th) {
    background: linear-gradient(to right, var(--color-primary-light), var(--color-secondary-light));
    color: var(--color-text-primary);
    font-weight: 600;
  }
  
  .instructions-content :global(tr:nth-child(even)) {
    background-color: var(--color-background-tertiary);
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
      border-radius: 20px;
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