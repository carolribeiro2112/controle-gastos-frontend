import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Heading, Box, Card } from "@radix-ui/themes";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
  id: string;
  value: number;
  category: string;
  description?: string;
  transactionDate: string;
  type: "INCOME" | "EXPENSE";
}

interface PieChartProps {
  transactions: Transaction[];
}

const PieChart = ({ transactions }: PieChartProps) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>Nenhuma despesa encontrada</p>
      </div>
    );
  }

  const categoryData = transactions.reduce(
    (acc, transaction) => {
      const { category, value } = transaction;
      acc[category] = (acc[category] || 0) + Math.abs(value);
      return acc;
    },
    {} as Record<string, number>,
  );

  const labels = Object.keys(categoryData);
  const data = Object.values(categoryData);

  const generateColors = (count: number) => {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6B6B",
      "#C9CBCF",
      "#4ECDC4",
      "#45B7D1",
    ];
    return colors.slice(0, count);
  };

  const backgroundColor = generateColors(labels.length);

  return (
    <Box maxWidth="400px" width="100%">
      <Card size="3" style={{ maxHeight: "395px" }}>
        <Heading style={{ textAlign: "center", marginBottom: "10px" }}>
          Distribuição de Despesas por Categoria
        </Heading>
        <Doughnut
          style={{
            maxHeight: "250px",
            marginBottom: "27px",
          }}
          data={{
            labels,
            datasets: [
              {
                data,
                backgroundColor,
                hoverBackgroundColor: backgroundColor,
                borderWidth: 1,
                borderColor: "#fff",
                // borderRadius: 50,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || "";
                    const value = context.parsed;
                    const total = context.dataset.data.reduce(
                      (a: number, b: number) => a + b,
                      0,
                    );
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${label}: R$ ${value.toFixed(2)} (${percentage}%)`;
                  },
                },
              },
            },
          }}
        />
      </Card>
    </Box>
  );
};

export default PieChart;
