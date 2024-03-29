import { v4 as uuidv4 } from "uuid";

export const codeInstance = (function () {
  let instance: string;

  return {
    getInstance: () => {
      if (!instance) {
        instance = uuidv4();
      }
      return instance;
    },
  };
})();
