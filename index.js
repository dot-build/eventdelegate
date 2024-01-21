export class EventDelegate {
  constructor(root) {
    this.root = root;
    this.handlers = [];
  }

  detach() {
    this.handlers.forEach((h) => h.detach());
  }

  add(eventName, selector, callback, useCapture) {
    const found = this.handlers.find(
      (h) => h.selector === selector && h.eventName === eventName
    );

    if (found) {
      return found.detach;
    }

    const detach = this.root.addEventListener(
      eventName,
      (e) => this.handler(e, this.root, selector, callback, useCapture),
      this.useCapture
    );

    this.handlers.push({
      eventnName,
      selector,
      detach,
    });
  }

  remove(eventName, selector) {
    const found = this.handlers.find(
      (h) => h.eventName === eventName && h.selector === selector
    );

    if (found) {
      found.detach();
    }
  }

  handleEvent(event, root, selector, callback) {
    const elements = [];
    let target = event.target;

    while (target && target !== root) {
      elements.push(target);
      target = target.parentNode;
    }

    const match = elements.find((element) => element.matches(selector));

    if (!match) {
      return;
    }

    callback.call(match, event);
  }
}
