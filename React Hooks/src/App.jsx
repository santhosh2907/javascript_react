import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import UseStateAdvanced from './examples/UseStateAdvanced';

import UseEffectAdvanced from './examples/UseEffectAdvanced';
import UseContextAdvanced from './examples/UseContextAdvanced';
import UseRefAdvanced from './examples/UseRefAdvanced';
import UseMemoAdvanced from './examples/UseMemoAdvanced';
import UseCallbackAdvanced from './examples/UseCallbackAdvanced';
import UseReducerAdvanced from './examples/UseReducerAdvanced';
import UseImperativeHandleAdvanced from './examples/UseImperativeHandleAdvanced';
import UseLayoutEffectAdvanced from './examples/UseLayoutEffectAdvanced';
import UseDebugValueAdvanced from './examples/UseDebugValueAdvanced';
import UseTransitionAdvanced from './examples/UseTransitionAdvanced';
import UseDeferredValueAdvanced from './examples/UseDeferredValueAdvanced';
import UseIdAdvanced from './examples/UseIdAdvanced';
import UseSyncExternalStoreAdvanced from './examples/UseSyncExternalStoreAdvanced';
import UseInsertionEffectAdvanced from './examples/UseInsertionEffectAdvanced';

import UseStateSimple from './examples/simple/UseStateSimple';
import UseRefSimple from './examples/simple/UseRefSimple';
import UseEffectSimple from './examples/simple/UseEffectSimple';
import UseContextSimple from './examples/simple/UseContextSimple';
import UseMemoSimple from './examples/simple/UseMemoSimple';
import UseCallbackSimple from './examples/simple/UseCallbackSimple';
import UseReducerSimple from './examples/simple/UseReducerSimple';
import UseImperativeHandleSimple from './examples/simple/UseImperativeHandleSimple';
import UseLayoutEffectSimple from './examples/simple/UseLayoutEffectSimple';
import UseDebugValueSimple from './examples/simple/UseDebugValueSimple';
import UseTransitionSimple from './examples/simple/UseTransitionSimple';
import UseDeferredValueSimple from './examples/simple/UseDeferredValueSimple';
import UseIdSimple from './examples/simple/UseIdSimple';
import UseSyncExternalStoreSimple from './examples/simple/UseSyncExternalStoreSimple';
import UseInsertionEffectSimple from './examples/simple/UseInsertionEffectSimple';

// Placeholders for now - we will create these files as we proceed
const Placeholder = ({ title }) => (
  <div className="p-8 text-center text-gray-500">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p>Advanced implementation coming soon.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          {/* Basic Hooks */}
          <Route path="use-state" element={<UseStateAdvanced />} />
          <Route path="use-effect" element={<UseEffectAdvanced />} />
          <Route path="use-context" element={<UseContextAdvanced />} />

          {/* Ref & Memoization */}
          <Route path="use-ref" element={<UseRefAdvanced />} />
          <Route path="use-memo" element={<UseMemoAdvanced />} />
          <Route path="use-callback" element={<UseCallbackAdvanced />} />

          {/* Advanced State */}
          <Route path="use-reducer" element={<UseReducerAdvanced />} />
          <Route path="use-imperative-handle" element={<UseImperativeHandleAdvanced />} />
          <Route path="use-layout-effect" element={<UseLayoutEffectAdvanced />} />
          <Route path="use-debug-value" element={<UseDebugValueAdvanced />} />

          {/* Concurrent & Others */}
          <Route path="use-transition" element={<UseTransitionAdvanced />} />
          <Route path="use-deferred-value" element={<UseDeferredValueAdvanced />} />
          <Route path="use-id" element={<UseIdAdvanced />} />
          <Route path="use-sync-external-store" element={<UseSyncExternalStoreAdvanced />} />
          <Route path="use-insertion-effect" element={<UseInsertionEffectAdvanced />} />

          {/* Simple Examples */}
          <Route path="simple/use-state" element={<UseStateSimple />} />
          <Route path="simple/use-ref" element={<UseRefSimple />} />
          <Route path="simple/use-effect" element={<UseEffectSimple />} />
          <Route path="simple/use-context" element={<UseContextSimple />} />
          <Route path="simple/use-memo" element={<UseMemoSimple />} />
          <Route path="simple/use-callback" element={<UseCallbackSimple />} />
          <Route path="simple/use-reducer" element={<UseReducerSimple />} />
          <Route path="simple/use-imperative-handle" element={<UseImperativeHandleSimple />} />
          <Route path="simple/use-layout-effect" element={<UseLayoutEffectSimple />} />
          <Route path="simple/use-debug-value" element={<UseDebugValueSimple />} />
          <Route path="simple/use-transition" element={<UseTransitionSimple />} />
          <Route path="simple/use-deferred-value" element={<UseDeferredValueSimple />} />
          <Route path="simple/use-id" element={<UseIdSimple />} />
          <Route path="simple/use-sync-external-store" element={<UseSyncExternalStoreSimple />} />
          <Route path="simple/use-insertion-effect" element={<UseInsertionEffectSimple />} />

          <Route path="*" element={<div className="p-10 text-center text-red-400">404 - Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
