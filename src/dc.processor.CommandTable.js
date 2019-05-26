import { SPACE } from "./constants.js";
import Processor from "./dc.Processor.js";
import { splitCommand } from "./utility.js";

export default class CommandTable extends Processor {
   
   constructor(element, commands = {}) {
      super(element);
      this._commands = commands;
      if (!commands._call) {
         this._commands._call = (text) => {
            let promise;
            const { cmd , args } = splitCommand(text);
            console.log(`CT|${text}|c|${cmd}|a|${args}|`);

            if (typeof this._commands[cmd] === "function") {
               console.log("args", args)
               promise = Promise.resolve(this._commands[cmd](...args));
            } else {
               promise = Promise.reject(`Unrecognized command: '${cmd}'`);
            }
            return promise;
         }
      }
   }

   execute(text, ...args) {
      let promise = Promise.resolve();
      const { cmd, arg } = splitCommand(text);
      console.log(`CT|${text}|c|${cmd}|a|${arg}|`);
      if (typeof this._commands[cmd] === "function") {
         promise = Promise.resolve(
            typeof arg === "undefined" ?
            this._commands[cmd](...args) :
            this._commands[cmd](arg)
         ).catch(console.error);
      } else {
         console.warn("humm");
         promise = Promise.reject(`Unrecognized command: '${cmd}'`);
      }
      return promise;
   }
};

// eof