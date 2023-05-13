<script setup lang="ts">
const { $client } = useNuxtApp();

const { data: hello } = await $client.hello.useQuery({ text: "client" });
</script>

<template>
  <div>
    <p>{{ hello?.greeting }}</p>
  </div>
</template>
