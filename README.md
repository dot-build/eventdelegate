# es-eventdelegate

EventDelegate class to delegate DOM events.

This is the same as the old school `jQuery.delegate` function, if you are _that_ old, but in a modern ES class way.

## Usage

```js
import { EventDelegate } from 'es-eventdelegate';

// attach event handler
const useCapture = true;
const delegate = new EventDelegate(document.body);

// when any link is clicked
delegate.add('click', 'a', eventHandler, useCapture);

// detach a single handler
delegate.remove('click', 'a');

// detach all events
delegate.detach();
```
