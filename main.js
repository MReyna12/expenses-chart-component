const fetchSpendingData = async () => {
  try {
    const res = await fetch("./lib/data.json");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const spendingData = async () => {
  const data = await fetchSpendingData();
  const dayOfTheWeek = data.map((days) => days.day);
  const spendingAmounts = data.map((days) => days.amount);
  return {
    days: dayOfTheWeek,
    amounts: spendingAmounts,
  };
};

const createBarGraph = async () => {
  const data = await fetchSpendingData();
  const dayOfTheWeek = data.map((days) => days.day);
  const spendingAmounts = data.map((days) => days.amount);

  new Chart(document.getElementById("myChart"), {
    type: "bar",
    data: {
      labels: dayOfTheWeek,
      datasets: [
        {
          label: "",
          data: spendingAmounts,
          backgroundColor: [
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(186, 34%, 60%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
          ],
          hoverBackgroundColor: [
            "hsl(10, 79%, 75%)",
            "hsl(10, 79%, 75%)",
            "hsl(186, 34%,70%)",
            "hsl(10, 79%, 75%)",
            "hsl(10, 79%, 75%)",
            "hsl(10, 79%, 75%)",
            "hsl(10, 79%, 75%)",
          ],
          borderSkipped: "",
          borderWidth: 0,
          borderRadius: 3,
          color: ["hsl(28, 10%, 53%)"],
        },
      ],
    },
    options: {
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0]
          ? "pointer"
          : "default";
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          display: false,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          drawOnChartArea: false,
          ticks: {
            color: "hsl(28, 10%, 53%)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            boxWidth: 0,
            boxHeight: 20,
          },
        },
        tooltip: {
          backgroundColor: "hsl(25, 47%, 15%)",
          yAlign: "bottom",
          xAlign: "center",
          caretSize: 0,
          displayColors: false,
          caretPadding: 8,
          callbacks: {
            title: () => {},
            label: (context) => {
              return "$" + context.formattedValue;
            },
          },
        },
      },
    },
  });
};

const myChart = createBarGraph();
