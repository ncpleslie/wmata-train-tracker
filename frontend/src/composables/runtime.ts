import { RuntimeErrorEvent, RuntimeEvent } from "@/constants/constants";
import { EventsOn } from "@wails/runtime/runtime";

type RuntimeEventKeys = keyof typeof RuntimeEvent;
type RuntimeEventValues = (typeof RuntimeEvent)[RuntimeEventKeys];

type RuntimeErrorEventKeys = keyof typeof RuntimeErrorEvent;
type RuntimeErrorEventValues =
  (typeof RuntimeErrorEvent)[RuntimeErrorEventKeys];

/**
 * A utility function that provides a simplified interface for interacting with runtime events.
 * It encapsulates the `EventsOn` function and offers a typed `eventOn` method to subscribe to runtime events.
 *
 * @returns An object with a method to subscribe to runtime events.
 *
 * Example usage:
 * ```typescript
 * const runtime = useRuntime();
 * runtime.eventOn('customEvent', (data: CustomEventData) => {
 *   // Handle the runtime event data
 * });
 * ```
 */
export const useRuntime = () => {
  /**
   * Subscribes to a specific runtime event and executes the provided callback when the event occurs.
   *
   * @param event - The name of the runtime event to subscribe to.
   * @param callback - A callback function to handle the data when the runtime event occurs.
   * @template T - The type of data expected from the runtime event.
   * @see {@link EventsOn}
   */
  const eventOn = <T>(
    event: RuntimeEventValues | RuntimeErrorEventValues,
    callback: (value: T) => void
  ) => {
    EventsOn(event, (eventData: T) => {
      callback(eventData);
    });
  };

  return {
    eventOn,
  };
};
