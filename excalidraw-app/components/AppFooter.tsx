import { useUIAppState } from "@excalidraw/excalidraw/context/ui-appState";
import { Footer } from "@excalidraw/excalidraw/index";
import React from "react";

import { isExcalidrawPlusSignedUser } from "../app_constants";

import { DebugFooter, isVisualDebuggerEnabled } from "./DebugCanvas";
import { EncryptedIcon } from "./EncryptedIcon";

export const AppFooter = React.memo(
  ({ onChange }: { onChange: () => void }) => {
    const appState = useUIAppState();

    return (
      <Footer>
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          {isVisualDebuggerEnabled() && !appState.whiteboardMode && (
            <DebugFooter onChange={onChange} />
          )}
          {!isExcalidrawPlusSignedUser && !appState.whiteboardMode && (
            <EncryptedIcon />
          )}
        </div>
      </Footer>
    );
  },
);
