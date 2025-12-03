import type { VisualizationSpec } from '~/types/visualization/spec'

export default {
  id: 'event-loop',
  version: '2.1.0',
  title: 'JavaScript Event Loop',
  description: 'Interactive visualization of the JavaScript event loop and async execution',
  tags: ['javascript', 'event-loop', 'async', 'callbacks', 'promises', 'fundamental'],
  
  scene: {
    layout: {
      type: 'grid',
      config: {
        columns: 3,
        gap: 20,
        columnWidth: 280,
        padding: 30,
        masonry: false, // Use strict grid for predictable positioning
        responsive: {
          mobile: { columns: 1 },
          tablet: { columns: 2 },
          desktop: { columns: 3 }
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
          // === ROW 1: Call Stack (center-top, spans full width conceptually) ===
          {
            id: 'call-stack',
            type: 'stack',
            position: 'auto',
            size: { width: 280, height: 260 },
            style: {
              border: '#22c55e',
              background: '#0f1f0f',
              text: '#4ade80',
              borderWidth: 2
            },
            content: {
              title: '📚 Call Stack',
              description: 'LIFO - Last In, First Out',
              items: [
                { id: 'fn3', label: 'processData()' },
                { id: 'fn2', label: 'fetchUser()' },
                { id: 'fn1', label: 'handleClick()' },
                { id: 'main', label: '(global)' }
              ]
            },
            interactive: true,
            selectable: true,
            data: {
              stepNumber: 1,
              flowDirection: 'receives'
            },
            layout: { column: 1, row: 0 } // Center column, top row
          },
          
          // === ROW 2: Web APIs (left) and Microtask Queue (right) ===
          {
            id: 'web-apis',
            type: 'box',
            position: 'auto',
            size: { width: 280, height: 220 },
            style: {
              border: '#ef4444',
              background: '#1f0f0f',
              text: '#f87171'
            },
            content: {
              title: '🌐 Web APIs',
              description: 'Browser async handlers',
              items: [
                { id: 'timeout', label: '⏱️ setTimeout(cb, 1000)' },
                { id: 'fetch', label: '🔗 fetch("/api/user")' },
                { id: 'dom', label: '👆 addEventListener()' }
              ]
            },
            interactive: true,
            selectable: true,
            data: {
              stepNumber: 2,
              flowDirection: 'processes'
            },
            layout: { column: 0, row: 1 } // Left column, second row
          },
          
          {
            id: 'microtask-queue',
            type: 'queue',
            position: 'auto',
            size: { width: 280, height: 140 },
            style: {
              border: '#ec4899',
              background: '#1f0f1a',
              text: '#f472b6'
            },
            content: {
              title: '⚡ Microtask Queue',
              description: 'HIGH PRIORITY! Runs before callbacks',
              items: [
                { id: 'p1', label: '.then()' },
                { id: 'p2', label: '.then()' }
              ]
            },
            interactive: true,
            selectable: true,
            data: {
              stepNumber: 4,
              flowDirection: 'priority'
            },
            layout: { column: 2, row: 1 } // Right column, second row
          },
          
          // === ROW 3: Callback Queue (left) and Event Loop (right) ===
          {
            id: 'callback-queue',
            type: 'queue',
            position: 'auto',
            size: { width: 280, height: 140 },
            style: {
              border: '#f59e0b',
              background: '#1f1a0f',
              text: '#fbbf24'
            },
            content: {
              title: '📋 Callback Queue',
              description: 'FIFO - Macrotasks wait here',
              items: [
                { id: 'cb1', label: 'onClick' },
                { id: 'cb2', label: 'onTimeout' }
              ]
            },
            interactive: true,
            selectable: true,
            data: {
              stepNumber: 3,
              flowDirection: 'queues'
            },
            layout: { column: 0, row: 2 } // Left column, third row
          },
          
          {
            id: 'event-loop',
            type: 'box',
            position: 'auto',
            size: { width: 280, height: 160 },
            style: {
              border: '#6366f1',
              background: '#0f0f1f',
              text: '#818cf8'
            },
            content: {
              title: '🔁 EVENT LOOP',
              description: 'Checks stack → Runs microtasks → Runs ONE callback'
            },
            interactive: true,
            selectable: true,
            data: {
              stepNumber: 5,
              svg: `<svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="100" cy="40" rx="80" ry="30" stroke="#818cf8" stroke-width="3" fill="none" stroke-dasharray="8 4"/>
                <polygon points="170,28 180,40 170,52" fill="#818cf8"/>
                <text x="100" y="45" text-anchor="middle" fill="#818cf8" font-size="16" font-family="monospace">∞ loop</text>
              </svg>`
            },
            layout: { column: 2, row: 2 } // Right column, third row
          }
        ],
        
        edges: [
          // FLOW 1: Call Stack → Web APIs (async call goes down-left)
          {
            id: 'edge-stack-to-webapi',
            from: 'call-stack',
            to: 'web-apis',
            type: 'arrow',
            style: { color: '#ef4444', width: 2 },
            animated: true,
            label: '① Async call'
          },
          
          // FLOW 2: Web APIs → Callback Queue (continues down on left side)
          {
            id: 'edge-webapi-to-callback',
            from: 'web-apis',
            to: 'callback-queue',
            type: 'arrow',
            style: { color: '#f59e0b', width: 2 },
            animated: true,
            label: '② Timer done'
          },
          
          // FLOW 3: Callback Queue → Event Loop (moves right at bottom)
          {
            id: 'edge-callback-to-eventloop',
            from: 'callback-queue',
            to: 'event-loop',
            type: 'arrow',
            style: { color: '#6366f1', width: 2 },
            animated: true,
            label: '③ Waits for turn'
          },
          
          // FLOW 4: Event Loop → Microtask Queue (checks priority queue)
          {
            id: 'edge-eventloop-to-microtask',
            from: 'event-loop',
            to: 'microtask-queue',
            type: 'arrow',
            style: { color: '#ec4899', width: 2 },
            animated: true,
            label: '④ Check priority'
          },
          
          // FLOW 5: Microtask Queue → Call Stack (high priority goes up)
          {
            id: 'edge-microtask-to-stack',
            from: 'microtask-queue',
            to: 'call-stack',
            type: 'arrow',
            style: { color: '#22c55e', width: 3 },
            animated: true,
            label: '⑤ Execute!'
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
      title: '🎯 Understanding the Event Loop',
      content: 'The event loop is JavaScript\'s secret to handling async operations despite being single-threaded. It\'s the mechanism that makes non-blocking I/O possible, allowing your app to stay responsive while waiting for data.',
      details: [
        '💡 JavaScript is single-threaded but NON-BLOCKING thanks to the event loop',
        '📚 The Call Stack executes code synchronously, one function at a time',
        '🌐 Web APIs handle async work (timers, HTTP, events) in separate threads',
        '📋 Task Queues hold callbacks waiting to be executed',
        '⚡ Microtasks (Promises) ALWAYS run before Macrotasks (setTimeout)',
        '🔁 Event Loop: Check stack → Run microtasks → Run ONE macrotask → Repeat'
      ],
      codeExample: `// The classic interview question:
console.log('1: Start');         // → Runs immediately

setTimeout(() => {
  console.log('2: Timeout');     // → Callback Queue (last!)
}, 0);

Promise.resolve().then(() => {
  console.log('3: Promise');     // → Microtask Queue (runs before timeout!)
});

console.log('4: End');           // → Runs immediately

// Output order: 1, 4, 3, 2
// Why? Microtasks beat setTimeout, even with 0ms delay!`,
      keyPoints: [
        'setTimeout(fn, 0) does NOT mean "run immediately"',
        'Promise callbacks always run before setTimeout callbacks',
        'A long-running function blocks the entire event loop',
        'The browser can\'t render while JavaScript is executing'
      ],
      commonMistakes: [
        'Assuming setTimeout(fn, 0) runs synchronously',
        'Forgetting that Promise.then() is asynchronous',
        'Creating infinite loops with recursive microtasks',
        'Blocking the main thread with heavy computation'
      ]
    },
    
    nodes: {
      'call-stack': {
        title: '📚 The Call Stack',
        content: 'The call stack is JavaScript\'s execution manager - a LIFO (Last In, First Out) data structure that tracks where the program is in its execution. When you call a function, it\'s pushed onto the stack. When the function returns, it\'s popped off.',
        details: [
          '➡️ Function called → Pushed onto stack',
          '⬅️ Function returns → Popped from stack',
          '⚠️ Only ONE function executes at a time (single-threaded)',
          '💥 Stack Overflow = Too many nested calls',
          '🔒 While stack is busy, nothing else can run'
        ],
        codeExample: `function greet(name) {
  return 'Hello, ' + name; // Popped after return
}

function processUser(user) {
  const message = greet(user.name);
  console.log(message);    // Popped after completion
}

processUser({ name: 'Alice' });

/* Stack visualization:
   Step 1: [processUser]
   Step 2: [greet, processUser]
   Step 3: [processUser]      // greet returned
   Step 4: [console.log, processUser]
   Step 5: [processUser]      // console.log done
   Step 6: []                 // all done!
*/`,
        keyPoints: [
          'Each function call creates a new "stack frame"',
          'Local variables live in the stack frame',
          'Recursion without base case = Stack Overflow'
        ],
        tryThis: 'Try calling a function that calls itself infinitely. You\'ll see "Maximum call stack size exceeded"!'
      },
      
      'web-apis': {
        title: '🌐 Web APIs',
        content: 'Web APIs are browser-provided interfaces that handle operations that would otherwise block JavaScript. They run in separate threads, allowing your code to continue executing while waiting for results.',
        details: [
          '⏱️ Timers: setTimeout, setInterval, requestAnimationFrame',
          '🌍 Network: fetch, XMLHttpRequest, WebSocket',
          '👆 Events: click, scroll, resize, keyboard events',
          '💾 Storage: localStorage, IndexedDB, Cache API',
          '🧵 Workers: Web Workers for CPU-intensive tasks',
          '🖼️ DOM: Document manipulation, animations'
        ],
        codeExample: `// When you call setTimeout:
console.log('Before setTimeout');

setTimeout(() => {
  console.log('Inside callback');
}, 2000);

console.log('After setTimeout');

/* What happens:
   1. "Before setTimeout" → Call Stack runs immediately
   2. setTimeout() → Registers timer in Web APIs, returns immediately
   3. "After setTimeout" → Call Stack continues (doesn't wait!)
   4. ...2 seconds pass in Web API land...
   5. Callback moves to Callback Queue
   6. Event Loop moves callback to Stack
   7. "Inside callback" → Finally runs!
*/`,
        keyPoints: [
          'Web APIs run in browser threads, not JavaScript',
          'setTimeout only SCHEDULES a callback, doesn\'t execute it',
          'The delay is a MINIMUM wait time, not exact',
          'fetch returns immediately with a Promise'
        ],
        tryThis: 'Open DevTools → Network tab and watch how fetch requests happen asynchronously!'
      },
      
      'callback-queue': {
        title: '📋 Callback Queue (Macrotask Queue)',
        content: 'The Callback Queue (also called Task Queue or Macrotask Queue) holds callbacks from completed async operations. The event loop moves ONE callback at a time to the call stack when it\'s empty.',
        details: [
          '📥 Receives callbacks when async operations complete',
          '📤 Event loop takes ONE callback per iteration',
          '⏳ FIFO: First In, First Out ordering',
          '🐢 Lower priority than Microtask Queue',
          '⏱️ Includes: setTimeout, setInterval, I/O, UI rendering'
        ],
        codeExample: `// Multiple callbacks queue up
setTimeout(() => console.log('A'), 0);
setTimeout(() => console.log('B'), 0);
setTimeout(() => console.log('C'), 0);

// All three register in Web APIs immediately
// When timers fire, callbacks queue in order:
// Queue: [A callback, B callback, C callback]

// Event loop processes ONE per iteration:
// Iteration 1: Run A → "A"
// Iteration 2: Run B → "B"
// Iteration 3: Run C → "C"

// Output: A, B, C (in order, but not instantaneous)`,
        keyPoints: [
          'Each iteration processes only ONE macrotask',
          'Between macrotasks, browser can render',
          'That\'s why 0ms setTimeout is useful for yielding',
          'Multiple callbacks run in FIFO order'
        ],
        tryThis: 'Use setTimeout(fn, 0) to defer work and see how it affects UI responsiveness!'
      },
      
      'microtask-queue': {
        title: '⚡ Microtask Queue',
        content: 'The Microtask Queue has HIGHER PRIORITY than the Callback Queue. ALL microtasks run before the next macrotask. This is crucial for Promises and explains why Promise.then() runs before setTimeout.',
        details: [
          '⚡ Higher priority than Callback Queue (macrotasks)',
          '🔄 ALL microtasks run before next macrotask',
          '📦 Promise.then(), catch(), finally() callbacks',
          '🔧 queueMicrotask() for explicit microtasks',
          '👀 MutationObserver callbacks',
          '⚠️ Can cause starvation if microtasks add more microtasks!'
        ],
        codeExample: `// Why does Promise beat setTimeout?
setTimeout(() => console.log('timeout'), 0);

Promise.resolve()
  .then(() => console.log('promise 1'))
  .then(() => console.log('promise 2'));

console.log('sync');

/* Execution order:
   1. setTimeout → registers callback in Web APIs
   2. Promise.resolve() → immediately resolved
   3. .then() → callback goes to MICROTASK queue
   4. console.log('sync') → runs immediately
   5. Stack empty! Check microtasks FIRST
   6. 'promise 1' → runs, returns, queues next .then()
   7. 'promise 2' → runs (still processing microtasks)
   8. Microtask queue empty, NOW check callback queue
   9. 'timeout' → finally runs

   Output: sync, promise 1, promise 2, timeout
*/`,
        keyPoints: [
          'Microtasks drain completely before macrotasks',
          'A microtask can add more microtasks (careful!)',
          'This is why async/await feels "immediate"',
          'Promise rejections also go to microtask queue'
        ],
        tryThis: 'Create a microtask that adds another microtask in a loop. Watch it block everything!'
      },
      
      'event-loop': {
        title: '🔁 The Event Loop',
        content: 'The Event Loop is the orchestrator that makes async JavaScript possible. It continuously checks if the call stack is empty, then processes microtasks, then ONE macrotask, then potentially renders the UI.',
        details: [
          '1️⃣ Execute all synchronous code (call stack)',
          '2️⃣ When stack empty, run ALL microtasks',
          '3️⃣ Run ONE macrotask (callback queue)',
          '4️⃣ Render UI updates (if needed, ~16ms)',
          '5️⃣ Repeat forever ♾️',
          '⚠️ Long tasks block the entire loop!'
        ],
        codeExample: `// The Event Loop in pseudocode
while (true) {
  // Phase 1: Run until stack is empty
  while (callStack.hasFrames()) {
    callStack.executeTop();
  }
  
  // Phase 2: Process ALL microtasks
  while (microtaskQueue.hasTasks()) {
    const task = microtaskQueue.dequeue();
    callStack.push(task);
    // Execute task...
    // (might add more microtasks!)
  }
  
  // Phase 3: Process ONE macrotask
  if (callbackQueue.hasTasks()) {
    const task = callbackQueue.dequeue();
    callStack.push(task);
    // Execute task...
  }
  
  // Phase 4: Let browser render (if needed)
  if (shouldRender()) {
    renderUI();
  }
  
  // Repeat!
}`,
        keyPoints: [
          'The loop never stops (until you close the tab)',
          'requestAnimationFrame runs before render',
          'Long tasks > 50ms cause visible jank',
          'Use chunks + setTimeout(0) for heavy work'
        ],
        tryThis: 'Add a while(true){} loop and watch your page freeze. That\'s a blocked event loop!'
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
      'h': 'showHelp',
      '1': 'selectCallStack',
      '2': 'selectWebApis',
      '3': 'selectCallbackQueue',
      '4': 'selectMicrotaskQueue',
      '5': 'selectEventLoop'
    }
  },
  
  rendering: {
    canvas: {
      width: 'auto',
      height: 750,
      backgroundColor: '#0a0a0a',
      pixelRatio: 'auto'
    },
    complexity: 'medium',
    nodeCount: 5
  }
} satisfies VisualizationSpec
