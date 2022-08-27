import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import "./App.css";

// Code Editor
// Resizable split view
// Collapsible editor views
// Multiple views

const App = () => {
  const [html, setHtml] = useState("<h1>Code your idea here!</h1>");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const onDocumentChange = (doc, lang) => {
    const { text, children } = doc;
    let documentString = "";
    if (text) {
      // Handle TextLeaf
      documentString = text.join("\n");
    } else {
      // Handle TextNode - array of TextLeaf(s)
      documentString = children.reduce((acc, curr) => {
        return acc + curr.text.join("\n");
      }, "");
    }
    if (lang === "JS") {
      setJs(documentString);
    } else if (lang === "HTML") {
      setHtml(documentString);
    } else if (lang === "CSS") {
      setCss(documentString);
    }
  };

  return (
    <div className="app-container">
      <div className="editor-container">
        <CodeEditor
          lang="HTML"
          onDocumentChange={(doc) => {
            onDocumentChange(doc, "HTML");
          }}
          defaultDoc={html}
        />
        <CodeEditor
          lang="CSS"
          onDocumentChange={(doc) => {
            onDocumentChange(doc, "CSS");
          }}
        />
        <CodeEditor
          lang="JS"
          onDocumentChange={(doc) => {
            onDocumentChange(doc, "JS");
          }}
        />
      </div>
      <div className="iframe-container">
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
