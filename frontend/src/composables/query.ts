/**
 * A custom hook for handling asynchronous queries. It takes a Promise as an argument,
 * executes it, and provides reactive values for data, error, and loading status.
 *
 * @param queryFn - A function that returns a Promise for the asynchronous operation.
 *
 * @returns An object with the following properties:
 *   - data: A ref holding the result of the asynchronous operation (undefined initially).
 *   - error: A ref holding any error that occurred during the operation (undefined initially).
 *   - isLoading: A ref indicating whether the asynchronous operation is in progress.
 *   - refetch: A function to manually trigger the execution of the asynchronous operation.
 *
 * Example usage:
 * ```typescript
 * const { data, error, isLoading, refetch } = useQuery(() => fetchData());
 * ```
 */
export const useQuery = <T, E = Error>(queryFn: () => Promise<T>) => {
  const data = ref<T>();
  const error = ref<E>();
  const isLoading = ref(false);

  let generation = 0;
  onScopeDispose(() => {
    generation++;
  });

  const execute = () => {
    const id = ++generation;
    (async () => {
      try {
        isLoading.value = true;
        const response = await queryFn();
        if (id !== generation) {
          return;
        }
        data.value = response as T;
        error.value = undefined;
      } catch (e) {
        if (id !== generation) {
          return;
        }
        console.error(e);
        error.value = e as E;
      } finally {
        if (id === generation) {
          isLoading.value = false;
        }
      }
    })();
  };

  execute();

  return {
    data,
    error,
    isLoading,
    /**
     * Refresh Function
     *
     * Initiates the asynchronous operation, updates reactive values based on the operation's outcome,
     * and sets the loading status accordingly.
     */
    refetch: execute,
  };
};
