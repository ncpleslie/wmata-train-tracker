/**
 * Executes a callback function at a specified interval when the component is mounted.
 * The interval is cleared when the component is unmounted.
 * Skips a tick if the previous callback is still in flight.
 *
 * @param callback - The callback function to be executed at the specified interval.
 * @param delay - The delay in milliseconds between each execution of the callback function.
 */
export const useMountedInterval = (
  callback: () => void | Promise<void>,
  delay: number
) => {
  const refreshInterval = ref<NodeJS.Timeout>();
  let inFlight = false;

  onMounted(() => {
    refreshInterval.value = setInterval(async () => {
      if (inFlight) {
        return;
      }
      inFlight = true;
      try {
        await callback();
      } finally {
        inFlight = false;
      }
    }, delay);
  });

  onUnmounted(() => {
    clearInterval(refreshInterval.value);
  });
};
