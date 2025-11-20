import type { CodeExample } from '~/types/visualization'

export const eventLoopExamples: CodeExample[] = [
  // Example 1: Simple setTimeout
  {
    id: 'example-1-settimeout',
    title: 'Basic setTimeout',
    description: 'Understanding how setTimeout works with the event loop',
    language: 'javascript',
    code: `console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('End');`,
    
    globalExplanation: `This example demonstrates the fundamental behavior of the event loop with setTimeout. Even though setTimeout is set to 0ms, it doesn't execute immediately. Instead, it gets sent to the Web APIs, and its callback is placed in the callback queue. The event loop only moves callbacks from the queue to the call stack when the stack is empty. This is why "End" logs before "Timeout".`,
    
    componentExplanations: [
      {
        component: 'call-stack',
        title: 'Call Stack',
        description: 'The call stack is where JavaScript executes code. Functions are pushed onto the stack when called and popped off when they return. JavaScript can only execute one thing at a time - when the stack is not empty, the event loop waits.'
      },
      {
        component: 'web-apis',
        title: 'Web APIs',
        description: 'Web APIs like setTimeout, fetch, and DOM events are provided by the browser (or Node.js). When you call setTimeout, the timer runs here outside of JavaScript\'s single thread, allowing other code to continue executing.'
      },
      {
        component: 'callback-queue',
        title: 'Callback Queue (Task Queue)',
        description: 'When a Web API completes (like a setTimeout timer finishing), its callback is placed in the callback queue. The event loop checks this queue and moves callbacks to the call stack when the stack is empty.'
      },
      {
        component: 'microtask-queue',
        title: 'Microtask Queue',
        description: 'The microtask queue handles Promise callbacks and other microtasks. It has higher priority than the callback queue - all microtasks are executed before any callback queue tasks.'
      },
      {
        component: 'event-loop',
        title: 'Event Loop',
        description: 'The event loop continuously checks if the call stack is empty. If it is, it first processes all microtasks, then takes the first callback from the callback queue and pushes it to the call stack.'
      }
    ],
    
    steps: [
      {
        lineNumber: 1,
        explanation: 'The script starts executing. The global execution context is added to the call stack.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'global', name: 'Global', type: 'global', color: '#3b82f6' }
          }
        ]
      },
      {
        lineNumber: 1,
        explanation: 'console.log("Start") is called and added to the call stack.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-start', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 1,
        explanation: '"Start" is logged to the console. console.log completes and is removed from the stack.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-start'
          }
        ]
      },
      {
        lineNumber: 3,
        explanation: 'setTimeout is called. The timer is handed off to the Web APIs.',
        duration: 1,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'settimeout', name: 'setTimeout', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 3,
        explanation: 'The timer is now running in Web APIs. setTimeout returns immediately and is removed from the stack.',
        duration: 1,
        actions: [
          {
            type: 'add-to-web-apis',
            data: { id: 'timer-1', name: 'Timer (0ms)', type: 'setTimeout', duration: 0, color: '#ec4899' }
          },
          {
            type: 'remove-from-stack',
            itemId: 'settimeout'
          }
        ]
      },
      {
        lineNumber: 7,
        explanation: 'console.log("End") is called and added to the call stack.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-end', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 7,
        explanation: '"End" is logged to the console. console.log completes and is removed from the stack.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-end'
          }
        ]
      },
      {
        lineNumber: 7,
        explanation: 'The global execution context completes. The call stack is now empty.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'global'
          }
        ]
      },
      {
        lineNumber: 3,
        explanation: 'The timer in Web APIs completes. Its callback is moved to the callback queue.',
        duration: 1.2,
        actions: [
          {
            type: 'remove-from-web-apis',
            itemId: 'timer-1'
          },
          {
            type: 'add-to-callback-queue',
            data: { id: 'callback-1', name: 'setTimeout callback', callback: '() => {...}', color: '#f59e0b' }
          },
          {
            type: 'event-loop-check'
          }
        ]
      },
      {
        lineNumber: 4,
        explanation: 'The event loop sees the call stack is empty. It moves the callback from the queue to the stack.',
        duration: 1,
        actions: [
          {
            type: 'remove-from-callback-queue',
            itemId: 'callback-1'
          },
          {
            type: 'add-to-stack',
            data: { id: 'timeout-callback', name: 'setTimeout callback', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 4,
        explanation: 'console.log("Timeout") is called inside the callback.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-timeout', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 4,
        explanation: '"Timeout" is logged to the console. console.log completes.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-timeout'
          }
        ]
      },
      {
        lineNumber: 5,
        explanation: 'The callback completes and is removed from the stack. Execution is finished!',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'timeout-callback'
          }
        ]
      }
    ]
  },

  // Example 2: Promises
  {
    id: 'example-2-promises',
    title: 'Promises & Microtasks',
    description: 'How Promises use the microtask queue',
    language: 'javascript',
    code: `console.log('Start');

Promise.resolve()
  .then(() => {
    console.log('Promise');
  });

console.log('End');`,
    
    globalExplanation: `This example shows how Promises work with the microtask queue. When a Promise resolves, its .then() callback is placed in the microtask queue, not the callback queue. Microtasks have higher priority and are executed immediately after the current script finishes, but before any callbacks from the callback queue. This is why "Promise" logs after "End" but would log before any setTimeout callbacks.`,
    
    componentExplanations: [
      {
        component: 'call-stack',
        title: 'Call Stack',
        description: 'The call stack is where JavaScript executes code. Functions are pushed onto the stack when called and popped off when they return.'
      },
      {
        component: 'web-apis',
        title: 'Web APIs',
        description: 'Web APIs handle asynchronous operations. Promises are managed here, though they resolve immediately in this example.'
      },
      {
        component: 'callback-queue',
        title: 'Callback Queue (Task Queue)',
        description: 'The callback queue holds callbacks from setTimeout, setInterval, and other macro tasks. In this example, it remains empty.'
      },
      {
        component: 'microtask-queue',
        title: 'Microtask Queue',
        description: 'The microtask queue has HIGHER PRIORITY than the callback queue. Promise callbacks (.then, .catch, .finally) and async/await continuations go here. All microtasks are executed before checking the callback queue.'
      },
      {
        component: 'event-loop',
        title: 'Event Loop',
        description: 'After each task, the event loop processes ALL microtasks before moving to the next callback queue task. This is why Promise callbacks execute quickly.'
      }
    ],
    
    steps: [
      {
        lineNumber: 1,
        explanation: 'Script execution begins. Global context is added to the call stack.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'global', name: 'Global', type: 'global', color: '#3b82f6' }
          }
        ]
      },
      {
        lineNumber: 1,
        explanation: 'console.log("Start") executes.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-start', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 1,
        explanation: '"Start" is logged. console.log completes.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-start'
          }
        ]
      },
      {
        lineNumber: 3,
        explanation: 'Promise.resolve() creates an already-resolved Promise.',
        duration: 1,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'promise-resolve', name: 'Promise.resolve', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 4,
        explanation: 'The .then() callback is registered. Since the Promise is already resolved, the callback is immediately queued in the microtask queue.',
        duration: 1.2,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'promise-resolve'
          },
          {
            type: 'add-to-microtask-queue',
            data: { id: 'promise-then', name: 'Promise.then', callback: '() => {...}', color: '#10b981' }
          }
        ]
      },
      {
        lineNumber: 8,
        explanation: 'console.log("End") executes.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-end', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 8,
        explanation: '"End" is logged. console.log completes.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-end'
          }
        ]
      },
      {
        lineNumber: 8,
        explanation: 'Global context completes. The call stack is empty.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'global'
          }
        ]
      },
      {
        lineNumber: 4,
        explanation: 'The event loop checks the microtask queue FIRST. It moves the Promise callback to the call stack.',
        duration: 1.2,
        actions: [
          {
            type: 'event-loop-check'
          },
          {
            type: 'remove-from-microtask-queue',
            itemId: 'promise-then'
          },
          {
            type: 'add-to-stack',
            data: { id: 'then-callback', name: 'Promise callback', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 5,
        explanation: 'console.log("Promise") executes inside the callback.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-promise', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 5,
        explanation: '"Promise" is logged. console.log completes.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-promise'
          }
        ]
      },
      {
        lineNumber: 6,
        explanation: 'The Promise callback completes. Execution is finished!',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'then-callback'
          }
        ]
      }
    ]
  },

  // Example 3: Mixed - setTimeout + Promise
  {
    id: 'example-3-mixed',
    title: 'setTimeout + Promise (Mixed)',
    description: 'Understanding the priority: microtasks before macrotasks',
    language: 'javascript',
    code: `console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise');
  });

console.log('End');`,
    
    globalExplanation: `This example combines setTimeout (callback queue) and Promise (microtask queue) to demonstrate their priority difference. The output will be: "Start", "End", "Promise", "Timeout". Even though setTimeout is called first, the Promise callback executes before it because the microtask queue is always fully processed before taking any task from the callback queue. This is a crucial concept for understanding JavaScript's execution model.`,
    
    componentExplanations: [
      {
        component: 'call-stack',
        title: 'Call Stack',
        description: 'The call stack executes synchronous code one function at a time. It must be empty before the event loop processes any queued tasks.'
      },
      {
        component: 'web-apis',
        title: 'Web APIs',
        description: 'Asynchronous operations like setTimeout and Promise resolution are handled here, outside JavaScript\'s single thread.'
      },
      {
        component: 'callback-queue',
        title: 'Callback Queue (Macrotask Queue)',
        description: 'setTimeout and setInterval callbacks wait here. The event loop only processes one callback queue task at a time, after all microtasks are done.'
      },
      {
        component: 'microtask-queue',
        title: 'Microtask Queue',
        description: 'Promise callbacks have HIGHER PRIORITY. After the call stack empties, ALL microtasks execute before ANY callback queue task. This is why "Promise" logs before "Timeout".'
      },
      {
        component: 'event-loop',
        title: 'Event Loop',
        description: 'The event loop orchestrates execution: 1) Run synchronous code, 2) Process ALL microtasks, 3) Process ONE callback queue task, 4) Repeat. This priority system is key to understanding async JavaScript.'
      }
    ],
    
    steps: [
      {
        lineNumber: 1,
        explanation: 'Script starts. Global execution context is created.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'global', name: 'Global', type: 'global', color: '#3b82f6' }
          }
        ]
      },
      {
        lineNumber: 1,
        explanation: 'console.log("Start") is called.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-start', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 1,
        explanation: '"Start" is logged.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-start'
          }
        ]
      },
      {
        lineNumber: 3,
        explanation: 'setTimeout is called. The timer starts in Web APIs.',
        duration: 1,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'settimeout', name: 'setTimeout', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 3,
        explanation: 'Timer is running. setTimeout returns and is removed from stack.',
        duration: 1,
        actions: [
          {
            type: 'add-to-web-apis',
            data: { id: 'timer-1', name: 'Timer (0ms)', type: 'setTimeout', duration: 0, color: '#ec4899' }
          },
          {
            type: 'remove-from-stack',
            itemId: 'settimeout'
          }
        ]
      },
      {
        lineNumber: 7,
        explanation: 'Promise.resolve() creates a resolved Promise.',
        duration: 1,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'promise-resolve', name: 'Promise.resolve', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 8,
        explanation: 'The .then() callback is queued in the microtask queue.',
        duration: 1,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'promise-resolve'
          },
          {
            type: 'add-to-microtask-queue',
            data: { id: 'promise-then', name: 'Promise.then', callback: '() => {...}', color: '#10b981' }
          }
        ]
      },
      {
        lineNumber: 12,
        explanation: 'console.log("End") is called.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-end', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 12,
        explanation: '"End" is logged.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-end'
          }
        ]
      },
      {
        lineNumber: 12,
        explanation: 'Global context completes. Call stack is empty.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'global'
          }
        ]
      },
      {
        lineNumber: 3,
        explanation: 'The timer completes. Its callback moves to the CALLBACK QUEUE.',
        duration: 1,
        actions: [
          {
            type: 'remove-from-web-apis',
            itemId: 'timer-1'
          },
          {
            type: 'add-to-callback-queue',
            data: { id: 'callback-1', name: 'setTimeout callback', callback: '() => {...}', color: '#f59e0b' }
          }
        ]
      },
      {
        lineNumber: 8,
        explanation: 'Event loop checks: MICROTASKS FIRST! The Promise callback has priority over setTimeout.',
        duration: 1.2,
        actions: [
          {
            type: 'event-loop-check'
          },
          {
            type: 'remove-from-microtask-queue',
            itemId: 'promise-then'
          },
          {
            type: 'add-to-stack',
            data: { id: 'then-callback', name: 'Promise callback', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 9,
        explanation: 'console.log("Promise") executes.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-promise', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 9,
        explanation: '"Promise" is logged.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-promise'
          }
        ]
      },
      {
        lineNumber: 10,
        explanation: 'Promise callback completes.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'then-callback'
          }
        ]
      },
      {
        lineNumber: 3,
        explanation: 'Now the event loop processes the callback queue. setTimeout callback moves to stack.',
        duration: 1.2,
        actions: [
          {
            type: 'event-loop-check'
          },
          {
            type: 'remove-from-callback-queue',
            itemId: 'callback-1'
          },
          {
            type: 'add-to-stack',
            data: { id: 'timeout-callback', name: 'setTimeout callback', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 4,
        explanation: 'console.log("Timeout") executes.',
        duration: 0.8,
        actions: [
          {
            type: 'add-to-stack',
            data: { id: 'log-timeout', name: 'console.log', type: 'function', color: '#8b5cf6' }
          }
        ]
      },
      {
        lineNumber: 4,
        explanation: '"Timeout" is logged.',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'log-timeout'
          }
        ]
      },
      {
        lineNumber: 5,
        explanation: 'setTimeout callback completes. All done!',
        duration: 0.8,
        actions: [
          {
            type: 'remove-from-stack',
            itemId: 'timeout-callback'
          }
        ]
      }
    ]
  }
]

