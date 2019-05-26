import {
   DOUBLESLASH,
   SLASH,
   BACKSLASH,
   SPACE
} from "./constants.js";

export function getCommand(text) {
   const startsWithDoubleSlash = text.startsWith(DOUBLESLASH);
   const startsWithCommand = !startsWithDoubleSlash &&
                              text.startsWith(SLASH);
   const startsWithEscape = text.startsWith(BACKSLASH);
   return Promise[
      startsWithCommand ?
      "resolve" :
      "reject"
   ](
      text.substring(
         (startsWithEscape || startsWithDoubleSlash) ? 1 : 0
      )
   );
};

export function splitCommand(text) {
   let cmd, arg = (void 0);
   text = !!text && text.trim();
   if (!!text) {
      const idx = text.indexOf(SPACE);
      if (idx < 0) {
         cmd = text;
      } else {
         cmd = text.substring(0, idx);
         arg = text.substring(idx+1).trim();
      }
   }
   return {
      cmd,
      arg,
      args: arg && arg.split(SPACE)
   };
};

// eof