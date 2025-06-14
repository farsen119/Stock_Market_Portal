import React from 'react'
import Button from './Button'

const About = () => {
  return (
    <section className="py-5 position-relative">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="pe-lg-5">
              <h2 className="fw-bold mb-4" style={{
                background: 'linear-gradient(90deg, #00c3ff, #ffff1c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 10px rgba(0,195,255,0.3)'
              }}>About <span>StockPredict</span></h2>
              <div className="mb-4 p-4 rounded-3" style={{
                transform: 'perspective(100px) rotateX(5deg)',
                background: 'rgba(20, 25, 40, 0.7)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                borderLeft: `3px solid #00c3ff`
              }}>
                <p className="lead mb-0" style={{ color: '#ffffff' }}>
                  We combine deep learning with financial insights to predict stock prices using advanced LSTM models.
                </p>
              </div>
              <p className="mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Our platform leverages historical market data, technical indicators, and advanced time series models to analyze patterns in stock price movements.
              </p>
              <Button 
                text={<><i className="bi bi-arrow-right-circle me-2"></i> Learn More</>}
                class="fw-bold px-4 py-3"
                url="/login"
                style={{
                  background: 'linear-gradient(145deg, #00c3ff, #0084b6)',
                  border: 'none',
                  boxShadow: '0 10px 20px rgba(0,195,255,0.3)',
                  transform: 'perspective(50px) rotateX(5deg)'
                }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative" style={{ perspective: '1000px' }}>
              <a href="https://sg.finance.yahoo.com/markets/">
              <div className="rounded-4 overflow-hidden" style={{
                transform: 'rotateY(-15deg) rotateX(5deg)',
                border: '2px solid rgba(0,195,255,0.3)',
                boxShadow: '20px 20px 50px rgba(0,0,0,0.5)',
                background: 'linear-gradient(145deg, rgba(0,195,255,0.1), rgba(10, 14, 23, 0.7))'
              }}>
                <div className="ratio ratio-16x9">
                  <div className="d-flex align-items-center justify-content-center" style={{
                    color: '#00c3ff',
                    fontSize: '5rem',
                   backgroundImage:'url("https://airel.ch/wp-content/uploads/2022/01/yahoo1.png")',
                  }}>
                    <i className="bi bi-people-fill"></i>
                  </div>
                </div>
              </div>
              </a>
              <div className="position-absolute bottom-0 start-0 translate-middle-y ms-4 p-3 rounded-3" style={{
                width: '60%',
                transform: 'perspective(100px) rotateX(5deg) rotateY(10deg)',
                background: 'rgba(20, 25, 40, 0.9)',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                border: '1px solid rgba(0,195,255,0.3)'
              }}>
                <h5 className="mb-2" style={{ color: '#00c3ff' }}>More Details About Stocks</h5>
                <p className="small mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>We fetch historical stock data directly from Yahoo Finance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
