import React from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  ColumnSort,
  getSortedRowModel,
  SortingState,
  Updater
} from '@tanstack/react-table';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onSortChange?: (sortBy: string, sortDescending: boolean) => void;
  initialSort?: ColumnSort[];
}

export function DataTable<TData>({ columns, data, onSortChange, initialSort = [] }: TableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSort);

  const handleSort = (columnId: string, isDesc: boolean) => {
    const newSorting = [{ id: columnId, desc: isDesc }];
    setSorting(newSorting);
    if (onSortChange) {
      onSortChange(columnId, isDesc)
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: (updater: Updater<SortingState>) => {
      setSorting(updater);

      const newSorting = typeof updater === 'function'
        ? updater(sorting)
        : updater;

      setSorting(newSorting);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full text-lg">
      <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const isSorted = header.column.getIsSorted();
                return (
                  <th key={header.id} className="px-4 py-4 text-left">
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <div className="flex flex-col">
                        <button 
                          onClick={() => handleSort(header.id, false)}
                          className={`p-1 cursor-pointer ${isSorted === 'asc' ? 'text-blue-500' : 'text-gray-400'}`}
                          aria-label="Sort ascending"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button 
                          onClick={() => handleSort(header.id, true)}
                          className={`p-1 cursor-pointer ${isSorted === 'desc' ? 'text-blue-500' : 'text-gray-400'}`}
                          aria-label="Sort descending"
                        >
                          <ArrowDown size={16} />
                        </button>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b-3 border-t-3 border-input-gray">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-4 text-light-gray">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
