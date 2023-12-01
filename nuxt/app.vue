<template>
  <main class="h-screen overflow-x-hidden overflow-y-hidden bg-black">
    <NuxtPage :key="$route.fullPath" />
  </main>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

main {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
}
</style>
