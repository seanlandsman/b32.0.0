import { CustomCellRendererProps } from "@ag-grid-community/react";
import React from "react";

export default (params: CustomCellRendererProps) => (
  <span
    class="missionSpan"
  >
    {
      <img
        alt={`${params.value}`}
        src={`https://www.ag-grid.com/example-assets/icons/${
          params.value ? "tick-in-circle" : "cross-in-circle"
        }.png`}
        class="missionIcon"
      />
    }
  </span>
)
