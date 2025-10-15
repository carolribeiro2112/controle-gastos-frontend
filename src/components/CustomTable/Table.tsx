/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Table } from "@radix-ui/themes";
import RelationsSelect from "../RelationsSelect/RelationsSelect";
import EmptyState from "../EmptyState/EmptyState";
import TransactionFilters from "../TransactionFilter/TransactionFilter";

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
  selectedUserId?: string;
  onFiltersChange?: (filters: { type?: string; category?: string }) => void;
  showFilters?: boolean;
}
const CustomTable = ({
  columns,
  data,
  relations,
  handleUserSelection,
  userRole,
  selectedUserId,
  onFiltersChange,
  showFilters = true,
}: CustomTableProps) => {
  return (
    <Card style={{ gap: "16px", width: "100%", maxWidth: "1000px" }}>
      {showFilters && onFiltersChange && (
        <TransactionFilters onFiltersChange={onFiltersChange} />
      )}
      {userRole === "ADMIN" && (
        <RelationsSelect
          relations={relations}
          onUserSelect={handleUserSelection}
          externalSelectedUserId={selectedUserId}
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
        </Table.Body>
      </Table.Root>
      {data.length === 0 && <EmptyState />}
    </Card>
  );
};

export default CustomTable;
