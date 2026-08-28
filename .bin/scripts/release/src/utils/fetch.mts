import type { RequestInit } from "undici";
import { fetch as undiciFetch, ProxyAgent } from "undici";

export function getProxyUrl() {
  return process.env.HTTPS_PROXY || process.env.HTTP_PROXY || null;
}

export async function fetchWithProxy(url: string, options: RequestInit) {
  const undiciOptions = {
    ...options,
  };

  const proxyUrl = getProxyUrl();
  if (proxyUrl) {
    undiciOptions.dispatcher = new ProxyAgent(proxyUrl);
  }
  return undiciFetch(url, undiciOptions);
}
