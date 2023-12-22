import * as monaco from "monaco-editor";
import * as ts from "typescript";
import { useEffect, useRef } from "react";
import { debounce } from "./debounce";

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
        wordWrap: "on",
        minimap: {
          enabled: true,
        },
      });

      const debouncedCompile = debounce(
        () => compileTypeScript(tsEditor.getValue()),
        500
      );

      tsEditor.onDidChangeModelContent(debouncedCompile);
    }

    if (javascriptDisplayRef.current) {
      jsDisplay = monaco.editor.create(javascriptDisplayRef.current, {
        language: "javascript",
        readOnly: true,
        theme: "vs-dark",
        fontSize: 18,
        wordWrap: "on",
        minimap: {
          enabled: true,
        },
      });
    }

    const compileTypeScript = (code: string) => {
      try {
        const result = ts.transpileModule(code, {
          compilerOptions: { module: ts.ModuleKind.CommonJS },
          reportDiagnostics: true,
        });

        // Check for compilation errors
        if (result.diagnostics && result.diagnostics.length > 0) {
          const errors = result.diagnostics
            .map((diagnostic) => {
              const message = ts.flattenDiagnosticMessageText(
                diagnostic.messageText,
                "\n"
              );
              return `Error: ${message}`;
            })
            .join("\n");

          // Display errors
          jsDisplay.getModel()?.setValue(errors);
        } else {
          // No errors, display JavaScript
          jsDisplay.getModel()?.setValue(result.outputText);
        }
      } catch (error) {
        jsDisplay.getModel()?.setValue(`Compilation Error: ${error}`);
      }
    };

    return () => {
      tsEditor?.dispose();
      jsDisplay?.dispose();
    };
  }, []);

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
