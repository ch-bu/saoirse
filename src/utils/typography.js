import Typography from "typography";
// import elkGlenTheme from 'typography-theme-elk-glen';
import githubTheme from 'typography-theme-github';

githubTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  'a': {
    textShadow: "none",
    backgroundImage: "none",
    textDecoration: "none",
    baseFontSize: "12px"
  },
  'div': {
    textDecoration: "none"
  }
});

const typography = new Typography(githubTheme);

// export default typography;
const { rhythm, scale } = typography;
export { rhythm, scale, typography as default };