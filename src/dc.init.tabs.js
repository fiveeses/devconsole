import {
   DURATION_TOGGLED_FOCUS,
   TILDE,
   BACKTICK
} from "./constants.js";
import {
   clog,
   toggle, show, hide,
   makeElement,
   stopEvent,
   fitRange
} from "./utility.js";
import Processor from "./dc.Processor.js";
import CommandTable from "./dc.processor.CommandTable.js";

export default function createTabs(envelope) {

   const NO_TABS = "There were no tabs.";
   const { outer, tabSwitcher, tabSlot, textInput } = envelope;
   const tabs = [];
   tabs.active = -1;
   tabs.focused = -1;

   /**
    * Move the focus of the buttons within the tabSwitcher.
    * @param {number|undefined} direction (Optional) Number indicating the movement direction of the focus. 0 for setting to active tab index, negative for left/up, positive for right/down. Defaults to 0.
    * @returns {undefined} Does not return a value.
    */
   function cycleTabSwitcherFocus(direction) {
      const current = tabs.active;
      let index = tabs.focused = (typeof tabs.focused !== "number") ||
                                 (tabs.focused < 0) ?
                                    current :
                                    tabs.focused;

      if (!direction || (typeof direction !== "number")) {
         index = current;
      } else {
         index += ((direction > 0) ? 1 : -1);
      }

      tabs.focused = index= fitRange(index, (tabs.length));
      tabSwitcher.querySelectorAll("a.button")[index].focus();
   }

   /**
    * Shows or Hides the tabSwitcher if there's more than one tab. Focuses the tabSwitcher if it's shown.
    * @returns {Promise<boolean>} Returns a promise resolving to the show state.
    */
   function toggleTabSwitcher() {      
      return (tabs.length > 1) ? 
         toggle(tabSwitcher).then(
            (shown) => {
               setTimeout(() => {
                  return shown && cycleTabSwitcherFocus(0);
               }, DURATION_TOGGLED_FOCUS);
               return tabSwitcher;
            }
         ) : Promise.resolve(false);
   }

   /**
    * Handles a keyup Event in the tabSwitcher. Stops the event.
    * @param {Event<keyup>} e Active keyup Event.
    * @returns {false} Returns false.
    */
   function handleTabSwitcherKeyUp(e) {
      switch(e.key) {
         case "ArrowUp":
         case "ArrowLeft":
         case TILDE: { cycleTabSwitcherFocus(-1) } break;
         case "ArrowDown":
         case "ArrowRight":
         case BACKTICK: { cycleTabSwitcherFocus(1) } break;
         case "Enter":
         case "Space":
         case "Tab": 
         default: {} break;
      };
      return stopEvent(e);
   }

   /**
    * Bring the tab with the specified index to front.
    * @param {number} index The index of the tab to bring to front.
    * @returns {undefined} Does not return a value.
    */
   function switchTab(index) {
      index = fitRange(index, tabs.length);
      hide(tabSwitcher);
      hide(tabs[tabs.active]);
      tabs.active = tabs.focused = index;
      show(tabs[index]);
      setTimeout(() => {
         textInput.focus();
         const ct = tabs[tabs.active];
         envelope.echo(`Switched to ${ct.title}.`);
      }, DURATION_TOGGLED_FOCUS);
   }

   function addTab({ commands, element, execute, processor, ProcessorConstructor, title }) {
      // prep title and new index
      const alt = `Switch tab to: ${title}.`;
      const index = tabs.active = tabs.focused = tabs.length;

      // create new tab
      // create new tabSwitcherButton
      const newTab = element || 
         makeElement("article", { class: "text"});
         newTab.setAttribute("title", title);
         const newSwitcher = makeElement("a", {
         alt,
         class: "button",
         href: `javascript:// ${alt}`,
         name: title,
         title: alt
      }, { innerText: index });

      // close old tabs
      tabs.forEach(hide);

      if (!!processor) {
         processor.element = processor.element || newTab;
      } else if (ProcessorConstructor) {
         processor = new ProcessorConstructor(newTab)
      } else if (!!commands) {
         processor = new CommandTable(newTab, commands);
      } else {
         processor = new Processor(newTab);
      }
      processor.execute = (execute || processor.execute).bind(processor);
      newTab.processor = processor;
      newTab.execute = processor.execute;
      tabs.push(newTab);
      show(newTab);

      // set events
      newSwitcher.addEventListener("click", () => {
         setTimeout(() => {
            return switchTab(index);
         }, DURATION_TOGGLED_FOCUS);
      });

      // put in DOM
      tabSlot.appendChild(newTab);
      tabSwitcher.appendChild(newSwitcher);
   }

   // apply handlers
   tabSwitcher.addEventListener("keyup", handleTabSwitcherKeyUp);

   // apply apis
   tabSwitcher.toggle = toggleTabSwitcher;
   envelope.addTab = outer.addTab = addTab;
   envelope.switchTab = switchTab;
   envelope.countTabs = () => {
      return tabs.length;
   };
   envelope.activeTab = () => {
      return tabs.active;
   };
   envelope.activeTabTitle = () => {
      return tabs[envelope.activeTab()].title;
   };
   envelope.isMainTabActive = () => { 
      return !fitRange(tabs.active, tabs.length);
   };
   envelope.executeInTab = (tabIndex, text) => {
      const tidx = fitRange(tabIndex, tabs.length);
      clog(`Execute in tab index ${tidx} (of ${tabs.length} tabs): ${text}`);
      return tabs.length ? tabs[tidx].execute(text) : Promise.reject(NO_TABS);
   };
   envelope.executeInActiveTab = (text) => {
      return envelope.executeInTab(tabs.active, text);
   };
   envelope.executeMain = (text) => {
      return envelope.executeInTab(0, text);
   };
   envelope.clear = () => {
      let promise;
      if (tabs.length) {
         tabs[fitRange(tabs.active, tabs.length)].innerText = "";
         promise = Promise.resolve();
      } else {
         promise = Promise.reject(NO_TABS);
      }
      return promise;
   };
   envelope.tick = () => {
      return envelope.echo(Date.now());
   };
   envelope.title = () => {
      return envelope.echo(envelope.activeTabTitle());
   };
   envelope.echo = (...args) => {
      let promise;
      if (tabs.length) {
         promise = tabs[fitRange(tabs.active, tabs.length)].processor.enterLine(...args);
      } else {
         promise = Promise.reject(NO_TABS);
      }
      return promise;
   };
};

// eof