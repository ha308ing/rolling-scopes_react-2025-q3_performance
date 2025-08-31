import { Suspense } from "react";
import Countries from "@/Countries";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Countries />
    </Suspense>
  );
}

export default App;
