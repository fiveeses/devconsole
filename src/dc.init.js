import makeDevConsoleElements from "./dc.init.elements.js";
import createTabs from "./dc.init.tabs.js";
import initializeTextInput from "./dc.init.text-input.js";
import initializeCore from "./dc.init.core.js";

/**
 * Initialize a devconsole and append it to the given HTMLElement, if specified.
 * @param {HtmlElement} forElement (Optional) The target into which the devconsole will be inserted. No insert if not an HTMLElement.
 * @param {string} className (Optional) A starting class mame or string of names to apply to the newly created devconsole.
 * @param {true|undefined} notPromise (Optional) When exactly true, indicates that the dev console should be directly returned, not promisified.
 * @returns {Promise<HTMLElement>|HTMLElment} Returns the newly created devconsole, either in a resolved Promise (default), or directly if notPromise is specified as true.
 */
export default function init(forElement, className, notPromise) {

   // communications between logically grouped functionalities
   const envelope = {};

   // make the console markup
   const dc = makeDevConsoleElements(envelope, className);

   if (forElement instanceof HTMLElement) {
      forElement.appendChild(dc);
   }

   // add the tab logic
   createTabs(envelope);

   // add the textInput logic
   initializeTextInput(envelope);

   // add the dc logic
   initializeCore(envelope);

   return (notPromise === true) ?
      dc :
      Promise.resolve(dc);
};

// eof