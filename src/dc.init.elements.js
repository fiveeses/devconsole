import { makeElement } from "./utility.js";

/**
 * Make and return the DOM tree, with optional starting class name, and quick reference to tabSlot, tabSwitcher, and textInput.
 * @param {object} envelope Object passed between instantiation logic, to allow communication between logically grouped items.
 * @param {string|undefined} className (Optional) The class to apply to the outer element.
 * @returns {HTMLElement} Returns the outer-most element of the DOM tree.
 */
export default function makeDevConsoleElements(envelope, className) {
   // Make the elements
   const outer = makeElement("div", {
      class: `hidden devconsole outer${!className?"":` ${className}`}`
   });
      const inner = makeElement("section", {
         class: "inner"
      });
         const tabSlot = makeElement("section", {
            class: "tab-slot"
         });
            const tabSwitcher = makeElement("article", {
               class: "hidden tab-switcher"
            });
         const footer = makeElement("section", {
            class: "footer dbt"
         },{ 
            innerText: ">"
         }, {  });
            const inputSlot = makeElement("article", {
               class: "input-slot",
            });
               const textInput = makeElement("input", {
                  class: "",
                  type: "text"
               });

   // Someone set us up the DOM.
   outer.appendChild(inner);
   inner.append(tabSlot, footer);
   tabSlot.appendChild(tabSwitcher);
   footer.appendChild(inputSlot);
   inputSlot.appendChild(textInput);

   // make a text area click result in focusing the text input, if click isn't already caught and stopped on bubble
   function defaultTabSlotClickHandler() { textInput.focus(); }
   tabSlot.removeDefaultClickHandler = function() { return tabSlot.removeEventListener("click", defaultTabSlotClickHandler); };
   tabSlot.restoreDefaultClickHandler = function() {
      tabSlot.removeDefaultClickHandler(); 
      return tabSlot.addEventListener("click", defaultTabSlotClickHandler);
   };
   tabSlot.restoreDefaultClickHandler();
   outer.focus = defaultTabSlotClickHandler;

   // Quick API
   envelope.outer = outer;
   envelope.tabSlot = tabSlot;
   envelope.tabSwitcher = tabSwitcher;
   envelope.textInput = textInput;

   // fin
   return outer;
};

// eof