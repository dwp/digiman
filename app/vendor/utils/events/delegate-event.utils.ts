import { DelegateEventOptions } from "../../interfaces/delegate-event-options.interface";

/**
 * Attaches an event handler to a container which is called when the user triggers the event
 * on an element within the container that matches the specified selector.
 * @param container Container to which the listener will be attached
 * @param eventName Event name
 * @param selector Selector for elements within the Container that will call the event handler
 * @param fn Event handler function
 * @param options additional options
 *
 * The event object will have two additional properties:
 *   delegateTarget - container element
 *   subjectTarget - the element matching the specified selector
 *
 * Example:
 *   <ul>
 *     <li><a></a></li>
 *   </ul>
 *
 * utils.delegateEvent(document.querySelector('ul'), 'click', 'li', (e) => {});
 *
 * If the user clicks on the anchor element, the following targets will be available on the event object:
 *   delegateTarget: <ul>
 *   subjectTarget: <li>
 *   target: <a> (native)
 *
 */
export default function delegateEvent(container : Element, eventName : string, selector : string, fn : Function, options? : DelegateEventOptions) {
  const useCapture = (options && options.useCapture) || false;

  container.addEventListener(eventName, (e: DelegateEvent) => {
    let target = e.target as HTMLInputElement;

    while (target) {
      if (target === container) {
        return;
      }

      if (selector && target.matches(selector)) {
        e.delegateTarget = container;
        e.subjectTarget = target;

        fn(e);

        return;
      }

      target = target.parentNode as HTMLInputElement;
    }
  }, useCapture);
}