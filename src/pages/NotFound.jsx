import { StarBackground } from "@/components/StarBackground";
import { ThemeToggle } from "@/components/ThemeToggle";

export const NotFound = () => {
    const handleGoHome = () => {
        // Navigate to home page - adjust this based on your routing setup
        window.location.href = '/';
        // Or if using React Router: navigate('/');
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Background Effects */}
            <StarBackground />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
            
            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Side - Content */}
                    <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
                        {/* 404 Number */}
                        <div className="space-y-4">
                            <h1 className="text-8xl md:text-9xl font-bold text-glow animate-pulse-subtle">
                                404
                            </h1>
                            <div className="h-1 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto lg:mx-0"></div>
                        </div>
                        
                        {/* Error Message */}
                        <div className="space-y-4 animate-fade-in-delay-1 opacity-0">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Page Not Found
                            </h2>
                            <p className="text-lg text-foreground/70 max-w-md mx-auto lg:mx-0">
                                Oops! The page you're looking for seems to have vanished into the digital void. 
                                Don't worry, even the best developers encounter mysterious disappearances.
                            </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-delay-2 opacity-0">
                            <button
                                onClick={handleGoHome}
                                className="cosmic-button flex items-center gap-2 justify-center group cursor-pointer"
                            >
                                <svg 
                                    className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Go Back
                            </button>
                            
                            {/* <button
                                onClick={() => window.history.back()}
                                className="px-6 py-2 rounded-full border border-primary/30 text-foreground font-medium 
                                         transition-all duration-300 hover:border-primary hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]
                                         hover:scale-105 active:scale-95"
                            >
                                Go Back
                            </button> */}
                        </div>
                        
                        {/* Additional Info */}
                        <div className="text-sm text-foreground/50 animate-fade-in-delay-3 opacity-0">
                            Error Code: 404 • Page Not Found
                        </div>
                    </div>
                    
                    {/* Right Side - Image */}
                    <div className="order-1 lg:order-2 animate-fade-in opacity-0">
                        <div className="relative">
                            {/* Glowing border effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl"></div>
                            
                            {/* Image container */}
                            <div className="relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 card-hover">
                                <img
                                    src="/404.jpg"
                                    alt="404 Error - Developer at computer with purple ambient lighting"
                                    className="w-full h-auto rounded-xl shadow-2xl"
                                    style={{
                                        filter: 'drop-shadow(0 20px 40px rgba(139, 92, 246, 0.3))'
                                    }}
                                />
                                
                                {/* Floating elements */}
                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-float"></div>
                                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute top-1/2 -left-8 w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                            <div className="absolute top-1/2 -right-8 w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            
            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
            <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-primary/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-primary/50 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        </div>
    );
};