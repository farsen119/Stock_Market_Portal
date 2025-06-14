import React from 'react'

const Features = () => {
  const features = [
    {
      icon: 'bi-lightning-charge-fill',
      title: 'Real-time Analysis',
      desc: 'Process live market data with our advanced algorithms for up-to-the-minute insights.',
      color: '#00c3ff'
    },
    {
      icon: 'bi-robot',
      title: 'AI Predictions',
      desc: 'Our LSTM models analyze historical patterns to forecast future price movements.',
      color: '#ffff1c'
    },
    {
      icon: 'bi-bar-chart-line-fill',
      title: 'Visual Analytics',
      desc: 'Interactive charts and graphs to help you understand market trends at a glance.',
      color: '#ff416c'
    }
  ]

  return (
    <section className="py-5 position-relative" id="features">
      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold" style={{
          background: 'linear-gradient(90deg, #00c3ff, #ffff1c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 10px rgba(0,195,255,0.3)'
        }}>Advanced <span>Features</span></h2>
        
        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 border-0" style={{
                transform: 'perspective(200px) rotateX(5deg)',
                borderRadius: '15px',
                overflow: 'hidden',
                background: 'rgba(20, 25, 40, 0.7)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                borderTop: `3px solid ${feature.color}`
              }}>
                <div className="card-body p-4 text-center">
                  <div className="icon-xl rounded-circle mb-4 mx-auto d-flex align-items-center justify-content-center" style={{
                    width: '80px',
                    height: '80px',
                    fontSize: '2rem',
                    background: `rgba(${feature.color === '#00c3ff' ? '0,195,255' : feature.color === '#ffff1c' ? '255,255,28' : '255,65,108'}, 0.1)`,
                    boxShadow: `0 0 0 2px ${feature.color}`,
                    color: feature.color
                  }}>
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <h3 className="h4 fw-bold mb-3" style={{ color: '#ffffff' }}>{feature.title}</h3>
                  <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
