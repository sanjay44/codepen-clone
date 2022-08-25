import React from "react";
import useCodeMirror from "../../hooks/useCodeMirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { EditorView, basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { keymap } from "@codemirror/view";
import debounce from "lodash.debounce";
import { oneDark } from "@codemirror/theme-one-dark";
import "./CodeEditor.css";

const CodeEditor = ({ lang, onDocumentChange }) => {
  const handleDocumentChange = debounce((doc) => {
    onDocumentChange(doc);
  }, 300);

  const listener = ({ view, docChanged, state }) => {
    if (docChanged) {
      const { doc } = state;
      handleDocumentChange(doc);
    }
  };

  const languageExtension = (lang) => {
    switch (lang) {
      case "JS":
        return javascript();
      case "HTML":
        return html();
      case "CSS":
        return css();
      default:
        return null;
    }
  };

  const getLanguageSymbol = (lang) => {
    switch (lang) {
      case "JS":
        return "( )";
      case "HTML":
        return "<>";
      case "CSS":
        return "{ }";
      default:
        return "[]";
    }
  };

  const getLanguageIconColor = (lang) => {
    switch (lang) {
      case "JS":
        return "#FCD000";
      case "HTML":
        return "#FF3C41";
      case "CSS":
        return "#0EBEFF";
      default:
        return "";
    }
  };

  const { ref } = useCodeMirror({
    extensions: [
      basicSetup,
      oneDark,
      keymap.of([indentWithTab]),
      EditorView.lineWrapping,
      EditorView.updateListener.of(listener),
      languageExtension(lang),
    ],
  });

  return (
    <div className="editor">
      <div className="editor-header">
        <div className="editor-header-title">
          <span
            className="editor-lang-icon"
            style={{ backgroundColor: `${getLanguageIconColor(lang)}` }}
          >
            {getLanguageSymbol(lang)}
          </span>
          <span>{lang}</span>
        </div>
      </div>
      <div ref={ref} />
    </div>
  );
};

export default CodeEditor;
