<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { VisualizationSpec } from '~/types/visualization/spec'
import { SceneGraph } from '~/lib/scene/core/SceneGraph'

interface Props {
  spec: VisualizationSpec
  selectedNodeId: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'node-select': [nodeId: string]
  'node-deselect': []
}>()

const canvasContainer = ref<HTMLDivElement | null>(null)
const sceneGraphRef = ref<SceneGraph | null>(null)

onMounted(() => {
  if (!canvasContainer.value || !props.spec) return
  
  // Create scene graph with Konva
  sceneGraphRef.value = new SceneGraph(
    canvasContainer.value,
    props.spec.scene,
    props.spec.rendering
  )
  
  // Setup click interactions
  setupInteractions()
})

onUnmounted(() => {
  sceneGraphRef.value?.destroy()
})

function setupInteractions() {
  const sceneGraph = sceneGraphRef.value
  if (!sceneGraph) return
  
  // Listen to node clicks
  for (const node of sceneGraph.getAllNodes()) {
    if (node.interactive) {
      node.konvaGroup.on('click tap', (e) => {
        e.cancelBubble = true // Prevent stage click
        emit('node-select', node.id)
      })
      
      // Hover effects
      node.konvaGroup.on('mouseenter', () => {
        node.hover()
        sceneGraph.stage.container().style.cursor = 'pointer'
      })
      
      node.konvaGroup.on('mouseleave', () => {
        node.unhover()
        sceneGraph.stage.container().style.cursor = 'default'
      })
    }
  }
  
  // Click on stage to deselect
  sceneGraph.stage.on('click tap', (e) => {
    if (e.target === sceneGraph.stage) {
      emit('node-deselect')
    }
  })
}

// Watch for selection changes
watch(() => props.selectedNodeId, (newId, oldId) => {
  const sceneGraph = sceneGraphRef.value
  if (!sceneGraph) return
  
  // Deselect old
  if (oldId) {
    const oldNode = sceneGraph.getNode(oldId)
    oldNode?.deselect()
  }
  
  // Select new
  if (newId) {
    const newNode = sceneGraph.getNode(newId)
    newNode?.select()
  }
})
</script>

<template>
  <div class="relative w-full">
    <!-- Konva canvas container -->
    <div 
      ref="canvasContainer" 
      class="rounded-lg overflow-hidden canvas-container"
      :style="{
        width: '100%',
        height: spec.rendering.canvas.height === 'auto' ? '600px' : `${spec.rendering.canvas.height}px`,
        backgroundColor: spec.rendering.canvas.backgroundColor
      }"
    />
  </div>
</template>

<style>
.canvas-container {
  cursor: default;
}
</style>
