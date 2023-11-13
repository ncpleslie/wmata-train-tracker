<script setup lang="ts"></script>

<template>
  <main class="h-screen overflow-x-hidden overflow-y-hidden bg-black">
    <router-view></router-view>
    <!-- <HomeView
      :train-data="data"
      :selected-station-name="selectedStationName"
      :has-incidents="hasIncidents"
      :is-refreshing="isRefreshing"
    /> -->
  </main>
</template>

<style scoped>
main {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
}
</style>
