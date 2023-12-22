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
        theme: "vs-dark",
        fontSize: 18,
        minimap: {
          enabled: true,
        },
      });
    }

    if (javascriptDisplayRef.current) {
      jsDisplay = monaco.editor.create(javascriptDisplayRef.current, {
        language: "javascript",
        readOnly: true,
        theme: "vs-dark",
        fontSize: 18,
        minimap: {
          enabled: true,
        },
      });
    }

    return () => {
      tsEditor?.dispose();
      jsDisplay?.dispose();
    };
  }, []);

  console.log({
    typescriptEditorRef: typescriptEditorRef.current,
  });

  return (
    <main className="h-full w-full flex flex-col items-center p-12 bg-slate-400">
      <h1 className="text-5xl font-bold text-slate-900">
        TypeScript Playground
      </h1>
      <div className="flex flex-row items-center justify-center gap-10 w-11/12 h-4/5 my-auto border-4 border-black">
        <div
          ref={typescriptEditorRef}
          className="w-3/5 h-5/6 shadow-md shadow-black"
        />
        <div
          ref={javascriptDisplayRef}
          className="w-2/6 h-5/6 shadow-md shadow-black"
        />
      </div>
    </main>
  );
}
