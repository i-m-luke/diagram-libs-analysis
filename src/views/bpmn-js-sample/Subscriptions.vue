<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<!-- Sample of subscribing to diagram chagnes -->

<script setup lang="ts">
import xmlDefinition from './basic-definition.bpmn?raw'

import { onMounted, ref } from 'vue'

import Modeler from 'bpmn-js/lib/Modeler'
import EventBus from 'diagram-js/lib/core/EventBus'

const modeler = ref<Modeler | null>(null)
const eventLogs = ref<string[]>([])

onMounted(async () => {
  const container = document.querySelector('#modeler')
  if (!container) {
    throw new Error('Container not found')
  }

  if (!(container instanceof HTMLElement)) {
    throw new Error('Container is not an HTMLElement')
  }

  modeler.value = new Modeler({
    container,
  })

  await modeler.value.importXML(xmlDefinition)

  // LISTENING USING MODELER on
  modeler.value.on('element.click', event => {
    console.log('elements changed: ', event)
    eventLogs.value.push('element clicked')
  })

  // triggers on every change (e.g. moving an element, or chaning its properties)
  modeler.value.on('elements.changed', event => {
    eventLogs.value.push('elements changed')
    console.log('elements changed: ', event)
    console.log('current definitions: ', modeler.value?.getDefinitions())
  })

  // LISTENING USING EventBus
  const eventBus = modeler.value.get<EventBus>('eventBus')
  eventBus.on('element.hover', event => {})
})
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <h1>Subscriptions sample</h1>
    <div id="modeler" style="width: 100%; height: 100%" />
  </div>
  <div style="overflow: scroll">
    <li v-for="log in eventLogs" :key="log">
      {{ log }}
    </li>
  </div>
</template>
