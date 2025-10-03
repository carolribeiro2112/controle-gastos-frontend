/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Table, Text } from "@radix-ui/themes";
import RelationsList from "../RelationsList/RelationsList";

interface CustomTableProps {
  columns: {
    id: string;
    label: string;
    justify: "center" | "start" | "end";
  }[];
  data: { id: number; [key: string]: any }[];
  relations: any[];
  handleUserSelection: (userId: string) => void;
  userRole: string;
}
const CustomTable = ({
  columns,
  data,
  relations,
  handleUserSelection,
  userRole,
}: CustomTableProps) => {
  return (
    <Card style={{ gap: "16px", width: "100%", maxWidth: "1000px" }}>
      {userRole === "ADMIN" && (
        <RelationsList
          relations={relations}
          onUserSelect={handleUserSelection}
        />
      )}
      <Table.Root size={"3"} style={{ width: "100%", overflowX: "auto" }}>
        <Table.Header style={{ backgroundColor: "var(--gray-a2)" }}>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.id} justify={column.justify}>
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
          {data.length === 0 && <Text>No transactions found.</Text>}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default CustomTable;
