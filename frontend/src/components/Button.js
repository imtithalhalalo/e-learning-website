const Button = ({ text, btn, onClick }) => {
  return (
    <button className={btn} onClick={onClick}>
      {text}

    </button>
  );
};

Button.defaultProps = {
  text: "default",
};

export default Button;
