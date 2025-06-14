import React, { useContext, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
import backgroundImageLogin from '../assets/loginstock.jpg'; 



const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const {isLoggedIn, setisLoggedIn} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError('')

    const userData = {username, password}
    console.log('user data==>', userData)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      console.log("login success")
      setisLoggedIn(true)
      navigate('/dashboard')
    } catch(error) {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="d-flex align-items-center min-vh-100" style={{
      backgroundImage: `linear-gradient(rgba(10, 14, 23, 0.9), rgba(10, 14, 23, 0.9)), url(${backgroundImageLogin})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center'
    }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg" style={{
              transform: 'perspective(500px) rotateY(0deg) rotateX(10deg)',
              borderRadius: '15px',
              overflow: 'hidden',
              background: 'rgba(20, 25, 40, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 195, 255, 0.2)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
            }}>
              <div className="card-body p-4 p-sm-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold" style={{
                    background: 'linear-gradient(90deg, #00c3ff, #ffff1c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 10px rgba(0, 195, 255, 0.3)'
                  }}>
                    Welcome Back
                  </h3>
                  <p className="textlogin">Sign in to continue</p>
                </div>

                {error && (
                  <div className="alert alert-danger" style={{
                    background: 'rgba(255, 65, 108, 0.2)',
                    border: '1px solid rgba(255, 65, 108, 0.5)',
                    color: '#ff416c'
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label text-light">Username</label>
                    <input 
                      type="text" 
                      className="form-control bg-dark border-dark text-light" 
                      placeholder="Enter your username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 195, 255, 0.3)',
                        borderRadius: '8px',
                        height: '45px'
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-light">Password</label>
                    <input 
                      type="password" 
                      className="form-control bg-dark border-dark text-light" 
                      placeholder="Enter your password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 195, 255, 0.3)',
                        borderRadius: '8px',
                        height: '45px'
                      }}
                    />
                  </div>

                  <div className="d-grid">
                    {loading ? (
                      <button 
                        type="submit" 
                        className="btn btn-primary fw-bold py-2" 
                        disabled
                        style={{
                          background: 'linear-gradient(145deg, #00c3ff, #0084b6)',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 5px 15px rgba(0, 195, 255, 0.3)',
                          height: '45px'
                        }}
                      >
                        <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                        Authenticating...
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        className="btn btn-primary fw-bold py-2"
                        style={{
                          background: 'linear-gradient(145deg, #00c3ff, #0084b6)',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 5px 15px rgba(0, 195, 255, 0.3)',
                          height: '45px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Login
                      </button>
                    )}
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="textlogin">
                    Don't have an account?{' '}
                    <a 
                      href="/register" 
                      className="text-decoration-none"
                      style={{ color: '#00c3ff' }}
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login