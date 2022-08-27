import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import "./App.css";
import SplitView from "./components/SplitView/SplitView";

// Code Editor
// Resizable split view
// Collapsible editor views
// Multiple views

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  return (
    <SplitView
      style={{ backgroundColor: "lightblue", padding: "4px", height: "200px" }}
    >
      <div style={{ backgroundColor: "yellow" }}>Page 1</div>
      <div style={{ backgroundColor: "yellow" }}>Page 2</div>
      <div style={{ backgroundColor: "yellow" }}>Page 3</div>
    </SplitView>
  );

  return (
    <div>
      <div className="editor-container">
        <CodeEditor
          lang="HTML"
          onDocumentChange={(doc) => {
            const { text } = doc;
            setHtml(text.join("\n"));
          }}
        />
        <CodeEditor
          lang="CSS"
          onDocumentChange={(doc) => {
            const { text } = doc;
            setCss(text.join("\n"));
          }}
        />
        <CodeEditor
          lang="JS"
          onDocumentChange={(doc) => {
            const { text } = doc;
            setJs(text.join("\n"));
          }}
        />
      </div>
      <div>
        <iframe
          srcDoc={`<html>
                    <head><style>${css}</style></head>
                    <body>${html}</body>
                    <script>${js}</script>
                   </html>
                 `}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default App;
