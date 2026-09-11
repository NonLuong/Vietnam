const paths: Record<string, string> = {
  overview:'<path d="M4 13h6V4H4zM14 20h6V11h-6zM4 20h6v-3H4zM14 7h6V4h-6z"/>',
  receipt:'<path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
  calendar:'<path d="M4 5h16v15H4zM8 3v4M16 3v4M4 9h16"/>',
  car:'<path d="M5 17h14v-5l-2-5H7l-2 5zM7 17v2M17 17v2M5 12h14M8 14h.01M16 14h.01"/>',
  users:'<path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 21v-2a6 6 0 0 1 12 0v2M16 3.13a4 4 0 0 1 0 7.75M18 21v-2a6 6 0 0 0-3-5.2"/>',
  settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.55V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63 1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.63a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9 1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', search:'<path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-5.35-5.35"/>',
  edit:'<path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4z"/>', trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
  wallet:'<path d="M4 5h14a2 2 0 0 1 2 2v12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM16 13h4"/>',
  plane:'<path d="M10 18l-7 3v-2l4-3v-5L2 8V6l8 3 5-7h2l-2 8 6 3v2l-6 1 2 6h-2z"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>', close:'<path d="M6 6l12 12M18 6L6 18"/>', check:'<path d="M5 12l5 5L20 7"/>'
}
export function icon(name: string, size=20){return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.overview}</svg>`}
