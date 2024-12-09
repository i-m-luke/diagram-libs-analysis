<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<script setup lang="ts">
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'

import { ref } from 'vue'

import Basics from './bpmn-js-sample/Basics.vue'
import Export from './bpmn-js-sample/Export.vue'
import CustomRenderAndRules from './bpmn-js-sample/custom-render-and-rules/CustomRenderAndRules.vue'
import Subscriptions from './bpmn-js-sample/Subscriptions.vue'
import ElementFactory from './bpmn-js-sample/ElementFactory.vue'
import ServicesRegistration from './bpmn-js-sample/services-registration/ServicesRegistration.vue'

const renderedComponent = ref(Basics)
</script>

<template>
  <div style="width: 100vw; height: 100vh">
    <h1>BPMN.js samples</h1>
    <button @click="() => (renderedComponent = Basics)">Basics sample</button>
    <button @click="() => (renderedComponent = Export)">Export sample</button>
    <button @click="() => (renderedComponent = CustomRenderAndRules)">
      Custom render and rules sample
    </button>
    <button @click="() => (renderedComponent = Subscriptions)">
      Subscriptions sample
    </button>
    <button @click="() => (renderedComponent = ElementFactory)">
      Element Factory sample
    </button>
    <button @click="() => (renderedComponent = ServicesRegistration)">
      Services registration sample
    </button>
    <component :is="renderedComponent" />
  </div>
</template>
