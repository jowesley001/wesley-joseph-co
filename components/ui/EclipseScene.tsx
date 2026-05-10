"use client";

import Spline from "@splinetool/react-spline";
import { useState } from "react";

// Original Spline eclipse scene restored by request.
const SPLINE_SCENE_URL =
  "https://prod.spline.design/VOugc1AHlsuIC6Og/scene.splinecode";

export function EclipseScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 bg-black">
      <Spline
        scene={SPLINE_SCENE_URL}
        onLoad={() => setLoaded(true)}
        style={{ width: "100%", height: "100%" }}
      />
      {!loaded ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-bg"
          style={{ opacity: 1 }}
        />
      ) : null}
    </div>
  );
}
