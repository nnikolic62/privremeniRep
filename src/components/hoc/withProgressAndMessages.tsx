import { Alert, AlertColor, Snackbar } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React, { useState } from "react";
import { isEmpty } from "../../util/isEmpty";

interface MessageType {
  severity: AlertColor;
  messageContent?: string | null;
  error?: FetchBaseQueryError | SerializedError;
}

export interface ProgressAndMessagesProps {
  setMessage?: (value: MessageType) => void;
}

export default function withProgressAndMessages<T>(
  ChildComponent: React.JSXElementConstructor<T>
) {
  return function HOCActionProgress(props: T) {
    const [message, setMessage] = useState<MessageType | undefined>(undefined);

    const handleClose = () => {
      setMessage(undefined);
    };

    

    return (
      <>
        <Snackbar
          open={message !== undefined}
          autoHideDuration={5000}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={message?.severity || "info"}>
            {message?.messageContent}
          </Alert>
        </Snackbar>
        <ChildComponent {...props} setMessage={setMessage} />
      </>
    );
  };
}
