function RadioButton({id, value, onOptionChange, sortType, checkSortType, htmlFor, buttonText}) {
    return (
        <div class="radio-button-wrapper">
             <input
                    type="radio"
                    name="sort"
                    value={value}
                    id={id}
                    checked={sortType === checkSortType}
                    onChange={onOptionChange}
                />
                <label style={{marginLeft:"0.5rem"}} htmlFor={htmlFor}>{buttonText}</label>
        </div>
    )
}

export default RadioButton;