<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<script setup lang="ts">
import xmlDefinition from './basic-definition.bpmn?raw'

import ElementRegistry from 'diagram-js/lib/core/ElementRegistry'
import CommandStack from 'diagram-js/lib/command/CommandStack'
import ElementFactory from 'diagram-js/lib/core/ElementFactory'
import Modeler from 'bpmn-js/lib/Modeler'
import BpmnFactory from 'bpmn-js/lib/features/modeling/BpmnFactory'
import Modeling from 'bpmn-js/lib/features/modeling/Modeling'
import type { Parent } from 'bpmn-js/lib/model/Types'
import { onMounted, ref } from 'vue'

const modeler = ref<Modeler | null>(null)
let commandStack: CommandStack | null = null

onMounted(async () => {
  const container = document.querySelector('#modeler') as HTMLElement
  if (!container) {
    throw new Error('Container not found')
  }

  modeler.value = new Modeler({
    container,
  })

  await modeler.value.importXML(xmlDefinition)

  modeler.value.on('elements.changed', event => {
    console.log('elements changed', event)
  })
})

async function createElement(type: string, name: string) {
  if (!modeler.value) {
    return
  }

  // TODO: Je pro vytvoření elementu použít BpmnFactory, ElementFactory a Modeling?
  const createdElementId = 'CreatedElementId'
  const bpmnFactory = modeler.value.get<BpmnFactory>('bpmnFactory')
  const myBussinesObject = bpmnFactory.create(type, {
    id: createdElementId,
    name: name,
    text: 'SOME TEXT!',
  })

  const elementFactory = modeler.value.get<ElementFactory>('elementFactory')
  const element = elementFactory.createShape({
    type,
    businessObject: myBussinesObject,
  })

  // TODO - Nastudovat modeling usage: https://github.com/bpmn-io/bpmn-js/blob/e48603e158852f49fc8d81138509e11839a76b57/lib/features/modeling/Modeling.test.ts
  const modeling = modeler.value.get<Modeling>('modeling')
  const elementRegistry = modeler.value.get<ElementRegistry>('elementRegistry')

  const processElement = elementRegistry.get('Process_1') // Process_1 has a definition in the imported XML (<bpmn2:process id="Process_1">)
  if (!processElement) {
    throw new Error('Process element not found')
  }

  modeling.createShape(element, { x: 100, y: 100 }, processElement as Parent)

  console.log('created element:', elementRegistry.get(createdElementId))

  commandStack = modeler.value.get<CommandStack>('commandStack')
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <h1>Element factory sample</h1>
    <button @click="createElement('bpmn:Task', 'My Task')">Create Task</button>
    <button @click="() => commandStack?.undo()">Undo</button>
    <button @click="() => commandStack?.redo()">Redo</button>
    <div id="modeler" style="width: 100%; height: 100%" />
  </div>
</template>
