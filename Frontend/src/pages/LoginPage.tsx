import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock a submit for now
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#F5F2EA] flex items-stretch p-4 lg:p-8 font-sans w-full">
            <div className="w-full flex gap-8 lg:gap-16">
                
                <div className="hidden lg:flex flex-col justify-between w-1/2 relative rounded-[32px] overflow-hidden p-12 text-white shadow-2xl bg-black min-h-[70vh]">
                    {/* Liquid Ether Background from Website Theme */}
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
                    {/* Shadow overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
                    
                    {/* Top Header */}
                    <div className="relative z-20 flex justify-between items-center w-full">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Chatterify Logo" className="h-8 w-auto object-contain brightness-0 invert" />
                            <span className="logo-rubik text-xl tracking-wide uppercase font-semibold mt-1">Chatterify</span>
                        </div>
                        <Link to="/" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300">
                            Back to website &rarr;
                        </Link>
                    </div>

                    {/* Bottom Text */}
                    <div className="relative z-20 mb-4 px-2">
                        <h2 className="text-4xl xl:text-[48px] font-bold tracking-tight leading-[1.2] mb-12">
                            Empowering Business,<br/>Transforming Workflows.
                        </h2>
                        
                        {/* Pagination Dots */}
                        <div className="flex gap-2">
                            <div className="w-8 h-1 bg-white/30 hover:bg-white/50 cursor-pointer rounded-full transition-colors"></div>
                            <div className="w-8 h-1 bg-white/30 hover:bg-white/50 cursor-pointer rounded-full transition-colors"></div>
                            <div className="w-8 h-1 bg-white rounded-full"></div>
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
                        {/* Mobile Logo Fallback */}
                        <div className="flex lg:hidden items-center gap-3 mb-8">
                            <img src="/logo.png" alt="Chatterify Logo" className="h-8 w-auto object-contain" />
                            <span className="logo-rubik text-xl tracking-wide uppercase font-semibold mt-1">Chatterify</span>
                        </div>

                        <h1 className="text-4xl lg:text-[42px] font-bold mb-3 tracking-tight">Welcome back</h1>
                        <p className="text-gray-500 mb-10 text-[15px] font-medium">
                            Don't have an account? <Link to="/signup" className="text-[#5227FF] hover:text-[#3C1BA8] transition-colors font-bold underline decoration-2 underline-offset-4">Create an account</Link>
                        </p>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
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
                                    type={showPassword ? "text" : "password"}
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

                            <div className="flex items-center justify-between pt-1 pb-3">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id="remember" 
                                        className="w-4 h-4 rounded border-gray-300 text-[#5227FF] focus:ring-[#5227FF] cursor-pointer"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600 font-medium cursor-pointer select-none">Remember me for 30 days</label>
                                </div>
                                <a href="#" className="text-sm font-semibold text-[#5227FF] hover:text-[#3C1BA8] transition-colors">Forgot password?</a>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-black hover:bg-gray-800 text-white font-bold text-[15px] py-4 rounded-xl mt-2 transition-all shadow-md active:scale-[0.98]"
                            >
                                Log in
                            </button>
                        </form>
                        
                        <div className="flex items-center my-8">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="px-5 text-sm font-semibold text-gray-400">Or log in with</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 hover:border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm shadow-sm text-gray-700">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 hover:border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm shadow-sm text-gray-700">
                                <svg className="w-[18px] h-[22px]" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                                </svg>
                                Apple
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
