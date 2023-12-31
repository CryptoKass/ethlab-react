"use client";

import Editor, { Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor/esm/vs/editor/editor.api";
import { ethers } from "ethers";
import { Button, Select } from "flowbite-react";
import { useRef, useState } from "react";
import { useProvider, useSigner } from "./hooks";
import CodeBlock from "./CodeBlock";
import { CodeLine } from "./types";
import { ethlabMonacoTheme } from "./theme";

const EthLabScratchPad = () => {
  const [code, setCode] = useState<string>(
    "// globally available:\n" +
      "//  [ethers, " +
      "provider, " +
      "signer, await]\n\n" +
      'const bal = await provider.getBalance("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266")\n' +
      'console.log("Balance", ethers.formatEther(bal));\n'
  );
  const [theme, setTheme] = useState<string>("ethlab");
  //const [output, setOutput] = useState<string>("");
  const [output, setOutput] = useState<CodeLine[]>([]);

  const provider = useProvider();
  const signer = useSigner();
  const terminalRef = useRef(null);

  const handleEditorDidMount = async (
    _: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    // add ethers.js typings
    const ethersTypingsResponse = await fetch("/typings/ethers.d.ts");
    const ethersTypings = await ethersTypingsResponse.text();
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      ethersTypings,
      "/typings/ethers.d.ts"
    );

    monaco.editor.defineTheme("ethlab", ethlabMonacoTheme);
    monaco.editor.setTheme("ethlab");
  };

  const run = async () => {
    const w = window as any;
    w._provider = provider;
    w._signer = signer;
    w._ethers = ethers;

    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    const gotoBottom = () => {
      requestAnimationFrame(() => {
        if (!terminalRef.current) return;
        const terminal = terminalRef.current as HTMLDivElement;
        terminal.scrollTop = terminal.scrollHeight - 100;
      });
    };

    const _console_log = (message?: any, ...optionalParams: any[]) => {
      originalConsoleLog(message, ...optionalParams);
      setOutput((output) => [
        ...output,
        { type: "focus", content: message + " " + optionalParams.join(" ") },
      ]);
      gotoBottom();
    };

    const _console_error = (message?: any, ...optionalParams: any[]) => {
      originalConsoleError(message, ...optionalParams);
      setOutput((output) => [
        ...output,
        { content: message + " " + optionalParams.join(" "), type: "error" },
      ]);
      gotoBottom();
    };

    w._console_log = _console_log;
    w._console_error = _console_error;

    try {
      eval(
        "const console = {log: window._console_log, error: window._console_error}\n" +
          "let provider = window._provider\n" +
          "let signer = window._signer\n" +
          "let ethers = window._ethers\n" +
          `let main = async () => {\n${code}\n}\n` +
          "main().catch(console.error)\n"
      );
    } catch (error) {
      _console_error(error);
    }

    console.log("Done");
  };

  return (
    <>
      <div className="flex gap-4 justify-between mb-4 items-center">
        <div className="dark:text-white">
          <h3>ScratchPad</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            (javascript + ethers.js)
          </span>
        </div>
        <div className="flex gap-4">
          <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="ethlab">Dark</option>
            <option value="light">Light</option>
          </Select>
          <Button onClick={run}>Run</Button>
        </div>
      </div>
      <Editor
        className="rounded-lg h-72 font-mono overflow-hidden border-2 border-neutral-200 dark:border-gray-600"
        theme={theme}
        options={{
          extraEditorClassName: "font-mono",
          fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollbar: { vertical: "hidden" },
          padding: { top: 24, bottom: 24 },
        }}
        defaultLanguage="javascript"
        defaultValue={
          "// globally available:\n" +
          "//  [ethers: ethers, " +
          "provider: ethers.Provider, " +
          "signer: ethers.Signer, await]\n\n" +
          'const bal = await provider.getBalance("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266")\n' +
          'console.log("Balance", ethers.formatEther(bal));\n'
        }
        value={code}
        onChange={(value) => setCode(value || "")}
        onMount={(e, m) => handleEditorDidMount(e, m)}
      />

      <div className="flex gap-4 justify-between my-4 items-center">
        <h3 className="dark:text-white">Output:</h3>
        <div className="flex gap-4">
          <Button size="xs" color="gray" onClick={() => setOutput([])}>
            Clear
          </Button>
        </div>
      </div>

      <CodeBlock className="max-h-[200px]" lines={output} ref={terminalRef}>
        No scratchPad console output.
      </CodeBlock>
    </>
  );
};

export default EthLabScratchPad;
