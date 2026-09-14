fetch("/api/monthly-consumption")
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load monthly consumption data");
        }

        return response.json();
    })
    .then(data => {

        const container =
            document.getElementById("monthly-data");

        for (const month in data) {

            const row = document.createElement("tr");

            row.innerHTML =
                "<td>" + month + "</td>" +
                "<td>" + data[month].toFixed(2) + "</td>";

            container.appendChild(row);
        }
        const months = Object.keys(data);
        const consumption = Object.values(data);

        new Chart(
            document.getElementById("monthly-chart"),
            {
                type: "bar",

                data: {
                    labels: months,

                    datasets: [
                        {
                            label: "Energy Consumption (kWh)",
                            data: consumption
                        }
                    ]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        );
    })
    .catch(error => {
        console.error(error);
    });

fetch("/api/total-consumption")
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load monthly consumption data");
        }

        return response.json();
    })
    .then(data => {

        const totalElement =
            document.getElementById("total-consumption");

        totalElement.textContent =
            data.total_consumption.toFixed(2);
    })
    .catch(error => {
        console.error(error);
    });

fetch("/api/average-consumption")
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load monthly consumption data");
        }

        return response.json();
    })
    .then(data => {

        const averageElement =
            document.getElementById("average-consumption");

        averageElement.textContent =
            data.average_consumption.toFixed(2);
    })
    .catch(error => {
        console.error(error);
    });

fetch("/api/estimated-cost")
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load estimated cost data");
        }

        return response.json();
    })
    .then(data => {

        const estimatedCostElement =
            document.getElementById("estimated-cost");

        estimatedCostElement.textContent =
            data.estimated_cost.toFixed(2);
    })
    .catch(error => {
        console.error(error);
    });

fetch("/api/hourly-consumption")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load hourly consumption data");
        }
        return response.json();
    })
    .then(data => {
        const hours = Object.keys(data);
        const consumption = Object.values(data);

        new Chart(
            document.getElementById("hourly-chart"),
            {
                type: "line",
                data: {
                    labels: hours,
                    datasets: [
                        {
                            label: "Energy Consumption (kWh)",
                            data: consumption,
                            fill: false,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        );
    })
    .catch(error => {
        console.error(error);
    });

fetch("/api/weekday-consumption")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load weekday consumption data");
        }
        return response.json();
    })
    .then(data => {
        const days = Object.keys(data);
        const consumption = Object.values(data);

        new Chart(
            document.getElementById("weekday-chart"),
            {
                type: "bar",
                data: {
                    labels: days,
                    datasets: [
                        {
                            label: "Energy Consumption (kWh)",
                            data: consumption
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        );
    })
    .catch(error => {
        console.error(error);
    });

fetch("/api/temperature-consumption")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load temperature vs consumption data");
        }
        return response.json();
    })
    .then(data => {

        const temperatures =
            data.map(item => item.temperature);

        const consumption =
            data.map(item => item.consumption);

        new Chart(
            document.getElementById("temperature-chart"),
            {
                type: "scatter",

                data: {
                    datasets: [
                        {
                            label: "Temperature vs Energy Consumption",

                            data: data.map(item => ({
                                x: item.temperature,
                                y: item.consumption
                            }))
                        }
                    ]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Outside Temperature"
                            }
                        },

                        y: {
                            title: {
                                display: true,
                                text: "Energy Consumption (kWh)"
                            }
                        }
                    }
                }
            }
        );

    })
    .catch(error => {
        console.error(error);
    });

fetch("/api/statistics")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load statistics data");
        }
        return response.json();
    })
    .then(data => {
        const container =
            document.getElementById("statistics-data");

        for (const statistic in data) {
            const row = document.createElement("tr");

            row.innerHTML =
                "<td>" + statistic + "</td>" +
                "<td>" + data[statistic].toFixed(2) + "</td>";

            container.appendChild(row);
        }
    })
    .catch(error => {
        console.error(error);
    });

fetch("/api/correlation")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load correlation data");
        }
        return response.json();
    })
    .then(data => {
        const container =
            document.getElementById("correlation-data");

        for (const feature in data) {
            const row = document.createElement("tr");

            row.innerHTML =
                "<td>" + feature + "</td>" +
                "<td>" + data[feature].toFixed(3) + "</td>";

            container.appendChild(row);
        }
    })
    .catch(error => {
        console.error(error);
    });

const monthFilter = document.getElementById("month-filter");

function loadMonthDetails(month) {
    document.getElementById("total-consumption").textContent = "Loading...";
    document.getElementById("average-consumption").textContent = "Loading...";
    document.getElementById("estimated-cost").textContent = "Loading...";

    fetch("/api/month-details?month=" + month)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load month details");
            }

            return response.json();
        })
        .then(data => {

            document.getElementById("total-consumption").textContent =
                data.total_consumption.toFixed(2);

            document.getElementById("average-consumption").textContent =
                data.average_consumption.toFixed(2);

            document.getElementById("estimated-cost").textContent =
                data.estimated_cost.toFixed(2);

            console.log("Selected month:", month);
            console.log("Month data:", data);
        })
        .catch(error => {
            console.error("Month filter error:", error);

            document.getElementById("total-consumption").textContent = "Error";
            document.getElementById("average-consumption").textContent = "Error";
            document.getElementById("estimated-cost").textContent = "Error";
        });
}

function loadOverallMetrics() {
    document.getElementById("total-consumption").textContent = "Error";
    document.getElementById("average-consumption").textContent = "Error";
    document.getElementById("estimated-cost").textContent = "Error";

    fetch("/api/total-consumption")
        .then(response => response.json())
        .then(data => {
            document.getElementById("total-consumption").textContent =
                data.total_consumption.toFixed(2);
        });

    fetch("/api/average-consumption")
        .then(response => response.json())
        .then(data => {
            document.getElementById("average-consumption").textContent =
                data.average_consumption.toFixed(2);
        });

    fetch("/api/estimated-cost")
        .then(response => response.json())
        .then(data => {
            document.getElementById("estimated-cost").textContent =
                data.estimated_cost.toFixed(2);
        });
}

monthFilter.addEventListener("change", function () {

    const selectedMonth = monthFilter.value;

    if (!selectedMonth) {
        loadOverallMetrics();
        return;
    }

    loadMonthDetails(selectedMonth);
});