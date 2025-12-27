import "./status_button.css"

interface props {
  color: string;
  text: string;
  click: () => void;
}

function StatusButton({ color, text, click }: props) {
  return (
    <div className="status-btn-container">
      <button id="button" onClick={click} style={{ backgroundColor: color }}>
        <h3>{text}</h3>
      </button>
    </div>
  );
}

export default StatusButton;
