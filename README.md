# es-eventdelegate

EventDelegate class to delegate DOM events (with no external dependencies)

## Usage

```js
import { EventDelegate } from 'es-eventdelegate';

// attach event handler
const useCapture = true;
const delegate = new EventDelegate(document.body);

// when any anchor is clicked
delegate.add('click', 'a', eventHandler, useCapture);

// detach handler
delegate.remove('click', 'a');

// detach all
delegate.detach();
```
