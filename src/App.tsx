import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";

export function App() {
  const typescriptEditorRef = useRef<HTMLDivElement>(null);
  const javascriptDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tsEditor: monaco.editor.IStandaloneCodeEditor,
      jsDisplay: monaco.editor.IStandaloneCodeEditor;

    if (typescriptEditorRef.current) {
      tsEditor = monaco.editor.create(typescriptEditorRef.current, {
        language: "typescript",
      });
    }

    if (javascriptDisplayRef.current) {
      jsDisplay = monaco.editor.create(javascriptDisplayRef.current, {
        language: "javascript",
        readOnly: true,
      });
    }

    return () => {
      tsEditor?.dispose();
      jsDisplay?.dispose();
    };
  }, []);

  return (
    <main
      className="h-full w-full flex flex-col items-center p-10 bg-slate-900"
      style={{ rowGap: 60 }}
    >
      <h1 className="text-5xl font-bold text-slate-200">
        TypeScript Playground
      </h1>
      <div className="flex flex-row items-center justify-center gap-4 w-full h-full">
        <div id="typescript-editor" className="w-3/5 h-5/6" />
        <div id="javascript-display" className="w-2/6 h-5/6" />
      </div>
    </main>
  );
}
