import * as monaco from "monaco-editor";

export function debounce(
  func: (event: monaco.editor.IModelContentChangedEvent) => void,
  wait: number
) {
  let timeout: number | null = null;

  return function executedFunction(
    event: monaco.editor.IModelContentChangedEvent
  ) {
    const later = () => {
      clearTimeout(timeout!); // clear timeout then call the function
      func(event);
    };

    if (timeout !== null) {
      // Needed to reset the timeout if the function is called again
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
