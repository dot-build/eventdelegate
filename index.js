if (!window.EventDelegate) {
    /**
     * Global constructor for event delegation
     *
     * @class EventDelegate
     *
     * @example
     *      // attach event handler
     *      var useCapture = true;
     *      var delegate = EventDelegate.addEventListener(document.body, 'click', '.delegate-selector', eventHandler, useCapture);
     *
     *      // detach event handler
     *      delegate.removeEventListener();
     *
     *      // add multitple
     *      var config = {
     *          target: document.body,
     *          event: 'focus',
     *          useCapture: true,
     *          delegate: {
     *              '.delegate-selector', eventHandler,
     *              '.another-selector', eventHandler,
     *          }
     *      };
     *
     *      EventDelegate.addEventListener(config);
     */
    window.EventDelegate = (function () {
        function EventDelegate(root, eventName, selector, callback, useCapture) {
            this.eventName = eventName;
            this.root = root;
            this.selector = selector;
            this.callback = callback;
            this.handler = handleEvent.bind(this);
            this.useCapture = !!useCapture;

            root.addEventListener(eventName, this.handler, this.useCapture);
        }

        EventDelegate.addEventListener = addEventListener;
        EventDelegate.prototype.removeEventListener = removeEventListener;

        function addEventListener(root, eventName, selector, callback, useCapture) {
            if (typeof root === 'object' && arguments.length === 1) {
                return addMultipleEventListeners(root);
            }

            return new EventDelegate(root, eventName, selector, callback, useCapture);
        }

        function addMultipleEventListeners(events) {
            var handlers = events.delegate;
            var selectors = Object.keys(handlers);
            var useCapture = !!events.useCapture;

            var delegateList = selectors.map(function (selector) {
                return EventDelegate.addEventListener(events.target, events.event, selector, handlers[selector], useCapture);
            });

            return {
                removeEventListener: removeAllListeners.bind(null, delegateList)
            };
        }

        function removeAllListeners(delegateList) {
            delegateList.forEach(function (delegate) {
                delegate.removeEventListener();
            });
        }

        function handleEvent(event) {
            var target = event.target;
            var root = this.root;
            var selector = this.selector;
            var elements = [];
            var match;

            while (target && target !== root) {
                elements.push(target);
                target = target.parentNode;
            }

            match = elements.find(function (element) {
                return element.matches(selector);
            });

            if (!match) { return; }

            this.callback.call(match, event);
        }

        function removeEventListener() {
            this.root.removeEventListener(this.eventName, this.handler, this.useCapture);
        }

        return EventDelegate;
    })();
}
