<template>
  <v-container class="container">
    <slot></slot>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  max-width: 900px;
  min-height: 100vh;
}
</style>
