// src/pages/Login/Login.jsx
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from 'features/auth/authSlice'
import { useLoginMutation } from 'features/auth/authApiSlice'
import RoleBadges from './RoleBadges'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [activeRole, setActiveRole] = useState(null)
  const [login] = useLoginMutation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRoleSelect = (role, credentials) => {
    if (activeRole === role) {
      setActiveRole(null)
      setFormData({ email: '', password: '' })
    } else {
      setActiveRole(role)
      setFormData(credentials)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await login(formData)
      if (result.data) {
        dispatch(setCredentials(result.data))
        navigate('/home')
      }
      if (result.error) {
        toast.error(result.error.data?.message || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      toast.error('Unexpected error occurred', { id: 'login' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-5 lg:px-0 md:mt-12 flex-1">
      <div className="w-full max-w-[570px] bg-[var(--menu-bg)] mx-auto rounded-lg shadow-md mt:pt-10">
        <div className="p-10">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-8">
            Hello <span className="text-primaryColor">Welcome</span> Back
          </h3>

          {/* Role Badges */}
          <RoleBadges activeRole={activeRole} onSelect={handleRoleSelect} />

          <form onSubmit={handleLogin} className="pt-2 md:py-0">
            <div className="mb-5">
              <input
                type="email"
                name="email"
                required
                onChange={handleInputChange}
                value={formData.email}
                placeholder="Your email"
                className="border-b border-[#0066ff61] border-solid w-full py-2 text-[16px] leading-7 placeholder:text-textColor outline-none focus:border-primaryColor"
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                name="password"
                required
                onChange={handleInputChange}
                value={formData.password}
                placeholder="Your password"
                className="border-b border-[#0066ff61] border-solid w-full py-2 text-[16px] leading-7 placeholder:text-textColor outline-none focus:border-primaryColor"
              />
            </div>

            <button className="button bg-[var(--primary-color)] items-center justify-center text-[var(--my-color)] text-[18px] w-full rounded-md">
              {loading ? (
                <div className="flex items-start gap-6 justify-center">
                  <HashLoader size={30} color="#ffffff" /> Log In
                </div>
              ) : (
                'Log In'
              )}
            </button>

            <div className="flex items-center justify-between pt-3">
              <hr className="h-1 w-1/3 bg-irisBlueColor" />
              <span className="text-lg">or</span>
              <hr className="h-1 w-1/3 bg-irisBlueColor" />
            </div>
          </form>

          <p className="mt-3 text-center">
            Already haven't an account?{' '}
            <a href="/signup" className="text-primaryColor font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login