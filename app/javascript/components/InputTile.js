import React from 'react'

const InputTile = props => {

  return(
    <div className="cell">
      <label>{props.label}
        <input
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        />
      </label>
    </div>
  )
}

export default InputTile
