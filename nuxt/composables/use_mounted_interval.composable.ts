/**
 * Executes a callback function at a specified interval when the component is mounted.
 * The interval is cleared when the component is unmounted.
 *
 * @param callback - The callback function to be executed at the specified interval.
 * @param delay - The delay in milliseconds between each execution of the callback function.
 */
export const useMountedInterval = (
  callback: () => void | Promise<void>,
  delay: number
) => {
  const refreshInterval = ref<NodeJS.Timer>();

  onMounted(() => {
    refreshInterval.value = setInterval(callback, delay);
  });

  onUnmounted(() => {
    clearInterval(refreshInterval.value);
  });
};
