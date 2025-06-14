import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosinstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExpand, faTimes, faGlobe, faFlag } from '@fortawesome/free-solid-svg-icons';
import backgroundImageReg from '../../assets/dashboardstock.jpg';



const globalTickers = [
  "AAPL", "MSFT", "TSLA", "AMZN", "NVDA",
  "META", "GOOGL", "NFLX", "AMD", "INTC"
];

const indianTrendingTickers = [
  "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS",
  "KOTAKBANK.NS", "SBIN.NS", "AXISBANK.NS", "HINDUNILVR.NS", "BAJFINANCE.NS"
];

const Dashboard = () => {
  const [ticker, setTicker] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState();
  const [ma100, setMa100] = useState();
  const [ma200, setMa200] = useState();
  const [prediction, setPrediction] = useState();
  const [mse, setMse] = useState();
  const [rmse, setRmse] = useState();
  const [r2, setR2] = useState();
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [predictedOpen, setPredictedOpen] = useState();
  const [predictedClose, setPredictedClose] = useState();
  const [predictedDate, setPredictedDate] = useState();
  const [candlestickChart, setCandlestickChart] = useState();
  const [predictedHigh, setPredictedHigh] = useState();
  const [predictedLow, setPredictedLow] = useState();
  const [showTickers, setShowTickers] = useState(false);
  const [activeTab, setActiveTab] = useState('global');

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        await axiosInstance.get('/protected-view');
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await axiosInstance.post('/predict/', { ticker });
      console.log(response.data);

      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      setPlot(`${backendRoot}${response.data.plot_img}`);
      setMa100(`${backendRoot}${response.data.plot_100_DMA}`);
      setMa200(`${backendRoot}${response.data.plot_200_DMA}`);
      setPrediction(`${backendRoot}${response.data.plot_prediction}`);
      setCandlestickChart(`${backendRoot}${response.data.candle_plot}`);
      
      setMse(response.data.mse);
      setRmse(response.data.rmse);
      setR2(response.data.r2);

      setPredictedOpen(response.data.predicted_open);
      setPredictedClose(response.data.predicted_close);
      setPredictedDate(response.data.predicted_date);
      setPredictedHigh(response.data.predicted_high);
      setPredictedLow(response.data.predicted_low);

      if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("API request error:", error);
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openFullscreen = (imgUrl) => {
    setFullscreenImg(imgUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImg(null);
    document.body.style.overflow = 'auto';
  };

  const handleTickerClick = (selectedTicker) => {
    setTicker(selectedTicker);
    setShowTickers(false);
  };

  return (
    <div className="min-vh-100" style={{
      backgroundImage: `linear-gradient(rgba(10, 14, 23, 0.9), rgba(10, 14, 23, 0.9)), url(${backgroundImageReg})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      padding: '2rem 0'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="card border-0 shadow-lg" style={{
          transform: 'perspective(1000px) rotateY(0deg) rotateX(5deg)',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'rgba(20, 25, 40, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 195, 255, 0.2)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)'
        }}>
          <div className="card-body p-4 p-md-5">
            {/* Dashboard Header */}
            <div className="text-center mb-5">
              <h2 className="fw-bold" style={{
                background: 'linear-gradient(90deg, #00c3ff, #ffff1c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 15px rgba(0, 195, 255, 0.5)',
                fontSize: '2.5rem'
              }}>
                Stock Prediction Dashboard
              </h2>
              <p className="text1">AI-powered stock market forecasting</p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mb-5">
              <div className="input-group input-group-lg mb-3" style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-control border-dark text-light"
                  placeholder="Enter stock ticker (e.g. AAPL, MSFT)"
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  required
                  value={ticker}
                  style={{
                    background: 'rgba(180, 120, 120, 0.3)',
                    border: '1px solid rgba(185, 219, 229, 0.3)',
                    borderRadius: '12px',
                    height: '55px'
                  }}
                />
                <button 
                  type="button" 
                  className="btn btn-outline-info"
                  onClick={() => setShowTickers(!showTickers)}
                  style={{
                    position: 'absolute',
                    right: '180px',
                    height: '55px',
                    borderRadius:'12px',
                    zIndex: 5,
                  }}
                >
                  Popular Stocks
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary fw-bold px-4"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(145deg, #00c3ff, #0084b6)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 5px 15px rgba(0, 195, 255, 0.3)',
                    height: '55px',
                    minWidth: '180px'
                  }}
                >
                  {loading ? (
                    <span><FontAwesomeIcon icon={faSpinner} spin /> Analyzing...</span>
                  ) : (
                    <span><i className="bi bi-graph-up me-2"></i> Predict</span>
                  )}
                </button>
              </div>

              {showTickers && (
                <div className="card mb-3" style={{
                  background: 'rgba(10, 15, 30, 0.9)',
                  border: '1px solid rgba(0, 195, 255, 0.3)',
                  borderRadius: '12px'
                }}>
                  <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                      <li className="nav-item">
                        <button 
                          className={`nav-link ${activeTab === 'global' ? 'active' : ''}`}
                          onClick={() => setActiveTab('global')}
                        >
                          <FontAwesomeIcon icon={faGlobe} className="me-2" />
                          Global Stocks
                        </button>
                      </li>
                      <li className="nav-item">
                        <button 
                          className={`nav-link ${activeTab === 'indian' ? 'active' : ''}`}
                          onClick={() => setActiveTab('indian')}
                        >
                          <FontAwesomeIcon icon={faFlag} className="me-2" />
                          Indian Stocks
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="d-flex flex-wrap gap-2">
                      {(activeTab === 'global' ? globalTickers : indianTrendingTickers).map((tickerItem) => (
                        <button
                          key={tickerItem}
                          type="button"
                          className={`btn btn-sm ${ticker === tickerItem ? 'btn-info' : 'btn-outline-info'}`}
                          onClick={() => handleTickerClick(tickerItem)}
                        >
                          {tickerItem}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-2" style={{
                  background: 'rgba(255, 65, 108, 0.2)',
                  border: '1px solid rgba(255, 65, 108, 0.5)',
                  borderRadius: '8px'
                }}>
                  {error}
                </div>
              )}
            </form>

            {/* Results Section */}
            {candlestickChart && (
              <div className="row mb-5">         
                <div className="col-md-8">
                  <div className="card bg-transparent border-secondary mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center" style={{
                      background: 'rgba(0, 195, 255, 0.1)',
                      borderBottom: '1px solid rgba(0, 195, 255, 0.3)'
                    }}>
                      <h4 className="mb-0 text-light">Candlestick Chart</h4>
                      <button 
                        onClick={() => openFullscreen(candlestickChart)}
                        className="btn btn-sm btn-outline-info"
                      >
                        <FontAwesomeIcon icon={faExpand} />
                      </button>
                    </div>
                    <div className="card-body p-0">
                      <img 
                        src={candlestickChart} 
                        alt="Candlestick Chart" 
                        className="img-fluid w-100" 
                        style={{ borderRadius: '0 0 8px 8px' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-transparent border-secondary h-100">
                    <div className="card-header" style={{
                      background: 'rgba(0, 195, 255, 0.1)',
                      borderBottom: '1px solid rgba(0, 195, 255, 0.3)'
                    }}>
                      <h4 className="mb-0 text-light">Next Day Prediction</h4>
                    </div>
                    <div className="card-body text-light">
                      <p><strong>Date:</strong> {predictedDate}</p>
                      <p><strong>Predicted Open Price:</strong> ${predictedOpen}</p>
                      <p><strong>Predicted High Price:</strong> ${predictedHigh}</p>
                      <p><strong>Predicted Close Price:</strong> ${predictedClose}</p>
                      <p><strong>Predicted Low Price:</strong> ${predictedLow}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {prediction && (
              <div className="prediction-results">
                <div className="row">
                  {plot && (
                    <div className="col-md-6 mb-4">
                      <div className="card bg-transparent border-secondary h-100">
                        <div className="card-header d-flex justify-content-between align-items-center" style={{
                          background: 'rgba(0, 195, 255, 0.1)',
                          borderBottom: '1px solid rgba(0, 195, 255, 0.3)'
                        }}>
                          <h5 className="mb-0 text-light">Price History</h5>
                          <button 
                            onClick={() => openFullscreen(plot)}
                            className="btn btn-sm btn-outline-info"
                          >
                            <FontAwesomeIcon icon={faExpand} />
                          </button>
                        </div>
                        <div className="card-body p-0">
                          <img 
                            src={plot} 
                            alt="Price History" 
                            className="img-fluid w-100" 
                            style={{ borderRadius: '0 0 8px 8px' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {ma100 && (
                    <div className="col-md-6 mb-4">
                      <div className="card bg-transparent border-secondary h-100">
                        <div className="card-header d-flex justify-content-between align-items-center" style={{
                          background: 'rgba(0, 195, 255, 0.1)',
                          borderBottom: '1px solid rgba(0, 195, 255, 0.3)'
                        }}>
                          <h5 className="mb-0 text-light">100-Day Moving Average</h5>
                          <button 
                            onClick={() => openFullscreen(ma100)}
                            className="btn btn-sm btn-outline-info"
                          >
                            <FontAwesomeIcon icon={faExpand} />
                          </button>
                        </div>
                        <div className="card-body p-0">
                          <img 
                            src={ma100} 
                            alt="100-Day MA" 
                            className="img-fluid w-100" 
                            style={{ borderRadius: '0 0 8px 8px' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {ma200 && (
                    <div className="col-md-6 mb-4">
                      <div className="card bg-transparent border-secondary h-100">
                        <div className="card-header d-flex justify-content-between align-items-center" style={{
                          background: 'rgba(0, 195, 255, 0.1)',
                          borderBottom: '1px solid rgba(0, 195, 255, 0.3)'
                        }}>
                          <h5 className="mb-0 text-light">200-Day Moving Average</h5>
                          <button 
                            onClick={() => openFullscreen(ma200)}
                            className="btn btn-sm btn-outline-info"
                          >
                            <FontAwesomeIcon icon={faExpand} />
                          </button>
                        </div>
                        <div className="card-body p-0">
                          <img 
                            src={ma200} 
                            alt="200-Day MA" 
                            className="img-fluid w-100" 
                            style={{ borderRadius: '0 0 8px 8px' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {prediction && (
                    <div className="col-md-6 mb-4">
                      <div className="card bg-transparent border-secondary h-100">
                        <div className="card-header d-flex justify-content-between align-items-center" style={{
                          background: 'rgba(0, 195, 255, 0.1)',
                          borderBottom: '1px solid rgba(0, 195, 255, 0.3)'
                        }}>
                          <h5 className="mb-0 text-light">Price Prediction</h5>
                          <button 
                            onClick={() => openFullscreen(prediction)}
                            className="btn btn-sm btn-outline-info"
                          >
                            <FontAwesomeIcon icon={faExpand} />
                          </button>
                        </div>
                        <div className="card-body p-0">
                          <img 
                            src={prediction} 
                            alt="Price Prediction" 
                            className="img-fluid w-100" 
                            style={{ borderRadius: '0 0 8px 8px' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="card bg-transparent border-secondary mb-4">
                      <div className="card-header" style={{
                        background: 'rgba(0, 195, 255, 0.1)',
                        borderBottom: '1px solid rgba(0, 195, 255, 0.3)'
                      }}>
                        <h5 className="mb-0 text-light">Model Evaluation</h5>
                      </div>
                      <div className="card-body text-light">
                        <p><strong>Mean Square Error (MSE):</strong> {mse}</p>
                        <p><strong>Root Mean Square Error (RMSE):</strong> {rmse}</p>
                        <p><strong>R-Square (R2):</strong> {r2}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImg && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <button 
            onClick={closeFullscreen}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer'
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <img 
            src={fullscreenImg} 
            style={{ 
              maxHeight: '90%', 
              maxWidth: '90%',
              objectFit: 'contain'
            }} 
            alt="Fullscreen preview" 
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;