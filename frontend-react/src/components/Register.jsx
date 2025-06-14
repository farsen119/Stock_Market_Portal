import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegistration = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setSuccess(false)

    const userData = { username, email, password }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
      console.log('response.data=>', response.data)
      console.log('reg successfull')
      setSuccess(true)
    } catch(error) {
      setErrors(error.response.data)
      console.error('registration error:', error.response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex align-items-center min-vh-100" style={{
      backgroundImage: 'linear-gradient(rgba(10, 14, 23, 0.9), rgba(10, 14, 23, 0.9)), url("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
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
                    Create Account
                  </h3>
                  <p className="text-muted">Join us today</p>
                </div>

                {success && (
                  <div className="alert alert-success" style={{
                    background: 'rgba(40, 167, 69, 0.2)',
                    border: '1px solid rgba(40, 167, 69, 0.5)',
                    color: '#28a745'
                  }}>
                    Registration successful! You can now login.
                  </div>
                )}

                <form onSubmit={handleRegistration}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-light">Username</label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      placeholder="Choose a username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: `1px solid ${errors.username ? 'rgba(255, 65, 108, 0.5)' : 'rgba(0, 195, 255, 0.3)'}`,
                        borderRadius: '8px',
                        height: '45px',
                        color: '#ffffff'
                      }}
                    />
                    {errors.username && (
                      <div className="invalid-feedback d-block" style={{ color: '#ff416c' }}>
                        {errors.username}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-light">Email Address</label>
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Your email address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: `1px solid ${errors.email ? 'rgba(255, 65, 108, 0.5)' : 'rgba(0, 195, 255, 0.3)'}`,
                        borderRadius: '8px',
                        height: '45px',
                        color: '#ffffff'
                      }}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block" style={{ color: '#ff416c' }}>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-light">Password</label>
                    <input 
                      type="password" 
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Create a password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: `1px solid ${errors.password ? 'rgba(255, 65, 108, 0.5)' : 'rgba(0, 195, 255, 0.3)'}`,
                        borderRadius: '8px',
                        height: '45px',
                        color: '#ffffff'
                      }}
                    />
                    {errors.password && (
                      <div className="invalid-feedback d-block" style={{ color: '#ff416c' }}>
                        {errors.password}
                      </div>
                    )}
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
                        Creating Account...
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
                        Register
                      </button>
                    )}
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account?{' '}
                    <a 
                      href="/login" 
                      className="text-decoration-none"
                      style={{ color: '#00c3ff' }}
                    >
                      Sign in
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

export default Register