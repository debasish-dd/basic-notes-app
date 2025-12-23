import React, { useState } from 'react'
import { useStore } from '../store/Store'

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' | 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeTerms: false
  })

  const themeColor = useStore((s) => s.themeColor)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }
    console.log('Login:', formData)
    alert('Login functionality would be implemented here!')
    setShowAuthModal(false)
  }

  const handleSignup = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions')
      return
    }
    console.log('Signup:', formData)
    alert('Signup functionality would be implemented here!')
    setShowAuthModal(false)
  }

  const openAuthModal = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
    setFormData({
      name: '',
      email: '',
      password: '',
      rememberMe: false,
      agreeTerms: false
    })
  }

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`min-h-screen ${themeColor ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 min-h-screen">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>

        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-2xl">
                ✓
              </div>
              <span className="text-white text-2xl font-bold">TaskFlow</span>
            </div>
            <button 
              onClick={() => openAuthModal('login')}
              className="bg-white bg-opacity-20 backdrop-blur-sm text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 border border-white border-opacity-30"
            >
              Sign In
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Organize Your Life,<br />
                <span className="text-yellow-300">One Task at a Time</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                A beautiful, intuitive todo app that helps you stay productive and focused. Manage tasks effortlessly with our clean interface.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => openAuthModal('signup')}
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 hover:text-purple-900 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Get Started Free
                </button>
                <button 
                  onClick={scrollToFeatures}
                  className="bg-white bg-opacity-20 backdrop-blur-sm text-orange-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 border border-white border-opacity-30"
                >
                  Learn More
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-purple-100">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span>Lightning Fast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🔒</span>
                  <span>100% Secure</span>
                </div>
              </div>
            </div>

            {/* Right Content - Floating Todo Card */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Today's Tasks</h3>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">3 left</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-gray-500 line-through">Morning workout</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                    <span className="text-gray-800 font-medium">Finish project proposal</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                    <span className="text-gray-800 font-medium">Team meeting at 3pm</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                    <span className="text-gray-800 font-medium">Review code changes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className={`py-20 ${themeColor ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${themeColor ? 'text-white' : 'text-gray-800'}`}>
              Why Choose TaskFlow?
            </h2>
            <p className={`text-xl ${themeColor ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to stay organized and productive
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎨', title: 'Beautiful Design', desc: 'Clean, modern interface with light and dark themes. Your todos never looked this good.', color: 'purple' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'No lag, no waiting. Add, edit, and complete tasks instantly with our optimized performance.', color: 'blue' },
              { icon: '💾', title: 'Auto Save', desc: 'Never lose your tasks. Everything is automatically saved locally and synced across devices.', color: 'green' },
              { icon: '📱', title: 'Responsive', desc: 'Works perfectly on desktop, tablet, and mobile. Manage your tasks anywhere, anytime.', color: 'yellow' },
              { icon: '🔍', title: 'Easy Search', desc: 'Find any task instantly with powerful search and filtering capabilities.', color: 'pink' },
              { icon: '🎯', title: 'Stay Focused', desc: 'Distraction-free interface helps you focus on what matters most.', color: 'indigo' }
            ].map((feature, i) => (
              <div 
                key={i}
                className={`p-8 rounded-2xl ${
                  themeColor 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gradient-to-br from-purple-50 to-indigo-100'
                } hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className={`w-16 h-16 ${
                  feature.color === 'purple' ? 'bg-purple-600' :
                  feature.color === 'blue' ? 'bg-blue-600' :
                  feature.color === 'green' ? 'bg-green-600' :
                  feature.color === 'yellow' ? 'bg-yellow-600' :
                  feature.color === 'pink' ? 'bg-pink-600' :
                  'bg-indigo-600'
                } rounded-xl flex items-center justify-center text-3xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${themeColor ? 'text-white' : 'text-gray-800'}`}>
                  {feature.title}
                </h3>
                <p className={themeColor ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who trust TaskFlow with their daily tasks
          </p>
          <button 
            onClick={() => openAuthModal('signup')}
            className="bg-white text-purple-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 hover:text-purple-900 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Start For Free Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-12 ${themeColor ? 'bg-gray-950' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-xl">
              ✓
            </div>
            <span className="text-white text-xl font-bold">TaskFlow</span>
          </div>
          <p className="text-gray-400 mb-4">© 2024 TaskFlow. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <button className="hover:text-white transition-colors">Privacy</button>
            <button className="hover:text-white transition-colors">Terms</button>
            <button className="hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAuthModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none"
            >
              ×
            </button>

            {/* Login Form */}
            {authMode === 'login' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-gray-600 mb-6">Sign in to access your tasks</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors" 
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors" 
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <button className="text-purple-600 hover:text-purple-700 font-semibold">Forgot password?</button>
                  </div>
                  <button 
                    onClick={handleLogin}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors"
                  >
                    Sign In
                  </button>
                </div>
                
                <div className="mt-6 text-center text-gray-600">
                  Don't have an account? 
                  <button 
                    onClick={() => setAuthMode('signup')} 
                    className="text-purple-600 hover:text-purple-700 font-semibold ml-1"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            )}

            {/* Signup Form */}
            {authMode === 'signup' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                <p className="text-gray-600 mb-6">Start organizing your tasks today</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors" 
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors" 
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="mt-1 mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the <button className="text-purple-600 hover:text-purple-700 font-semibold">Terms of Service</button> and <button className="text-purple-600 hover:text-purple-700 font-semibold">Privacy Policy</button>
                    </span>
                  </div>
                  <button 
                    onClick={handleSignup}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
                
                <div className="mt-6 text-center text-gray-600">
                  Already have an account? 
                  <button 
                    onClick={() => setAuthMode('login')} 
                    className="text-purple-600 hover:text-purple-700 font-semibold ml-1"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}