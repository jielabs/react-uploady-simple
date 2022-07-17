import React, { useState } from "react";
import Header from "./Header";
import "./App.css";

import { Line } from "rc-progress";
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { createMockSender } from "@rpldy/sender";

const UploadProgress = () => {
  const [progress, setProgess] = useState(0);
  const progressData = useItemProgressListener();

  if (progressData && progressData.completed > progress) {
    setProgess(() => progressData.completed);
  }

  return (
    progressData && (
      <Line
        style={{ height: "10px", marginTop: "20px" }}
        strokeWidth={2}
        strokeColor={progress === 100 ? "#00a626" : "#2db7f5"}
        percent={progress}
      />
    )
  );
};

export default function App() {
  return (
    <Uploady
      destination={{ url: "http://sample-server.com" }}
      enhancer={mockEnhancer}
    >
      <div className="App">
        <Header />
        <UploadButton />
        <br />
        <UploadProgress />
      </div>
    </Uploady>
  );
}

const mockEnhancer = (uploader) => {
  const mockSender = createMockSender({ delay: 1500 });
  uploader.update({ send: mockSender.send });
  return uploader;
};
