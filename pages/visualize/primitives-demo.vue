<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Konva from 'konva'
import { createBoxPrimitive } from '~/lib/scene/primitives/BoxPrimitive'
import { createStackPrimitive } from '~/lib/scene/primitives/StackPrimitive'
import { createQueuePrimitive } from '~/lib/scene/primitives/QueuePrimitive'
import { createHeapPrimitive } from '~/lib/scene/primitives/HeapPrimitive'
import { createTimelinePrimitive } from '~/lib/scene/primitives/TimelinePrimitive'
import { createArrowPrimitive } from '~/lib/scene/primitives/ArrowPrimitive'
import { createLabelPrimitive } from '~/lib/scene/primitives/LabelPrimitive'
import { createGroupPrimitive } from '~/lib/scene/primitives/GroupPrimitive'
import type { SceneNode } from '~/lib/scene/core/SceneNode'

useHead({
  title: 'Primitives Demo - Visual Test'
})

const canvasContainer = ref<HTMLDivElement | null>(null)
let stage: Konva.Stage | null = null

onMounted(() => {
  if (!canvasContainer.value) return
  
  // Create Konva stage
  stage = new Konva.Stage({
    container: canvasContainer.value,
    width: window.innerWidth - 100,
    height: 2400,
  })
  
  const layer = new Konva.Layer()
  stage.add(layer)
  
  // Mock SceneLayer for primitives
  const mockLayer = {
    id: 'test',
    name: 'Test Layer',
    zIndex: 1,
    visible: true,
    konvaLayer: layer,
  } as any
  
  let yOffset = 20
  
  // 1. Box Primitive
  const boxNode = createMockNode('box', yOffset, {
    title: 'Box Primitive',
    description: 'Generic container for components',
    items: [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
    ]
  })
  const box = createBoxPrimitive(boxNode)
  layer.add(box)
  yOffset += 220
  
  // 2. Stack Primitive
  const stackNode = createMockNode('stack', yOffset, {
    title: 'Call Stack',
    description: 'LIFO - Last In, First Out',
    items: [
      { id: 'fn3', label: 'function3()' },
      { id: 'fn2', label: 'function2()' },
      { id: 'fn1', label: 'function1()' },
      { id: 'main', label: 'main()' }
    ]
  }, { width: 300, height: 350 })
  const stack = createStackPrimitive(stackNode)
  layer.add(stack)
  yOffset += 370
  
  // 3. Queue Primitive
  const queueNode = createMockNode('queue', yOffset, {
    title: 'Callback Queue',
    description: 'FIFO - First In, First Out',
    items: [
      { id: 'cb1', label: 'cb1' },
      { id: 'cb2', label: 'cb2' },
      { id: 'cb3', label: 'cb3' }
    ]
  }, { width: 400, height: 200 })
  const queue = createQueuePrimitive(queueNode)
  layer.add(queue)
  yOffset += 220
  
  // 4. Heap Primitive
  const heapNode = createMockNode('heap', yOffset, {
    title: 'Memory Heap',
    description: 'Memory allocation',
    items: [
      { id: 'obj', label: 'Objects: {}' },
      { id: 'arr', label: 'Arrays: []' },
      { id: 'fn', label: 'Functions' },
      { id: 'str', label: 'Strings' }
    ]
  }, { width: 350, height: 220 })
  const heap = createHeapPrimitive(heapNode)
  layer.add(heap)
  yOffset += 240
  
  // 5. Timeline Primitive
  const timelineNode = createMockNode('timeline', yOffset, {
    title: 'EVENT LOOP',
    description: 'while (true) { checkCallStack(); }',
    items: [
      { id: 's1', label: 'Check if call stack is empty' },
      { id: 's2', label: 'If empty, run all microtasks' },
      { id: 's3', label: 'Move one callback to call stack' },
      { id: 's4', label: 'Render UI (if browser)' }
    ]
  }, { width: 450, height: 300 })
  const timeline = createTimelinePrimitive(timelineNode)
  layer.add(timeline)
  yOffset += 320
  
  // 6. Arrow Primitive (right)
  const arrowRightNode = createMockNode('arrow', yOffset, {
    title: 'data flow'
  }, { width: 200, height: 40 })
  arrowRightNode.data = { direction: 'right', length: 200, animated: true }
  const arrowRight = createArrowPrimitive(arrowRightNode)
  layer.add(arrowRight)
  yOffset += 60
  
  // 7. Label Primitive
  const labelNode = createMockNode('label', yOffset, {
    title: 'Label Primitive',
    description: 'Text annotations and captions'
  }, { width: 300, height: 60 })
  labelNode.style = {
    ...labelNode.style,
    background: '#fef3c7',
    border: '#ca8a04',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 14,
    align: 'center'
  }
  const label = createLabelPrimitive(labelNode)
  layer.add(label)
  yOffset += 80
  
  // 8. Group Primitive
  const groupNode = createMockNode('group', yOffset, {
    title: 'JS ENGINE (V8)',
    description: 'Core JavaScript execution environment'
  }, { width: 400, height: 150 })
  const group = createGroupPrimitive(groupNode)
  layer.add(group)
  
  layer.draw()
})

onUnmounted(() => {
  stage?.destroy()
})

function createMockNode(
  type: string,
  yPos: number,
  content: any,
  size: { width: number; height: number } = { width: 350, height: 200 }
): SceneNode {
  const mockNode = {
    id: `${type}-demo`,
    type,
    position: { x: 50, y: yPos },
    size,
    style: getDefaultStyle(type),
    content,
    interactive: false,
    selectable: false,
    draggable: false,
    data: {},
  } as any
  
  return mockNode
}

function getDefaultStyle(type: string): Record<string, any> {
  const styles: Record<string, any> = {
    box: {
      background: '#ffffff',
      border: '#2563eb',
      borderWidth: 2,
      borderRadius: 8,
      text: '#1e293b'
    },
    stack: {
      background: '#ffffff',
      border: '#16a34a',
      borderWidth: 2,
      borderRadius: 8,
      text: '#15803d'
    },
    queue: {
      background: '#fffbeb',
      border: '#ca8a04',
      borderWidth: 2,
      borderRadius: 8,
      text: '#a16207'
    },
    heap: {
      background: '#ffffff',
      border: '#ea580c',
      borderWidth: 2,
      borderRadius: 8,
      text: '#c2410c'
    },
    timeline: {
      background: '#eef2ff',
      border: '#4f46e5',
      borderWidth: 2,
      borderRadius: 8,
      text: '#4338ca'
    },
    arrow: {
      border: '#64748b',
      borderWidth: 2
    },
    label: {
      text: '#1e293b'
    },
    group: {
      background: '#eff6ff',
      border: '#2563eb',
      borderWidth: 2,
      borderRadius: 8
    }
  }
  
  return styles[type] || {}
}
</script>

<template>
  <div class="primitives-demo">
    <header class="header">
      <h1>Konva Primitives Demo</h1>
      <p>Visual test for all implemented primitive components</p>
      <NuxtLink to="/visualize" class="back-link">← Back to Visualizations</NuxtLink>
    </header>
    
    <div class="canvas-wrapper">
      <div ref="canvasContainer" class="canvas-container" />
    </div>
    
    <footer class="legend">
      <h2>Primitives Implemented:</h2>
      <ul>
        <li><strong>Box:</strong> Generic container with title, description, and items</li>
        <li><strong>Stack:</strong> LIFO visualization (e.g., Call Stack)</li>
        <li><strong>Queue:</strong> FIFO visualization (e.g., Callback Queue)</li>
        <li><strong>Heap:</strong> Memory allocation visualization</li>
        <li><strong>Timeline:</strong> Step-by-step process visualization</li>
        <li><strong>Arrow:</strong> Directional connectors (animated)</li>
        <li><strong>Label:</strong> Text annotations with optional background</li>
        <li><strong>Group:</strong> Container for grouping components</li>
      </ul>
    </footer>
  </div>
</template>

<style scoped>
.primitives-demo {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1.5rem;
}

.header {
  margin-bottom: 2rem;
  text-align: center;
}

.header h1 {
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.header p {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 1rem;
}

.back-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
}

.back-link:hover {
  background-color: #1d4ed8;
}

.canvas-wrapper {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.canvas-container {
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
}

.legend {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
}

.legend h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
}

.legend ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.legend li {
  color: #374151;
  margin-bottom: 0.5rem;
}

.legend strong {
  color: #111827;
  font-weight: 600;
}
</style>

