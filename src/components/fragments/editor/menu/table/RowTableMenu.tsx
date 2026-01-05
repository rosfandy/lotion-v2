import { Editor } from "@tiptap/core";
import { useEffect, useRef } from "react";
import tippy, { Instance } from "tippy.js";
import { RowTableTools } from "../../tools/table/RowTableTools";
import { LuEllipsis } from "react-icons/lu";

interface Props {
  coord: DOMRect | null;
  editor: Editor;
}

export const RowTableMenu = ({ coord, editor }: Props) => {
  const tippyInstance = useRef<Instance | null>(null);
  const rowMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rowMenuRef.current) return;

    const instance = tippy(document.body, {
      content: rowMenuRef.current,
      trigger: "manual",
      placement: "left",
      appendTo: () => document.body,
      animation: "shift-toward",
      duration: 300,
      maxWidth: 350,
      offset: [0, 6],
      interactive: true,
      hideOnClick: false,
      getReferenceClientRect: () =>
        coord || ({ x: 0, y: 0, width: 0, height: 0 } as DOMRect),
      onCreate: (instance) => {
        instance.popper.classList.add(
          "max-md:!sticky",
          "max-md:!bottom-0",
          "max-md:!top-auto",
          "max-md:!transform-none"
        );
      },
    });

    tippyInstance.current = instance;

    return () => {
      instance.destroy();
      tippyInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!tippyInstance.current) return;

    if (coord) {
      tippyInstance.current.setProps({
        getReferenceClientRect: () => coord,
      });
      tippyInstance.current.show();
      tippyInstance.current.popperInstance?.update();
    } else {
      tippyInstance.current.hide();
    }
  }, [coord]);

  return (
    <div ref={rowMenuRef} className="">
      <RowTableTools editor={editor} parentRef={rowMenuRef} />
      <div className="transform rotate-90 border p-1 rounded-xl border-border-light dark:border-border-dark hover:bg-gray-100 dark:hover:bg-gray-800">
        <LuEllipsis />
      </div>
    </div>
  );
};
