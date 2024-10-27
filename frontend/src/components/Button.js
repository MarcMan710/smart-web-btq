// frontend/src/components/Button.js
const Button = ({
    children,
    onClick,
    text = "text-nwhite1",
    bg = "bg-nblue4",
    hover = "hover:bg-nblue3",
    type = "button"
}) => {
    return (
        <button
            className={`w-[16ch] font-bold py-2 rounded-lg ${text} ${bg} ${hover}`}
            // className="w-[16ch] font-bold text-nwhite1 bg-nblue4 py-2 rounded-lg hover:bg-nblue3"
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;