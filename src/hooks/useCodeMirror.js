import { useEffect, useRef } from "react";
import { EditorView } from "codemirror";

const useCodeMirror = ({ extensions }) => {
  const ref = useRef();

  useEffect(() => {
    const view = new EditorView({
      doc: "",
      extensions: [...extensions],
      parent: ref.current,
    });

    return () => {
      view.destroy();
    };
  }, []);

  return { ref };
};

export default useCodeMirror;
