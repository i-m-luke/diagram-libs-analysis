<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { routes } from './router'
</script>

<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink :to="routes.bpmnJsSample">BPMN.js</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
