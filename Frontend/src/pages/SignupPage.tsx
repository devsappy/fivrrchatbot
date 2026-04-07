import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';
import { useAuth } from '../context/AuthContext';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const response = await signup(firstName, lastName, email, password);
      if (response.authenticated) {
        navigate('/dashboard');
        return;
      }

      setSuccessMessage(response.message);
      navigate('/login', { replace: true, state: { signupMessage: response.message } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] flex items-stretch p-4 lg:p-8 font-sans w-full">
      <div className="w-full flex gap-8 lg:gap-16">
        <div className="hidden lg:flex flex-col justify-between w-1/2 relative rounded-[32px] overflow-hidden p-12 text-white shadow-2xl bg-black min-h-[70vh]">
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={8}
              iterationsPoisson={8}
              resolution={0.25}
              isBounce={false}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>

          <div className="relative z-20 flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Chatterify Logo" className="h-8 w-auto object-contain brightness-0 invert" />
              <span className="logo-rubik text-xl tracking-wide uppercase font-semibold mt-1">Chatterify</span>
            </div>
            <Link to="/" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300">
              Back to website &rarr;
            </Link>
          </div>

          <div className="relative z-20 mb-4 px-2">
            <h2 className="text-4xl xl:text-[48px] font-bold tracking-tight leading-[1.2] mb-12">
              Empowering Business,
              <br />
              Transforming Workflows.
            </h2>

            <div className="flex gap-2">
              <div className="w-8 h-1 bg-white rounded-full"></div>
              <div className="w-8 h-1 bg-white/30 rounded-full"></div>
              <div className="w-8 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-10 lg:px-12 xl:px-24 text-gray-900 py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="flex lg:hidden items-center gap-3 mb-8">
              <img src="/logo.png" alt="Chatterify Logo" className="h-8 w-auto object-contain" />
              <span className="logo-rubik text-xl tracking-wide uppercase font-semibold mt-1">Chatterify</span>
            </div>

            <h1 className="text-4xl lg:text-[42px] font-bold mb-3 tracking-tight">Create an account</h1>
            <p className="text-gray-500 mb-10 text-[15px] font-medium">
              Already have an account? <Link to="/login" className="text-[#5227FF] hover:text-[#3C1BA8] transition-colors font-bold underline decoration-2 underline-offset-4">Log in</Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="First name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:border-[#5227FF] focus:ring-1 focus:ring-[#5227FF] transition-all placeholder:text-gray-400 font-medium shadow-sm"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:border-[#5227FF] focus:ring-1 focus:ring-[#5227FF] transition-all placeholder:text-gray-400 font-medium shadow-sm"
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:border-[#5227FF] focus:ring-1 focus:ring-[#5227FF] transition-all placeholder:text-gray-400 font-medium shadow-sm"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:border-[#5227FF] focus:ring-1 focus:ring-[#5227FF] transition-all placeholder:text-gray-400 font-medium shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>

              {error && (
                <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              {successMessage && (
                <p className="text-sm font-medium text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                  {successMessage}
                </p>
              )}

              <div className="flex items-center pt-1 pb-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 rounded border-gray-300 text-[#5227FF] focus:ring-[#5227FF] cursor-pointer"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600 font-medium cursor-pointer select-none">
                  I agree to the <span className="underline">Terms &amp; Conditions</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-500 text-white font-bold text-[15px] py-4 rounded-xl mt-2 transition-all shadow-md active:scale-[0.98]"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
