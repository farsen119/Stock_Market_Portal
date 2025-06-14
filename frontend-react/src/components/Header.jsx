import React, { useContext } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

const Header = () => {
  const {isLoggedIn, setisLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setisLoggedIn(false)
    console.log('logout')
    navigate('/login')
  }

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark" style={{
        background: 'rgba(10, 14, 23, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/" style={{
            textShadow: '0 0 10px rgba(0,195,255,0.5)',
            background: 'linear-gradient(90deg, #00c3ff, #ffff1c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            <i className="bi bi-graph-up me-2"></i>STOCKPREDICT
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item mx-1">
                <Link className="nav-link px-3 py-2" to="/" style={{
                  borderRadius: '6px',
                  background: 'linear-gradient(145deg, rgba(0,195,255,0.1), transparent)',
                  boxShadow: 'inset 0 0 15px rgba(0,195,255,0.1)'
                }}>
                  <i className="bi bi-house-door-fill me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link px-3 py-2" to="/" style={{
                  borderRadius: '6px',
                  background: 'linear-gradient(145deg, rgba(0,195,255,0.1), transparent)',
                  boxShadow: 'inset 0 0 15px rgba(0,195,255,0.1)'
                }}>
                  <i className="bi bi-stars me-1"></i> Features
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link px-3 py-2" to="/" style={{
                  borderRadius: '6px',
                  background: 'linear-gradient(145deg, rgba(0,195,255,0.1), transparent)',
                  boxShadow: 'inset 0 0 15px rgba(0,195,255,0.1)'
                }}>
                  <i className="bi bi-people-fill me-1"></i> About
                </Link>
              </li>
            </ul>
            
            <div className="d-flex">
              {isLoggedIn ? (
                <>
                  <Button 
                    text={<><i className="bi bi-speedometer2 me-1"></i> Dashboard</>} 
                    class="me-2 fw-bold"
                    url="/dashboard"
                    style={{
                      background: 'linear-gradient(145deg, #00c3ff, #0084b6)',
                      border: 'none',
                      boxShadow: '0 5px 15px rgba(0,195,255,0.3)',
                      transform: 'perspective(50px) rotateX(5deg)'
                    }}
                  />
                  <button 
                    className="btn fw-bold" 
                    onClick={handleLogout}
                    style={{
                      background: 'linear-gradient(145deg, #ff416c, #ff4b2b)',
                      border: 'none',
                      boxShadow: '0 5px 15px rgba(255,75,43,0.3)',
                      transform: 'perspective(50px) rotateX(5deg)'
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </>
              ) : (
                <>
                  <Button 
                    text={<><i className="bi bi-box-arrow-in-right me-1"></i> Login</>} 
                    class="me-2 fw-bold" 
                    url="/login"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(0,195,255,0.5)',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                      transform: 'perspective(50px) rotateX(5deg)'
                    }}
                  />
                  <Button 
                    text={<><i className="bi bi-person-plus me-1"></i> Register</>} 
                    class="fw-bold" 
                    url="/register"
                    style={{
                      background: 'linear-gradient(145deg, #00c3ff, #0084b6)',
                      border: 'none',
                      boxShadow: '0 5px 15px rgba(0,195,255,0.3)',
                      transform: 'perspective(50px) rotateX(5deg)'
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header