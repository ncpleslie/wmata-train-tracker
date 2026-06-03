/**
 * Hard-reloads the browser on an interval, outside of Vue's component lifecycle.
 * Clears memory thoroughly for long-running kiosk sessions.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  setInterval(() => {
    window.location.reload();
  }, config.public.applicationRefreshInMs);
});
