import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        }
    }, [])

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    }

    return (
        <button onClick={toggleTheme} className={cn("fixed max-sm:hidden top-7 right-5 sm:top-7 sm:right-6 z-50 p-2 rounded-full",
        "bg-foreground/10 dark:bg-background/20",
        "border border-primary/20 shadow-md",
        "transition-all duration-300 hover:scale-105 hover:shadow-lg",
        "cursor-pointer focus:outline-none"
        )}>
            {" "}
            {isDarkMode ?  (
                <Sun className="h-6 w-6 text-yellow-300"/> 
            ): (
            <Moon className="h-6 w-6 text-blue-900" />
            )}
        </button>
    )
}