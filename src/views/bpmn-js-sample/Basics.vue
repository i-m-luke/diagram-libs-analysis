<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<!-- 
  Sample of basics:
  - Initializing a diagram
  - Accessing the diagram services (canvas, element registry, context pad)
  - Using element registry service

-->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import diagramRawXml from './complex-definition.bpmn?raw'

import Modeler from 'bpmn-js/lib/Modeler'
import Canvas from 'diagram-js/lib/core/Canvas'
import ElementRegistry from 'diagram-js/lib/core/ElementRegistry'
import type ContextPad from 'diagram-js/lib/features/context-pad/ContextPad'
import type { ModuleDeclaration } from 'didi'

const modeler = ref<Modeler | null>(null)

onMounted(async () => {
  // viewer (import Viewer from 'bpmn-js/lib/Viewer') = view only mode
  // modeler = editor/designer mode

  const container = document.querySelector('#modeler') as HTMLElement
  if (!container) {
    throw new Error('Container not found')
  }

  modeler.value = new Modeler({
    container
  })

  await modeler.value.importXML(diagramRawXml)

  // Modeler/Viewer.get(string): Used for getting diagram services

  // ACCESSING DIAGRAM CANVAS:
  const modelerCanvas = modeler.value.get<Canvas>('canvas')
  // VIEWPORT FITTING: modelerCanvas.zoom('fit-viewport')

  // GETTING ELEMENTS FROM THE REGISTRY:
  const elementRegistry = modeler.value.get<ElementRegistry>('elementRegistry')
  const allElements = elementRegistry.getAll()
  const processElement = elementRegistry.get('Process_1') // Process_1 has a definition in the imported XML (<bpmn2:process id="Process_1">)
  const taskElement = elementRegistry.get('Task_1')

  // CONTEXT PAD:
  const contextPad = modeler.value.get<ContextPad>('contextPad')
})
</script>

<template>
  <div style="width: 100vw; height: 100vh">
    <div id="viewer" />
    <div id="modeler" style="width: 100%; height: 100%" />
  </div>
</template>
