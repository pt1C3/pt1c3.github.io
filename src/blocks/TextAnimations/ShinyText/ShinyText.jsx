/*
  jsrepo 1.34.0
  Installed from https://reactbits.dev/default/
  09-02-2025
*/

import "./ShinyText.css";

const ShinyText = ({ text, disabled = false, speed = 5, className = "", delay = 0 }) => {
  const animationDuration = `${speed}s`;
  const animationDelay = `${delay}s`;

  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration, animationDelay }}
    >
      Developer<span className='and'>&</span>
      Designer
    </div>
  );
};

export default ShinyText;
