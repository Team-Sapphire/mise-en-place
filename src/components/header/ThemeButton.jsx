import React from "react";
import { useThemeContext } from '../../../pages/_app';

function ThemeButton({ children, theme }) {
  const themeContext = useThemeContext();

  return <button onClick={() => themeContext.setTheme(theme)}>{children}</button>;
}

export default ThemeButton;
