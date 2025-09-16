import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react";

const navItems = [
    {name: "Home", href: "#hero"},
    {name: "About", href: "#about"},
    {name: "Skills", href: "#skills"},
    {name: "Projects", href: "#projects"},
    {name: "Certifications", href: "#certificates"},
    {name: "Contact", href: "#contact"},
]

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.screenY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <nav className={cn(
            "fixed w-full z-40 transition-all duration-300",
            isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
        )}>
            <div className="container flex items-center justify-between
                            rounded-xl
                            bg-gradient-to-r from-primary/10 via-foreground/10 to-primary/10
                            backdrop-blur-xl
                            border border-primary/20
                            shadow-lg
                            px-4 py-3 max-w-5xl mx-auto relative z-20">
                <a className="text-2xl font-bold text-primary flex items-center" href="#hero">
                    <span className="relative z-10">
                        <span className="text-glow text-foreground">V</span>RJ
                    </span>
                </a>
        
                {/* Desktop Version */}
                <div className="hidden md:flex space-x-8 mx-auto">
                    {navItems.map((Item, key) => (
                        <a key={key} href={Item.href} className="text-foreground/80 hover:text-primary transition-colors duration-300">
                            {Item.name}
                        </a>
                    ))}
                </div>
                
                {/* Mobile Button */}
                <button 
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 text-foreground z-30"
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
                
            {/* Mobile Menu Overlay (Moved outside container) */}
            <div className={cn(
                "fixed inset-0 bg-background/95 backdrop-blur-md z-10 flex flex-col items-center justify-center md:hidden transition-all duration-300",
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className="flex flex-col space-y-8 text-xl">
                    {navItems.map((Item, key) => (
                        <a 
                            key={key} 
                            href={Item.href} 
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {Item.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}