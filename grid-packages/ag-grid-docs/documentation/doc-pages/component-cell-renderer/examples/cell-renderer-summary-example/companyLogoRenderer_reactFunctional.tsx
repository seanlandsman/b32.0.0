import { CustomCellRendererProps } from "@ag-grid-community/react";
import React from "react";

export default (params: CustomCellRendererProps) => (
  <span
    class="imgSpan"
  >
    {params.value && (
      <img
        alt={`${params.value} Flag`}
        src={`https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`}
        class="logo"
      />
    )}
  </span>
)