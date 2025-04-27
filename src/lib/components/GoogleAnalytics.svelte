<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let measurementId;

  onMount(() => {
    if (browser) {
      const isLocalhost = window.location.hostname === 'localhost';
      if (!isLocalhost) {
        // Add GA script
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script1);

        // Initialize GA
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', measurementId);

        // Add gtag to window
        window.gtag = gtag;
      }
    }
  });
</script>