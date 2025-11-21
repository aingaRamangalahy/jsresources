
import type { VisualizationSpec } from '~/types/visualization/spec'

export default {
  id: 'js-runtime',
  version: '2.0.0',
  title: 'JavaScript Runtime Environment',
  description: 'Interactive visualization of the JavaScript event loop and runtime components',
  tags: ['javascript', 'runtime', 'event-loop', 'async', 'fundamental'],
  
  scene: {
    layout: {
      type: 'grid',
      config: {
        columns: 2,
        gap: 24,
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
          {
            id: 'js-engine',
            type: 'group',
            position: 'auto',
            size: 'auto',
            style: {
              border: '#2563eb',
              background: '#eff6ff',
              borderWidth: 2,
              borderRadius: 8
            },
            content: {
              title: 'JS ENGINE (V8, SpiderMonkey)',
              description: 'Core JavaScript execution environment'
            },
            interactive: true,
            selectable: true,
            draggable: false,
            data: {
              children: ['call-stack', 'memory-heap']
            }
          },
          
          {
            id: 'call-stack',
            type: 'stack',
            position: 'auto',
            size: { width: 300, height: 400 },
            style: {
              border: '#16a34a',
              background: '#ffffff',
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
            draggable: false,
            data: {}
          },
          
          {
            id: 'memory-heap',
            type: 'heap',
            position: 'auto',
            size: { width: 300, height: 200 },
            style: {
              border: '#ea580c',
              background: '#ffffff'
            },
            content: {
              title: 'Memory Heap',
              description: 'Memory allocation',
              items: [
                { id: 'obj', label: 'Objects: {}' },
                { id: 'arr', label: 'Arrays: []' },
                { id: 'fn', label: 'Functions' }
              ]
            },
            interactive: true,
            selectable: true,
            draggable: false,
            data: {}
          },
          
          {
            id: 'web-apis',
            type: 'box',
            position: 'auto',
            size: 'auto',
            style: {
              border: '#dc2626',
              background: '#fef2f2'
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
            draggable: false,
            data: {}
          },
          
          {
            id: 'callback-queue',
            type: 'queue',
            position: 'auto',
            size: 'auto',
            style: {
              border: '#ca8a04',
              background: '#fffbeb'
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
            draggable: false,
            data: {}
          },
          
          {
            id: 'microtask-queue',
            type: 'queue',
            position: 'auto',
            size: 'auto',
            style: {
              border: '#db2777',
              background: '#fdf2f8'
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
            draggable: false,
            data: {}
          },
          
          {
            id: 'event-loop',
            type: 'timeline',
            position: 'auto',
            size: 'auto',
            style: {
              border: '#4f46e5',
              background: '#eef2ff'
            },
            content: {
              title: 'EVENT LOOP',
              description: 'while (true) { checkCallStack(); moveTasks(); }',
              items: [
                { id: 's1', label: '1. Check if call stack is empty' },
                { id: 's2', label: '2. If empty, run all microtasks' },
                { id: 's3', label: '3. Move one callback to call stack' },
                { id: 's4', label: '4. Render UI (if browser)' },
                { id: 's5', label: '5. Repeat process' }
              ]
            },
            interactive: true,
            selectable: true,
            draggable: false,
            data: {}
          }
        ],
        
        edges: [
          {
            id: 'edge-1',
            from: 'web-apis',
            to: 'callback-queue',
            type: 'arrow',
            style: { color: '#64748b', width: 2 },
            animated: true,
            label: 'async complete'
          },
          {
            id: 'edge-2',
            from: 'callback-queue',
            to: 'call-stack',
            type: 'arrow',
            style: { color: '#64748b', width: 2 },
            animated: true,
            label: 'event loop'
          },
          {
            id: 'edge-3',
            from: 'microtask-queue',
            to: 'call-stack',
            type: 'arrow',
            style: { color: '#db2777', width: 2 },
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
      title: 'JavaScript Runtime Environment',
      content: 'The JavaScript runtime environment consists of the JavaScript engine and Web APIs that work together to execute asynchronous code. The event loop coordinates between the call stack and various task queues to ensure smooth execution.',
      details: [
        '1. JavaScript code is executed synchronously on the call stack',
        '2. Asynchronous operations are handled by Web APIs',
        '3. Completed async operations queue callbacks in task queues',
        '4. Event loop moves queued callbacks to call stack when empty',
        '5. Microtasks have higher priority than regular callbacks'
      ]
    },
    
    nodes: {
      'js-engine': {
        title: 'JavaScript Engine',
        content: 'The core part of the runtime that executes JavaScript code. Popular engines include V8 (Chrome, Node.js), SpiderMonkey (Firefox), and JavaScriptCore (Safari).',
        details: [
          'Parses and compiles JavaScript code',
          'Manages memory allocation and garbage collection',
          'Contains the call stack and memory heap',
          'Executes code synchronously in a single thread'
        ]
      },
      
      'call-stack': {
        title: 'Call Stack',
        content: 'A LIFO (Last In, First Out) data structure that keeps track of function calls in your program.',
        details: [
          'Functions are pushed onto the stack when called',
          'Functions are popped from the stack when they return',
          'Only one function can execute at a time',
          'Stack overflow occurs when too many functions are called recursively'
        ],
        codeExample: `function third() { console.log('3'); }
function second() { third(); }
function first() { second(); }
first(); // Stack: first → second → third`
      },
      
      'memory-heap': {
        title: 'Memory Heap',
        content: 'An unstructured memory pool where objects, arrays, and functions are stored.',
        details: [
          'Dynamic memory allocation for objects',
          'Managed by garbage collector',
          'Larger and more flexible than the stack',
          'Reference-based memory management'
        ]
      },
      
      'web-apis': {
        title: 'Web APIs',
        content: 'Browser-provided APIs that handle asynchronous operations outside the JavaScript engine.',
        details: [
          'setTimeout and setInterval for timers',
          'fetch for HTTP requests',
          'DOM event listeners',
          'Runs in separate threads'
        ]
      },
      
      'callback-queue': {
        title: 'Callback Queue (Task Queue)',
        content: 'A FIFO queue that stores callback functions from completed async operations.',
        details: [
          'Callbacks wait here until call stack is empty',
          'Event loop checks this queue',
          'Lower priority than microtask queue',
          'Also called macro-task queue'
        ]
      },
      
      'microtask-queue': {
        title: 'Microtask Queue',
        content: 'A high-priority queue for Promise callbacks and mutation observers.',
        details: [
          'Higher priority than callback queue',
          'All microtasks run before next callback',
          'Promise.then() callbacks go here',
          'Can cause starvation if not careful'
        ]
      },
      
      'event-loop': {
        title: 'Event Loop',
        content: 'The mechanism that coordinates execution between the call stack and task queues.',
        details: [
          'Continuously checks if call stack is empty',
          'Processes all microtasks first',
          'Then moves one callback from callback queue',
          'Enables non-blocking asynchronous behavior'
        ]
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
      height: 600,
      backgroundColor: '#ffffff',
      pixelRatio: 'auto'
    },
    interactions: {
      enableDrag: false,
      enableZoom: true,
      enablePan: true,
      zoomMin: 0.5,
      zoomMax: 2.0
    },
    complexity: 'medium',
    nodeCount: 7
  }
} satisfies VisualizationSpec

