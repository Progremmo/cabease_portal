"use client";

import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridOptions, ModuleRegistry, themeQuartz, AllCommunityModule } from "ag-grid-community";
import { useTheme } from "next-themes";

ModuleRegistry.registerModules([AllCommunityModule]);

interface DataTableProps<T> {
  rowData: T[];
  columnDefs: ColDef[];
  isLoading?: boolean;
  onRowClicked?: (data: T) => void;
  pagination?: boolean;
  paginationPageSize?: number;
  height?: string | number;
}

export function DataTable<T>({
  rowData,
  columnDefs,
  isLoading = false,
  onRowClicked,
  pagination = true,
  paginationPageSize = 20,
  height = 600,
}: DataTableProps<T>) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const gridOptions: GridOptions = useMemo(
    () => ({
      suppressCellFocus: true,
      rowSelection: {
        mode: "singleRow",
      },
      onRowClicked: (event) => {
        if (onRowClicked && event.data) {
          onRowClicked(event.data);
        }
      },
      overlayLoadingTemplate: `<span class="ag-overlay-loading-center text-primary font-medium">Loading Data...</span>`,
      overlayNoRowsTemplate: `<span class="ag-overlay-loading-center text-muted-foreground font-medium">No Rows To Show</span>`,
    }),
    [onRowClicked]
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
    }),
    []
  );

  return (
    <div className="w-full relative rounded-lg border border-border shadow-sm overflow-hidden" style={{ height }}>
      <AgGridReact
        theme={themeQuartz.withParams({
          backgroundColor: isDark ? "hsl(240 10% 3.9%)" : "hsl(0 0% 100%)",
          foregroundColor: isDark ? "hsl(0 0% 98%)" : "hsl(240 10% 3.9%)",
          browserColorScheme: isDark ? "dark" : "light",
          headerBackgroundColor: isDark ? "hsl(240 3.7% 15.9%)" : "hsl(240 4.8% 95.9%)",
          rowHoverColor: isDark ? "hsl(240 3.7% 15.9%)" : "hsl(240 4.8% 95.9%)",
          borderColor: isDark ? "hsl(240 3.7% 15.9%)" : "hsl(240 5.9% 90%)",
          headerTextColor: isDark ? "hsl(0 0% 98%)" : "hsl(240 5.3% 26.1%)",
        })}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        loading={isLoading}
      />
    </div>
  );
}
