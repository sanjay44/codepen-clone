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
import htmlIcon from "../../assets/html.png";
import cssIcon from "../../assets/css.png";
import jsIcon from "../../assets/js.png";

const CodeEditor = ({ lang, onDocumentChange, defaultDoc }) => {
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

  const getLanguageIcon = (lang) => {
    switch (lang) {
      case "JS":
        return jsIcon;
      case "HTML":
        return htmlIcon;
      case "CSS":
        return cssIcon;
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
    defaultDoc,
  });

  return (
    <div className="editor">
      <div className="editor-header">
        <div
          className="editor-header-title"
          // style={{ borderLeft: `4px solid ${getLanguageIconColor(lang)}` }}
        >
          <span className="editor-lang-icon">
            <img src={getLanguageIcon(lang)} alt={lang} width="20px" />
          </span>
          <span>{lang}</span>
        </div>
      </div>
      <div ref={ref} />
    </div>
  );
};

export default CodeEditor;
