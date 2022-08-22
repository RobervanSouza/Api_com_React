export function LabelInputButton(props) {
  return (
    <div className={`button-label-input + ${props.classNameDiv}`}>
      <label
        htmlFor={props.htmlForLabel}
        className={`button-label + ${props.classNameLabel}`}
      >
        {props.labelText}
      </label>
      <input
        type="text"
        className={props.classNameInput}
        id={props.idInput}
        onChange={props.onChangeInput}
        name={props.nameInput}
        value={props.inputValue}
      />
      <button type="button" className="button" onClick={props.onClickButton}>
        {props.buttonText}
      </button>
    </div>
  );
}
