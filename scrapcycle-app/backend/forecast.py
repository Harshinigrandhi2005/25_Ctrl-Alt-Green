import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_squared_error, mean_absolute_error
import numpy as np

# Load the data
df = pd.read_csv('"C:\Users\91994\Downloads\archive (15)\Aluminium Historical Data.csv"')

# Display the first few rows of the data
print(df.head())

# Check the columns and data types
print(df.info())

# Check for any missing values
print(df.isnull().sum())

# Display basic statistics to understand the distribution of the data
print(df.describe())

# Convert Date to datetime
df['Date'] = pd.to_datetime(df['Date'], format='%d-%m-%Y')

# Handle missing data (e.g., forward fill or drop rows)
df.ffill(inplace=True)  # Or use df.dropna() if you prefer

# Check for duplicates and drop if necessary
df.drop_duplicates(inplace=True)

# Ensure the data is sorted by Date
df.sort_values(by='Date', inplace=True)

# Reset index
df.reset_index(drop=True, inplace=True)
df.dropna(inplace=True)
df.fillna(0)

# Basic statistics summary
print(df.describe())

# Plot price over time
plt.figure(figsize=(10, 6))
# plt.plot(df['Date'], df['Price'])
# plt.title('Price Trends Over Time')
# plt.xlabel('Date')
# plt.ylabel('Price')
# plt.xticks(rotation=45)
# plt.show()

# Example: Convert a date column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Convert price columns to float
df['Price'] = df['Price'].replace({',': ''}, regex=True).astype(float)

# Example: Create a moving average of prices
df['Price_MA_7'] = df['Price'].rolling(window=7).mean()

# Example: Extract day, month, and year from the date
df['Year'] = df['Date'].dt.year
df['Month'] = df['Date'].dt.month
df['Day'] = df['Date'].dt.day
df['Day_of_week'] = df['Date'].dt.dayofweek

# Split the data
features = ['Year', 'Month', 'Day', 'Day_of_week', 'Price_MA_7']  # Add more features as needed
target = 'Price'

# Split the data
X = df[features]
y = df[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions and evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

# Install required libraries (uncomment if needed)
# !pip install statsmodels

# SARIMAX Model
model_sarima = SARIMAX(df['Price'], 
                       order=(1, 1, 1),         # ARIMA order
                       seasonal_order=(1, 1, 1, 12),  # Seasonal order (p,d,q,s), s is the seasonal period (12 for monthly data)
                       enforce_stationarity=False, 
                       enforce_invertibility=False)

model_sarima_fit = model_sarima.fit()

# Summary of the model
print(model_sarima_fit.summary())

# Forecasting
forecast_sarima = model_sarima_fit.forecast(steps=10)

# Plot the forecasted values
# plt.plot(df['Price'], label='Historical Data')
# plt.plot(pd.date_range(df.index[-1], periods=10+1, freq='D')[1:], forecast_sarima, label='SARIMA Forecast', color='red')
# plt.legend()
# plt.show()

# Calculate forecast errors (on historical data if you have a separate test set)
forecast_errors = df['Price'][-10:] - forecast_sarima  # Assuming forecast is for the last 10 data points
rmse = np.sqrt(mean_squared_error(df['Price'][-10:], forecast_sarima))
mae = mean_absolute_error(df['Price'][-10:], forecast_sarima)

print(f'RMSE: {rmse}')
print(f'MAE: {mae}')
print(f"AIC: {model_sarima_fit.aic}")
print(f"BIC: {model_sarima_fit.bic}")

# Forecasting with SARIMA for 365 steps (1 year)
forecast_sarima = model_sarima_fit.forecast(steps=500)

# Print the forecasted values
print("SARIMA Forecasted Prices:")
print(forecast_sarima)

# Ensure the forecasted date range starts from January 1, 2024
forecast_dates = pd.date_range(start='2024-01-01', periods=500, freq='D')

# Plot the historical data and forecasted values
plt.figure(figsize=(12, 6))
plt.plot(df['Date'], df['Price'], label='Historical Data', color='blue')
plt.plot(forecast_dates, forecast_sarima, label='SARIMA Forecast (500 days)', color='red')
plt.title('Price Forecasting with SARIMA')
plt.xlabel('Date')
plt.ylabel('Price')
plt.legend()
plt.xticks(rotation=45)

# Set the x-axis range from 2024 to 2026
plt.xlim(pd.Timestamp('2024-01-01'), pd.Timestamp('2026-12-31'))

plt.show()