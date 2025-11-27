import type { VisualizationSpec } from '~/types/visualization/spec'

export default {
  id: 'event-loop',
  version: '2.0.0',
  title: 'JavaScript Event Loop',
  description: 'Interactive visualization of the JavaScript event loop and async execution',
  tags: ['javascript', 'event-loop', 'async', 'callbacks', 'promises', 'fundamental'],
  
  scene: {
    layout: {
      type: 'grid',
      config: {
        columns: 2,
        gap: 24,
        columnWidth: 340,
        padding: 40,
        masonry: true,
        responsive: {
          mobile: { columns: 1 },
          tablet: { columns: 2 },
          desktop: { columns: 2 }
        }
      }
    },
    
    layers: [
      {
        id: 'main',
        name: 'Main Components',
        zIndex: 1,
        visible: true,
        
        nodes: [
          // === LEFT COLUMN (column: 0) ===
          
          {
            id: 'call-stack',
            type: 'stack',
            position: 'auto',
            size: { width: 320, height: 260 },
            style: {
              border: '#22c55e',
              background: '#1a1f1a',
              text: '#4ade80',
              borderWidth: 2
            },
            content: {
              title: 'Call Stack',
              description: 'Executes synchronously (LIFO)',
              items: [
                { id: 'fn3', label: 'function3()' },
                { id: 'fn2', label: 'function2()' },
                { id: 'fn1', label: 'function1()' },
                { id: 'main', label: 'main()' }
              ]
            },
            interactive: true,
            selectable: true,
            data: {},
            layout: { column: 0 }
          },
          
          // === RIGHT COLUMN (column: 1) ===
          
          {
            id: 'web-apis',
            type: 'box',
            position: 'auto',
            size: { width: 320, height: 260 },
            style: {
              border: '#ef4444',
              background: '#1f1414',
              text: '#f87171'
            },
            content: {
              title: 'Web APIs',
              description: 'Provided by runtime environment',
              items: [
                { id: 'timeout', label: 'setTimeout' },
                { id: 'fetch', label: 'fetch' },
                { id: 'dom', label: 'DOM events' },
                { id: 'interval', label: 'setInterval' }
              ]
            },
            interactive: true,
            selectable: true,
            data: {},
            layout: { column: 1 }
          },
          
          {
            id: 'callback-queue',
            type: 'queue',
            position: 'auto',
            size: { width: 320, height: 160 },
            style: {
              border: '#f59e0b',
              background: '#1f1a14',
              text: '#fbbf24'
            },
            content: {
              title: 'Callback Queue',
              description: 'FIFO - First In, First Out',
              items: [
                { id: 'cb3', label: 'cb3' },
                { id: 'cb2', label: 'cb2' },
                { id: 'cb1', label: 'cb1' }
              ]
            },
            interactive: true,
            selectable: true,
            data: {},
            layout: { column: 1 }
          },
          
          {
            id: 'microtask-queue',
            type: 'queue',
            position: 'auto',
            size: { width: 320, height: 150 },
            style: {
              border: '#ec4899',
              background: '#1f141a',
              text: '#f472b6'
            },
            content: {
              title: 'Microtask Queue',
              description: 'Higher priority than callback queue',
              items: [
                { id: 'p1', label: 'Promise' },
                { id: 'p2', label: 'Promise' }
              ]
            },
            interactive: true,
            selectable: true,
            data: {},
            layout: { column: 1 }
          },
          
          // === FULL WIDTH (spans both columns) ===
          
          {
            id: 'event-loop',
            type: 'box',
            position: 'auto',
            size: { width: 320, height: 200 },
            style: {
              border: '#6366f1',
              background: '#1a1a2e',
              text: '#818cf8'
            },
            content: {
              title: 'EVENT LOOP',
              description: 'while (true) { checkCallStack(); moveTasks(); }'
            },
            interactive: true,
            selectable: true,
            data: {
              svg: `<svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="100" cy="40" rx="80" ry="30" stroke="#818cf8" stroke-width="3" fill="none" stroke-dasharray="8 4"/>
                <polygon points="170,28 180,40 170,52" fill="#818cf8"/>
                <text x="100" y="45" text-anchor="middle" fill="#818cf8" font-size="16" font-family="monospace">∞ loop</text>
              </svg>`
            },
            layout: { colSpan: 1 }
          }
        ],
        
        edges: [
          {
            id: 'edge-1',
            from: 'web-apis',
            to: 'callback-queue',
            type: 'arrow',
            style: { color: '#737373', width: 2 },
            animated: true,
            label: 'async complete'
          },
          {
            id: 'edge-2',
            from: 'callback-queue',
            to: 'call-stack',
            type: 'arrow',
            style: { color: '#737373', width: 2 },
            animated: true,
            label: 'event loop'
          },
          {
            id: 'edge-3',
            from: 'microtask-queue',
            to: 'call-stack',
            type: 'arrow',
            style: { color: '#ec4899', width: 2 },
            animated: true,
            label: 'high priority'
          }
        ]
      }
    ],
    
    theme: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 14,
      borderRadius: 8,
      spacing: 16
    }
  },
  
  explanations: {
    global: {
      title: 'JavaScript Event Loop',
      content: 'The event loop is the heart of JavaScript\'s asynchronous execution model. It continuously monitors the call stack and task queues, moving callbacks to the stack when it\'s empty.',
      details: [
        '1. JavaScript executes code synchronously on the call stack',
        '2. Async operations (setTimeout, fetch, etc.) are handled by Web APIs',
        '3. When async operations complete, callbacks go to task queues',
        '4. Event loop moves callbacks to call stack when it\'s empty',
        '5. Microtasks (Promises) always run before regular callbacks'
      ]
    },
    
    nodes: {
      'call-stack': {
        title: 'Call Stack',
        content: 'A LIFO (Last In, First Out) data structure that keeps track of function calls in your program.',
        details: [
          'Functions are pushed onto the stack when called',
          'Functions are popped from the stack when they return',
          'Only one function can execute at a time (single-threaded)',
          'Stack overflow occurs when too many functions are called recursively'
        ],
        codeExample: `function third() { console.log('3'); }
function second() { third(); }
function first() { second(); }
first(); // Stack: first → second → third`
      },
      
      'web-apis': {
        title: 'Web APIs',
        content: 'Browser-provided APIs that handle asynchronous operations outside the JavaScript engine.',
        details: [
          'setTimeout and setInterval for timers',
          'fetch for HTTP requests',
          'DOM event listeners',
          'These run in separate threads, not blocking the main thread'
        ]
      },
      
      'callback-queue': {
        title: 'Callback Queue (Task Queue)',
        content: 'A FIFO queue that stores callback functions from completed async operations.',
        details: [
          'Callbacks wait here until call stack is empty',
          'Event loop moves ONE callback at a time to the stack',
          'Lower priority than microtask queue',
          'Also called the macro-task queue'
        ]
      },
      
      'microtask-queue': {
        title: 'Microtask Queue',
        content: 'A high-priority queue for Promise callbacks and mutation observers.',
        details: [
          'Higher priority than callback queue',
          'ALL microtasks run before the next callback',
          'Promise.then(), catch(), finally() callbacks go here',
          'Can cause starvation if microtasks keep adding more microtasks'
        ]
      },
      
      'event-loop': {
        title: 'Event Loop',
        content: 'The mechanism that coordinates execution between the call stack and task queues. It runs continuously, checking queues and moving tasks.',
        details: [
          '1. Check if the call stack is empty',
          '2. If empty, run ALL microtasks (Promise callbacks)',
          '3. Move ONE callback from callback queue to call stack',
          '4. Render UI updates (if in browser)',
          '5. Repeat the process indefinitely'
        ],
        codeExample: `// Simplified event loop pseudocode
while (true) {
  if (callStack.isEmpty()) {
    // Microtasks have priority
    while (microtaskQueue.hasItems()) {
      callStack.push(microtaskQueue.dequeue());
    }
    // Then one macro task
    if (callbackQueue.hasItems()) {
      callStack.push(callbackQueue.dequeue());
    }
  }
}`
      }
    }
  },
  
  interactions: {
    onClick: 'select',
    onHover: 'highlight',
    keyboardShortcuts: {
      'Escape': 'deselect',
      'ArrowRight': 'nextNode',
      'ArrowLeft': 'prevNode',
      'h': 'showHelp'
    }
  },
  
  rendering: {
    canvas: {
      width: 'auto',
      height: 900,
      backgroundColor: '#0a0a0a',
      pixelRatio: 'auto'
    },
    complexity: 'medium',
    nodeCount: 5
  }
} satisfies VisualizationSpec

