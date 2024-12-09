<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<!-- PINS SAMPLE -->

<script setup lang="ts">
import xmlDefinition from '../basic-definition.bpmn?raw'

import { onMounted, ref } from 'vue'

import Modeler from 'bpmn-js/lib/Modeler'

import { TYPE, SchemaFactoryModule, type SchemaFactory } from './SchemaFactory'

import FunctionBlockRules from './FunctionBlockRules'
import FunctionBlockRenderer from './FunctionBlockRenderer'

const modeler = ref<Modeler | null>(null)

onMounted(async () => {
  const container = document.querySelector('#modeler') as HTMLElement
  if (!container) {
    throw new Error('Container not found')
  }

  modeler.value = new Modeler({
    container,
    additionalModules: [
      {
        SchemaFactoryModule,
        functionBlockRules: ['type', FunctionBlockRules],
        functionBlockRenderer: ['type', FunctionBlockRenderer],
      },
    ],
  })

  await modeler.value.importXML(xmlDefinition)

  const functionBlockFactory = modeler.value?.get<SchemaFactory>(TYPE)
})
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <h1>Custom render & rules sample</h1>
    <div id="modeler" style="width: 100%; height: 100%" />
  </div>
</template>
