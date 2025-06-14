import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="mt-auto" style={{
      background: 'linear-gradient(to top, rgba(10, 14, 23, 0.95), rgba(10, 14, 23, 0.8))',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(0, 195, 255, 0.3)',
      padding: '2rem 0',
      boxShadow: '0 -5px 20px rgba(0, 195, 255, 0.1)'
    }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 text-center text-lg-start mb-4 mb-lg-0">
            <h5 className="mb-3" style={{
              background: 'linear-gradient(90deg, #00c3ff, #ffff1c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>
              StockPredict AI
            </h5>
            <p className="textfooter mb-0" style={{ fontSize: '0.9rem' }}>
              Advanced market predictions powered by machine learning
            </p>
          </div>
          
          <div className="col-lg-4 text-center mb-4 mb-lg-0">
            <div className="d-flex justify-content-center">
              <a 
                href="https://github.com/farsen119/Stock_Market_Portal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-info mx-2"
                style={{
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a 
                href="https://www.linkedin.com/in/farseen-kp-ab9816305/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-info mx-2"
                style={{
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a 
                href="" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-info mx-2"
                style={{
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
          
          <div className="col-lg-4 text-center text-lg-end">
            <p className="textfooter mb-1" style={{ fontSize: '0.85rem' }}>
              &copy; {new Date().getFullYear()} StockPredict AI
            </p>
            <p className="mb-0" style={{ 
              color: 'rgba(0, 195, 255, 0.8)',
              fontSize: '0.85rem'
            }}>
              Built with <FontAwesomeIcon icon={faHeart} className="text-danger" /> by Farseen KP
            </p>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <p className="textfooter2 small" style={{ opacity: 0.7 }}>
              Disclaimer: Predictions are for educational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;