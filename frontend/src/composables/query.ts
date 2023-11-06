export const query = <T, E>(awaitable: Promise<T>) => {
  const data = ref<T>();
  const error = ref<E>();
  const isLoading = ref(false);

  (async () => {
    try {
      isLoading.value = true;
      const trainsResponse = await awaitable;
      data.value = trainsResponse as T;
    } catch (e) {
      error.value = e as E;
    } finally {
      isLoading.value = false;
    }
  })();

  return {
    data,
    error,
    isLoading,
  };
};
