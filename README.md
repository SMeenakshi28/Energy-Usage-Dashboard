# Energy Usage Dashboard

A Flask web dashboard for exploring household energy consumption. The application
loads the included `energydata_complete.csv` dataset and presents summary metrics,
charts, tables, and correlations for appliance energy usage.

## Features

- Total, average, and estimated electricity cost summaries
- Monthly appliance energy consumption
- Hourly and weekday consumption patterns
- Temperature versus appliance consumption chart
- Descriptive statistics for appliance usage
- Correlation values for numeric dataset features
- Month-specific consumption details through the API

## Requirements

- Python 3.8 or newer
- `pip`

## Installation

1. Clone the repository and move into the project directory:

   ```bash
   git clone https://github.com/SMeenakshi28/Energy-Usage-Dashboard.git
   cd Energy-Usage-Dashboard
   ```

2. Create and activate a virtual environment:

   **Windows PowerShell**

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

   **macOS/Linux**

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Running the application

Start the Flask development server:

```bash
python app.py
```

Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in a browser.

The application reads `energydata_complete.csv` from the project root at startup,
so keep the dataset in that location when running the server.

## Deployment

Deployed using Render
Url:  [https://energy-usage-dashboard.onrender.com/](https://energy-usage-dashboard.onrender.com/)

## API endpoints

| Endpoint | Description |
| --- | --- |
| `GET /api/total-consumption` | Total appliance consumption |
| `GET /api/average-consumption` | Average appliance consumption |
| `GET /api/estimated-cost` | Estimated cost using the application's fixed rate |
| `GET /api/monthly-consumption` | Consumption grouped by month |
| `GET /api/month-details?month=1` | Total, average, and cost for a month |
| `GET /api/hourly-consumption` | Consumption grouped by hour |
| `GET /api/weekday-consumption` | Consumption grouped by weekday |
| `GET /api/temperature-consumption` | Outdoor temperature and appliance consumption pairs |
| `GET /api/statistics` | Descriptive statistics for appliance consumption |
| `GET /api/correlation` | Numeric feature correlations with appliance consumption |

## Project structure

```text
.
├── app.py                    # Flask application and API routes
├── energydata_complete.csv   # Energy usage dataset
├── requirements.txt          # Python dependencies
├── static/
│   ├── script.js             # Dashboard charts and API calls
│   └── style.css             # Dashboard styling
└── templates/
    └── index.html            # Dashboard page
```

## Notes

- Appliance consumption is read from the dataset's `Appliances` column.
- Estimated cost is calculated at `6.5` currency units per kWh in the application.
- Chart rendering uses [Chart.js](https://www.chartjs.org/) via its public CDN.
