/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "@radix-ui/themes";

interface CustomTableProps {
  columns: {
    id: string;
    label: string;
    justify: "center" | "start" | "end";
  }[];
  data: { id: number; [key: string]: any }[];
}
const CustomTable = ({ columns, data }: CustomTableProps) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.id}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.id}>
            {columns.map((column, index) => {
              const CellComponent =
                index === 0 ? Table.RowHeaderCell : Table.Cell;
              return (
                <CellComponent key={column.id} justify={column.justify}>
                  {item[column.id as keyof typeof item]}
                </CellComponent>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default CustomTable;
