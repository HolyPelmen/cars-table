export default function FormButtonGroup(props) {
  return (
    <div className="modal-window__button-group">
      <button
        value="cancel"
        onClick={props.onClick}
        className="modal-window__button-group-cancel"
      >
        &#10006;
      </button>
      <button
        type="submit"
        value="Confirm"
        onClick={props.onClick}
        className="modal-window__button-group-confirm"
      >
        &#10004;
      </button>
    </div>
  );
}
