<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<!-- Sample of exporting definitions from a diagram -->

<script setup lang="ts">
import xmlDefinition from './basic-definition.bpmn?raw'

import { onMounted, ref } from 'vue'

import Modeler from 'bpmn-js/lib/Modeler'

const modeler = ref<Modeler | null>(null)

type SaveXMLResult = { xml?: string; error?: Error }
const exportedXml = ref<SaveXMLResult>({})

onMounted(async () => {
  const container = document.querySelector('#modeler') as HTMLElement
  if (!container) {
    throw new Error('Container not found')
  }

  modeler.value = new Modeler({
    container,
  })

  await modeler.value.importXML(xmlDefinition)
  exportedXml.value = await modeler.value.saveXML()
})
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <h1>Export sample</h1>
    <div id="modeler" style="width: 100%; height: 100%" />
    <span>Exported XML: {{ exportedXml.xml }}</span>
    <span>XML export error: {{ exportedXml.error }}</span>
    <span>Definitions: {{ modeler?.getDefinitions() }}</span>
  </div>
</template>
