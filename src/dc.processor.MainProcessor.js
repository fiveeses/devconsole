import CommandTable from "./dc.processor.CommandTable.js";
import { getCommand } from "./utility.js";

export default class MainProcessor extends CommandTable {
   constructor(envelope) {
      const { tick, title, echo, clear } = envelope;
      
      super((void 0), { tick, title, echo, clear, tk: tick, "@": echo, cls: clear });
   }
   execute(text) {
      return getCommand(text).then(
         () => { return super.execute(text.substring(1)); },
         () => { return super.execute(text); }
      );
   }
};

// eof