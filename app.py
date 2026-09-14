from flask import Flask, render_template, jsonify, request
import pandas as pd

app = Flask(__name__)

# Load the energy dataset
df = pd.read_csv("energydata_complete.csv")

# Convert date column to datetime
df["date"] = pd.to_datetime(df["date"])
print(df["date"].dt.month.unique())
print(df.shape)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/monthly-consumption")
def monthly_consumption():

    monthly_data = (
        df.groupby(df["date"].dt.month)["Appliances"]
        .sum()
        .to_dict()
    )

    month_names = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    monthly_data = {
        month_names[month]: round(value, 2)
        for month, value in monthly_data.items()
    }

    return jsonify(monthly_data)

@app.route("/api/month-details")
def month_details():
    month = request.args.get("month")

    if not month:
        return jsonify({
            "error": "Month is required"
        }), 400

    try:
        month = int(month)
    except ValueError:
        return jsonify({
            "error": "Month must be a number"
        }), 400

    if month < 1 or month > 12:
        return jsonify({
            "error": "Month must be between 1 and 12"
        }), 400

    filtered_data = df[df["date"].dt.month == month]

    total = filtered_data["Appliances"].sum()
    average = filtered_data["Appliances"].mean()
    cost = total * 6.5

    return jsonify({
        "month": month,
        "total_consumption": round(float(total), 2),
        "average_consumption": round(float(average), 2),
        "estimated_cost": round(float(cost), 2)
    })

@app.route("/api/total-consumption")
def total_consumption():

    total = int(df["Appliances"].sum())

    return jsonify({
        "total_consumption": total
    })

@app.route("/api/average-consumption")
def average_consumption():

    average = df["Appliances"].mean()

    return jsonify({
        "average_consumption": float(round(average, 2))
    })

@app.route("/api/estimated-cost")
def estimated_cost():

    total = df["Appliances"].sum()

    cost = total * 6.5

    return jsonify({
        "estimated_cost": float(round(cost, 2))
    })

@app.route("/api/hourly-consumption")
def hourly_consumption():

    hourly_data = (
        df.groupby(df["date"].dt.hour)["Appliances"]
        .sum()
        .to_dict()
    )

    hourly_data = {
        str(hour): round(value, 2)
        for hour, value in hourly_data.items()
    }

    return jsonify(hourly_data)

@app.route("/api/weekday-consumption")
def weekday_consumption():

    weekday_data = (
        df.groupby(df["date"].dt.day_name())["Appliances"]
        .sum()
        .to_dict()
    )

    weekday_order = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    weekday_data = {
        day: round(weekday_data.get(day, 0), 2)
        for day in weekday_order
    }

    return jsonify(weekday_data)

@app.route("/api/temperature-consumption")
def temperature_consumption():

    data = df[["T_out", "Appliances"]].dropna()

    result = [
        {
            "temperature": round(float(row["T_out"]), 2),
            "consumption": round(float(row["Appliances"]), 2)
        }
        for _, row in data.iterrows()
    ]

    return jsonify(result)

@app.route("/api/statistics")
def statistics():
    statistics_data = df["Appliances"].describe()

    return jsonify({
        "count": float(statistics_data["count"]),
        "mean": float(statistics_data["mean"]),
        "std": float(statistics_data["std"]),
        "min": float(statistics_data["min"]),
        "25%": float(statistics_data["25%"]),
        "50%": float(statistics_data["50%"]),
        "75%": float(statistics_data["75%"]),
        "max": float(statistics_data["max"])
    })

@app.route("/api/correlation")
def correlation():
    correlation_data = (
        df.select_dtypes(include="number")
        .corr()["Appliances"]
        .drop("Appliances")
        .sort_values(ascending=False)
    )

    return jsonify({
        column: round(float(value), 3)
        for column, value in correlation_data.items()
    })

if __name__ == "__main__":
    app.run(debug=True)