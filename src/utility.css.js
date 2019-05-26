import { HIDDEN } from "./constants.js";

/**
 * A fake (narrowed) DOMTokenList as a last resort when nothing suitable can be found.
*/
const FALSE_CLASSLIST = Object.freeze({ classList: {
   toggle: () => { return true; },
   add: () => { return false; },
   remove: () => { return false; }
}});

/**
 * Finds the most relevant classList.
 * @param {HtlElement|*} self 
 * @param {HTMLElement|undefined} element (Optional)
 * @returns {DOMTokenList} Returns the most relevant classList.
 */
function _getClassList(self, element) {
   const el = [element, self, FALSE_CLASSLIST].find((el) => {
      return !!el && !!el.classList && !["toggle", "add", "remove"].find((k) => {
         return typeof el.classList[k] !== "function";
      });
   });
   return el && el.classList;
}

/**
 * Toggle the display of the given or 'this'-bound element
 * @param {HTMLElement} element (Optional) Element to be toggled. Defaults to this.
 */
export function toggle(element) {
   const cl = _getClassList(this, element);
   return Promise.resolve(!cl.toggle(HIDDEN));
};

/**
 * Hide the given or 'this'-bound element
 * @param {HTMLElement} element (Optional) Element to be toggled. Defaults to this.
 */
export function hide(element) {
   _getClassList(this, element).add(HIDDEN);
   return Promise.resolve(false);
};

/**
 * Show the given or 'this'-bound element
 * @param {HTMLElement} element (Optional) Element to be toggled. Defaults to this.
 */
export function show(element) {
   _getClassList(this, element).remove(HIDDEN);
   return Promise.resolve(true);
};

// eof