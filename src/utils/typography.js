import Typography from "typography";
import elkGlenTheme from 'typography-theme-elk-glen';

elkGlenTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  'a': {
    textShadow: "none",
    backgroundImage: "none",
    baseFontSize: "16px",
  }
});

const typography = new Typography(elkGlenTheme);

// export default typography;
const { rhythm, scale } = typography;
export { rhythm, scale, typography as default };