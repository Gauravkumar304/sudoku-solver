// src/components/Button.jsx
const Button = ({ onClick, label }) => (
    <button
    onClick={onClick}
    className="text-black text-lg px-4 py-2 rounded transition-all duration-300"
    style={{
      backgroundImage: `linear-gradient(to right, #ffecd2, #fbc2eb, #a6c1ee)`,
      fontWeight: "normal", 
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundImage = `linear-gradient(to right, #ffecd2, #fbc2eb, #d0bff6)`; 
    }}
    >
      {label}
    </button>
  );
  
  export default Button;
  