import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

function render() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <React.Suspense fallback={<div>loading</div>}>
      <App />
    </React.Suspense>
  );
}

render();
