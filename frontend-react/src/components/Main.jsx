import React from 'react'
import Button from './Button'
import Features from './Features'
import About from './About'
import { Element } from 'react-scroll' 
import backgroundImage from '../assets/stock.jpg'; 



const Main = () => {
  return (
    <>
      <main
        style={{
          backgroundImage:
            `linear-gradient(rgba(10, 14, 23, 0.9), rgba(10, 14, 23, 0.9)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          minHeight: '100vh',
          color: '#ffffff',
        }}
      >
        {/* Hero Section */}
        <Element name="home">
          <section className="py-5 position-relative overflow-hidden">
            <div className="container py-5 position-relative z-1">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <h1
                    className="display-3 fw-bold mb-4"
                    style={{
                      textShadow: '0 0 15px rgba(0,195,255,0.5)',
                      background: 'linear-gradient(90deg, #00c3ff, #ffff1c)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      transform: 'perspective(100px) rotateX(5deg)',
                    }}
                  >
                    Intelligent<br />
                    Stock Market<br />
                    Predictions
                  </h1>
                  <p
                    className="lead mb-4"
                    style={{
                      fontSize: '1.25rem',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    Predict tomorrow’s market trends using cutting-edge LSTM time-series models.
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <Button
                      text={
                        <>
                          <i className="bi bi-rocket me-2"></i> Get Started
                        </>
                      }
                      class="fw-bold px-4 py-3"
                      url="/dashboard"
                      style={{
                        background: 'linear-gradient(145deg, #00c3ff, #0084b6)',
                        border: 'none',
                        boxShadow: '0 10px 20px rgba(0,195,255,0.3)',
                        transform: 'perspective(50px) rotateX(5deg)',
                      }}
                    />
                    <Button
                      text={
                        <>
                          <i className="bi bi-play-circle me-2"></i> Watch Demo
                        </>
                      }
                      class="fw-bold px-4 py-3"
                      url="/"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(0,195,255,0.5)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                        transform: 'perspective(50px) rotateX(5deg)',
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-6 position-relative">
                  <div
                    className="position-relative"
                    style={{
                      transform: 'perspective(500px) rotateY(-10deg) rotateX(5deg)',
                      boxShadow: '20px 20px 50px rgba(0,0,0,0.5)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      border: '2px solid rgba(0,195,255,0.3)',
                    }}
                  >
                    <div
                      className="ratio ratio-16x9"
                      style={{
                        background:
                          'linear-gradient(145deg, rgba(0,195,255,0.1), rgba(10, 14, 23, 0.7))',
                        backgroundImage:
                          'url("https://assets.finbold.com/uploads/2024/06/price-chart-of-AAPL-4.png")',
                        backgroundSize: 'cover',
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          color: '#00c3ff',
                          fontSize: '5rem',
                        }}
                      >
                        <i className="bi bi-graph-up-arrow"></i>
                      </div>
                    </div>
                    <div
                      className="position-absolute bottom-0 start-0 end-0 p-3"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-light">AAPL</span>
                        <span
                          className="badge"
                          style={{
                            background: 'linear-gradient(145deg, #00c3ff, #0084b6)',
                          }}
                        >
                          +2.4%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Element>

        {/* Features Section */}
        <Element name="features">
          <Features />
        </Element>

        {/* About Section */}
        <Element name="about">
          <About />
        </Element>
      </main>
    </>
  )
}

export default Main
