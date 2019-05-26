import {
   DURATION_TOGGLED_FOCUS,
   EMPTY_STRING
} from "./constants.js";
import {
   clog,
   toggle,
   getCommand,
   splitCommand
} from "./utility.js";
import Processor from "./dc.Processor.js";
import MainProcessor from "./dc.processor.MainProcessor.js";

export default function initializeCore(envelope) {
   const { outer, textInput } = envelope;

   function toggleDevConsole() {
      return toggle(outer).then(
         (shown) => {
            setTimeout(() => {
               return shown && textInput.focus();
            }, DURATION_TOGGLED_FOCUS);
            return outer;
         }
      );
   }

   function executeDevConsole(text) {
      const value = text || textInput.value;
      textInput.value = EMPTY_STRING;

      if (!!value.trim()) {
         envelope.addRecent(value);
      }

      return !!value && getCommand(value).then(
         (command) => {
            console.warn("cmd", command);
            return envelope.executeMain(command).catch(() => {
               if (!envelope.isMainTabActive()) {
                  return envelope.executeInActiveTab(command).catch(clog);
               }
            })
         },
         (nonCommand) => {
            return envelope.executeInActiveTab(nonCommand).catch(clog);
         }
      ) || Promise.resolve();
   }

   Processor.setUtility({
      clog,
      getCommand,
      splitCommand
   });

   const mainProcessor = new MainProcessor(envelope);

   outer.addTab({
      title: "Main tab",
      processor: mainProcessor
   });


   outer.toggle = toggleDevConsole;
   envelope.execute = executeDevConsole;
}

// eof