// app/components/ThemeSwitcher.tsx
"use client";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "@/components/types/icons/icono-mdmoon";
import { SunIcon } from "@/components/types/icons/icono-mdsun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Esperar hasta que el componente esté montado

    // Alterna entre light y dark
    const isDark = theme === 'dark'; // Verificar si el tema actual es oscuro

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <div>
            {/* Switch para alternar entre temas */}
            <Switch
                checked={isDark} // Mostrar el estado basado en si el tema es oscuro
                size="lg"
                color="success"
                startContent={<SunIcon />} // Ícono para el modo claro
                endContent={<MoonIcon />}  // Ícono para el modo oscuro
                onChange={toggleTheme} // Alterna el tema al cambiar el switch
            />
        </div>
    );
}
