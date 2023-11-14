import { useRouter } from "vue-router";
import { Route } from "@/constants/constants";

type RouteKeys = keyof typeof Route;
type RouteValues = (typeof Route)[RouteKeys];

/**
 * A utility function that wraps the Vue Router's `useRouter` hook and provides type safety
 * for the `pushPath` method by accepting a typed `RouteValues` parameter.
 *
 * @returns An object with the same properties as the Vue Router's `useRouter` hook,
 *          along with an enhanced `push` method that accepts a typed `RouteValues` parameter.
 *
 * Example usage:
 * ```typescript
 * const { pushPath, currentRoute } = useTypedRouter();
 * pushPath(Route.Index);
 * ```
 *
 * @see {@link https://next.router.vuejs.org/ | Vue Router}
 */
export const useTypedRouter = () => {
  const router = useRouter();

  const pushPath = (route: RouteValues) => {
    router.push(route);
  };

  return {
    ...router,
    pushPath,
  };
};
