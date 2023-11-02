import { type client } from "./plugins/client";

declare module "#app" {
  interface NuxtApp {
    $client: client;
  }
}

export {};
