"use client";

import { Switch } from "@nextui-org/react";
import React, { ReactNode, useEffect, useState } from "react";
import { SunIcon } from "@/components/types/icons/icono-mdsun";
import { MoonIcon } from "@/components/types/icons/icono-mdmoon";
import { useTheme } from "next-themes";

const Switcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSwitch = (isSelected: boolean, classname: string): ReactNode => {
        if (isSelected) {
            setTheme("light");
            return <SunIcon className={classname} />;
        } else {
            setTheme("dark");
            return <MoonIcon className={classname} />;
        }
    };

    if (!mounted) return null;
    return (
        <Switch
            defaultSelected={theme === "light" ? true : false}
            size="lg"
            color="success"
            thumbIcon={({ isSelected, className }) => handleSwitch(isSelected, className)}
        />
    );
};

export default Switcher;