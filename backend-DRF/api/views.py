from django.shortcuts import render
from rest_framework.views import APIView
from .seializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime

import os
from django.conf import settings  
from .utils  import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score

import plotly.graph_objects as go
import plotly.io as pio




class StockPredictionAPIView(APIView):
  def post(self, request):
    serializer = StockPredictionSerializer(data=request.data)
    if serializer.is_valid():
      ticker = serializer.validated_data['ticker']


      # Fetch the data from yfinance

      now = datetime.now()
      start = datetime(now.year-10,now.month, now.day)
      end = now
      df = yf.download(ticker, start, end)
      # print(df)
      if df.empty:
        return Response({"error":"no data found for the given ticker",
        'status':status.HTTP_404_NOT_FOUND})
      
      df = df.reset_index()
      # print(df)

      #Generate basic plot
      plt.switch_backend('AGG')
      plt.figure(figsize=(12, 5))
      plt.plot(df.Close, label = 'Closing Price')
      plt.title(f'Closing Price of {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Close price')
      plt.legend()

      # save the plot to a file
      plot_img_path = f'{ticker}_plot.png'
      plot_img = save_plot(plot_img_path)
      # print(plot_img)


      # 100 Days moving average
      ma100 = df.Close.rolling(100).mean()
      plt.switch_backend('AGG')
      plt.figure(figsize=(12, 5))
      plt.plot(df.Close, label = 'Closing Price')
      plt.plot(ma100,'r', label='100 DMA')
      plt.title(f'100 Days Moving Average of {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()

      plot_img_path = f'{ticker}_100_DMA.png'
      plot_100_DMA = save_plot(plot_img_path)


      # 200 Days moving average
      ma200 = df.Close.rolling(200).mean()
      plt.switch_backend('AGG')
      plt.figure(figsize=(12, 5))
      plt.plot(df.Close, label = 'Closing Price')
      plt.plot(ma100,'r', label='100 DMA')
      plt.plot(ma200,'g', label='200 DMA')
      plt.title(f'200 Days Moving Average of {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()

      plot_img_path = f'{ticker}_200_DMA.png'
      plot_200_DMA = save_plot(plot_img_path)

      #Splitting data into training & Testing Datasets
      data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
      data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])

        # scaling the data bw 0 and 1
      scaler = MinMaxScaler(feature_range=(0,1))

      # Load ML Model
      model = load_model('stock_prediction_MA_LSTM_model.keras')


      # preparing Test Dat
      past_100_days = data_training.tail(100)
      final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
      input_data = scaler.fit_transform(final_df)

      
      x_test = []
      y_test = []

      for i in range(100, input_data.shape[0]):
        x_test.append(input_data[i-100: i])
        y_test.append(input_data[i, 0])

      x_test, y_test = np.array(x_test), np.array(y_test)


      # Making Predictions
      y_predicted = model.predict(x_test)

      # revert the scalaed prices to original prices
      y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
      y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

      #plot the final prediction

      plt.switch_backend('AGG')
      plt.figure(figsize=(12, 5))
      plt.plot(y_test, 'b' , label='Original Price')
      plt.plot(y_predicted,'r', label='Predicted Price')
      plt.title(f'Final Prediction for {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()
      plot_img_path = f'{ticker}_Final_prediction.png'
      plot_prediction = save_plot(plot_img_path)



      # Model Evaluation
      # Mean Squared Error (MSE)
      mse = mean_squared_error(y_test, y_predicted)
      print(f"Mean Squared Error (MSE): {mse}")

      # Root Mean Squared Error (RMSE)
      rmse = np.sqrt(mse)
      print(f"Root Mean Squared Error (RMSE): {rmse}") 



      # R-Squared
      r2 = r2_score(y_test, y_predicted)
      print(f"R-Squared: {r2}")

      df_oc = df[['Open', 'Close']].copy()
      scaler_oc = MinMaxScaler()
      scaled_data = scaler_oc.fit_transform(df_oc)

      last_100_days = scaled_data[-100:].reshape(1, 100, 2)
      model_oc = load_model('lstm_open_close_model.keras')
      predicted_next_day_scaled = model_oc.predict(last_100_days)
      predicted_next_day = scaler_oc.inverse_transform(predicted_next_day_scaled)

      predicted_open = round(float(predicted_next_day[0][0]), 2)
      predicted_close = round(float(predicted_next_day[0][1]), 2)
      # next_day_date = (df['Date'].max() + pd.Timedelta(days=1)).strftime('%Y-%m-%d')

      next_day = df['Date'].max() + pd.Timedelta(days=1)
      while next_day.weekday() >= 5:  # 5 = Saturday, 6 = Sunday
        next_day += pd.Timedelta(days=1)
      next_day_date = next_day.strftime('%Y-%m-%d')


            # Candlestick Chart
      recent_ohlc = df[['Date', 'Open', 'High', 'Low', 'Close']].copy()
      recent_ohlc.set_index('Date', inplace=True)
      recent_ohlc = recent_ohlc[-30:]  # last 30 days

      # Predicted candle (with $1 range added)
      predicted_high = max(predicted_open, predicted_close) + 1
      predicted_low = min(predicted_open, predicted_close) - 1

      # Append predicted row
      predicted_row = pd.DataFrame({
          'Open': [predicted_open],
          'High': [predicted_high],
          'Low': [predicted_low],
          'Close': [predicted_close]
      }, index=[pd.to_datetime(next_day_date)])

      recent_ohlc = pd.concat([recent_ohlc, predicted_row])

      # Create Candlestick chart
      fig = go.Figure(data=[go.Candlestick(
          x=recent_ohlc.index,
          open=recent_ohlc['Open'],
          high=recent_ohlc['High'],
          low=recent_ohlc['Low'],
          close=recent_ohlc['Close'],
          increasing_line_color='green',
          decreasing_line_color='red'
      )])

      fig.update_layout(
          title=f'📊 {ticker.upper()} Candlestick Chart with Prediction',
          xaxis_title='Date',
          yaxis_title='Price',
          xaxis_rangeslider_visible=False,
          template='plotly_dark',
          width=1000,
          height=500
      )

      # Save candlestick chart as image
      candle_plot_path = os.path.join(settings.MEDIA_ROOT, f"{ticker}_candle.png")
      pio.write_image(fig, candle_plot_path, format='png')

      candle_plot_url = settings.MEDIA_URL + f"{ticker}_candle.png"
                    

      return Response({'status': 'success',
        'plot_img': plot_img,
        'plot_100_DMA':plot_100_DMA,
        'plot_200_DMA':plot_200_DMA,
        'plot_prediction':plot_prediction,
        'mse':mse,
        'rmse':rmse,
        'r2':r2,
        'predicted_open': predicted_open,
        'predicted_close': predicted_close,
        'predicted_date': next_day_date,
        'predicted_high': predicted_high,
        'predicted_low': predicted_low,
        'candle_plot': candle_plot_url ,

      })
  


      
  