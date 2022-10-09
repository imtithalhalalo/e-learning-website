const Button = ({ text, color, onClick }) => {
  return (
    <button className={color + " btn-2"} onClick={onClick}>
      {text}
      
    </button>
  );
};

Button.defaultProps = {
  text: "default",
};

export default Button;
