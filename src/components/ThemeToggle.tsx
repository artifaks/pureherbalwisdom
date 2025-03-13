import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  // Add animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes theme-icon-glow {
        0%, 100% { filter: drop-shadow(0 0 0.5px currentColor); }
        50% { filter: drop-shadow(0 0 5px currentColor); }
      }
      @keyframes theme-icon-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      .theme-icon-animate {
        animation: theme-icon-glow 2s ease-in-out infinite;
      }
      .theme-icon-spin {
        animation: theme-icon-spin 0.5s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="theme-toggle-button">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-800/40 relative overflow-hidden transition-all hover:scale-110"
          onClick={() => {
            // Add ripple effect
            const button = document.querySelector('.theme-toggle-button');
            if (button) {
              const circle = document.createElement('span');
              const diameter = Math.max(button.clientWidth, button.clientHeight);
              const radius = diameter / 2;
              
              circle.style.width = circle.style.height = `${diameter}px`;
              circle.style.left = '0px';
              circle.style.top = '0px';
              circle.style.position = 'absolute';
              circle.style.borderRadius = '50%';
              circle.style.backgroundColor = theme === 'dark' ? 'rgba(251, 191, 36, 0.4)' : 'rgba(251, 191, 36, 0.2)';
              circle.style.transform = 'scale(0)';
              circle.style.animation = 'ripple 600ms linear';
              
              const ripple = button.getElementsByClassName('ripple')[0];
              if (ripple) {
                ripple.remove();
              }
              
              circle.classList.add('ripple');
              button.appendChild(circle);
            }
          }}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-600 theme-icon-animate" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-amber-500 theme-icon-animate" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="dark:bg-[#231c12] dark:border-amber-800/40 animate-in slide-in-from-top-2 duration-300"
      >
        <DropdownMenuItem 
          onClick={() => {
            setTheme("light");
            const sunIcon = document.querySelector('.theme-toggle-button .theme-icon-animate');
            if (sunIcon) {
              sunIcon.classList.add('theme-icon-spin');
              setTimeout(() => sunIcon.classList.remove('theme-icon-spin'), 500);
            }
          }} 
          className="dark:focus:bg-amber-800/40 dark:focus:text-amber-200 transition-colors hover:bg-amber-50 dark:hover:bg-amber-800/20"
        >
          <Sun className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            setTheme("dark");
            const moonIcon = document.querySelector('.theme-toggle-button .absolute');
            if (moonIcon) {
              moonIcon.classList.add('theme-icon-spin');
              setTimeout(() => moonIcon.classList.remove('theme-icon-spin'), 500);
            }
          }} 
          className="dark:focus:bg-amber-800/40 dark:focus:text-amber-200 transition-colors hover:bg-amber-50 dark:hover:bg-amber-800/20"
        >
          <Moon className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-500" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className="dark:focus:bg-amber-800/40 dark:focus:text-amber-200 transition-colors hover:bg-amber-50 dark:hover:bg-amber-800/20"
        >
          <span className="mr-2 h-4 w-4">💻</span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
