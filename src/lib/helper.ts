import { type GameBaseConfig, type SiteConfig } from "./types";
import { browser } from "$app/environment";

export function getCoverUrl(site: SiteConfig, config: GameBaseConfig) {
  if (config.imageId === undefined) {
    return `${site.cdnBaseUrl}/images/${config.id}.webp`;
  } else {
    return `${site.cdnBaseUrl}/images/${config.imageId}.webp`;
  }
}

export function getGameUrl(site: SiteConfig, config: GameBaseConfig) {
  // if testing in local environment, use the local URL
  let baseUrl = site.baseUrl;
  if (browser && window.location.hostname === "localhost") {
    baseUrl = "http://localhost:5174";
  }
  if (config.routeId === undefined) {
    return `${baseUrl}/${config.id}`;
  } else {
    return `${baseUrl}/${config.routeId}`;
  }
}

export function getIframeUrl(site: SiteConfig, config: GameBaseConfig) {
  if (config.iframeUrl !== undefined) {
    return config.iframeUrl;
  } else {
    return `${site.cdnBaseUrl}/games/${config.id}.html`;
  }
}

export function getSeoTitle(site: SiteConfig, config: GameBaseConfig) {
  if (config.seoTitle !== undefined) {
    return config.seoTitle;
  } else {
    return `${config.title} | Play ${config.title} On ${site.name}`;
  }
}
