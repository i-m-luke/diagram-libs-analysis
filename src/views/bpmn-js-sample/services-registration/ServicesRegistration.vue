<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<!-- Sample of registering diagram services -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Modeler from 'bpmn-js/lib/Modeler'
import type { ModuleDeclaration } from 'didi'
import {ClassService} from './ClassService'

const modeler = ref<Modeler | null>(null)

onMounted(async () => {
  const container = document.querySelector('#modeler') as HTMLElement
  if (!container) {
    throw new Error('Container not found')
  }

  // CUSTOM SERVICE REGISTRATION:
  type InjectedObject = {
    prop: string
  }

  // first item in the array specifices the type injection
  // possible options are:
  // 'value': returns the value as is
  // 'factory': calls provided factory function
  // 'type': creates a new instance of the provided type
  const module: ModuleDeclaration = {
    injectedValue: ['value', { prop: 'value' } satisfies InjectedObject],
    injectedType: ['type', ClassService],
  }

  modeler.value = new Modeler({
    additionalModules: [module],
    container,
  })

  // CONSUMING CUSTOM SERVICE:
  const injectedObject = modeler.value.get<InjectedObject>('injectedValue')
  const injectedType = modeler.value.get<ClassService>('injectedType')
})
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <div id="modeler" style="width: 100%; height: 100%" />
  </div>
</template>
