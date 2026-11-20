/**
 * Config for the banner at the top of data.norge.no
 * 
 * It hides itself when the time in `until` is reached, so you can leave it and it will disappear on its own.
 * Set `until` to null only when you want to turn the banner off right away.
 *
 * How to write `until`:
 * - "2026-11-21" means midnight UTC, which is 01:00 in Oslo in winter.
 * - "2026-11-21T06:00:00+01:00" means 06:00 Norwegian time. Use +01:00 in winter and +02:00 in summer.
 */
export const bannerConfig = {
  until: "2026-11-21",
  href: "https://datalandsbyen.norge.no/topic/815/planlagt-vedlikehold-fredag-20.11.2026-kl-22-00",
  message: {
    nb: "Planlagt vedlikehold fredag kl. 22:00.",
    nn: "Planlagt vedlikehald fredag kl. 22:00.",
    en: "Planned maintenance Friday at 10PM.",
  },
};
