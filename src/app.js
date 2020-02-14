// Import your web-ready dependencies
import css from "https://unpkg.com/csz";

import * as Preact from "preact";

// Create your main app component
function SomePreactComponent() {
  return <h1 className="text-grey-700">Hello, World! This is fast</h1>;
}

// Inject your application into the an element with the id `app`.
Preact.render(<SomePreactComponent />, document.getElementById("app"));
