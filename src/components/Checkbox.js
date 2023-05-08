function Checkbox({id, name, handleChange, checked, title}) {
    return (
        <div class="checkbox-wrapper">
            <input
                id={id}
                type="checkbox"
                name={name}
                onChange={handleChange}
                checked={checked}
            />
            <label style={{marginLeft:"0.5rem"}} htmlFor={id}>{title}</label>
        </div>
    )
}

export default Checkbox;
