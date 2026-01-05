"use client";

import { useState, useEffect, useMemo } from "react";
// import Cookies from "js-cookie";
import EditorCore from "./core/EditorCore";
import { Awareness } from "y-protocols/awareness";
import * as Y from "yjs";
// import io, { Socket } from "socket.io-client";

interface EditorProps {
  initialContent?: any;
  onChange?: (data: any) => void;
  useCollab?: boolean;
}

export default function Editor({ initialContent, useCollab = false, onChange }: EditorProps) {
  // const data = Cookies.get("user");
  // const [user, setUser] = useState(data ? JSON.parse(data) : null);
  const [dictionary, setDictionary] = useState<any | null>(null);
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<string>("disconnected");

  // Create documents
  // const documents = useMemo(() => {
  //   const doc = new Y.Doc();
  //   const awareness = new Awareness(doc);

  //   if (user) {
  //     awareness.setLocalStateField("user", {
  //       name: user.name || "Anonymous",
  //       color: user.color || "#ff6b6b",
  //       id: user.id || Math.random().toString(36).substr(2, 9),
  //     });
  //   }

  //   return { doc, awareness };
  // }, [user?.id, user?.name, user?.color]);

  // Socket.IO connection for collaboration
  const handleEditorChange = (data: any) => {
    onChange?.(data);
    console.log("Editor content changed:", data);
  };

  // if (!dictionary) return;
  return (
    <div className="relative">
      <EditorCore
        value={initialContent}
        // ydoc={documents.doc}
        // provider={socket} // Pass socket as provider
        status={status}
        onChange={handleEditorChange}
        useCollab={useCollab}
      />
    </div>
  );
}
