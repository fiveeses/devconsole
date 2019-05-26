import {
   RECENT_HISTORY_LENGTH,
   BACKSLASH,
   TILDE,
   EMPTY_STRING,
   DURATION_QUARTER_SECOND
} from "./constants.js";
import { 
   fitRange,
   stopEvent
} from "./utility.js";

export default function initializeTextInput(envelope) {

   const { outer, tabSwitcher, textInput } = envelope;
   const textHistory = [];
   let activeTextIndex = -1;
   let blockTilde = false;

   function setRecentInputValue(n) {
      activeTextIndex = n = fitRange(
         n,
         (textHistory.length + 1)
      );
      textInput.value = (n < textHistory.length) &&
         textHistory[n] || EMPTY_STRING;
   }

   function addRecent(text) {
      textHistory.push(text);
      if (textHistory.length > RECENT_HISTORY_LENGTH) {
         textHistory.shift();
      }
   }

   function handleTextInputKeyUp(e) {
      switch(e.key) {
         case "Escape": {
            outer.toggle();
         } break;
         case "Enter": {
            activeTextIndex = -1;
            envelope.execute();
         } break;
         case "ArrowUp": {
            setRecentInputValue(
               ((activeTextIndex === -1) ?
               textHistory.length :
               activeTextIndex) - 1
            );
         } break;
         case "ArrowDown": {
            setRecentInputValue(
               (activeTextIndex + 1 > textHistory.length) ?
               0 :
               (activeTextIndex + 1)
            );
         } break;
         default: {} break;
      };
      blockTilde = false;
      return stopEvent(e);
   }

   function handleTextInputKeyPress(e) {
      if (e.key === TILDE) {
         switch(textInput.value[textInput.value.length - 1]) {
            case BACKSLASH: {
               textInput.value =
               `${textInput.value.substring(
                  0,
                  (textInput.value.length - 1)
               )}${TILDE}`;
            } break;
            case TILDE: {
               textInput.value = `${textInput.value}${TILDE}`;
            } break;
            default: {
               if (!blockTilde) {
                  blockTilde = true;
                  setTimeout(() => {
                     tabSwitcher.toggle();
                  }, DURATION_QUARTER_SECOND);
               }
            } break;
         }; // end switch
         return stopEvent(e);
      }
   }

   textInput.addEventListener("keyup", handleTextInputKeyUp);
   textInput.addEventListener("keypress", handleTextInputKeyPress);

   envelope.addRecent = addRecent;
};

// eof