import React, { useState } from "react";

export default function Player({ name, symbol , isActive }) {
  const [namePlayer, setNamePlayer] = useState(name);
  const [isEdit, setIsEdit] = useState(false);

  function handleEdit() {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }

  function handleChange(event) {
    setNamePlayer(event.target.value);
  }

  return (
    <li className={isActive ? 'active': undefined}>
      <span className="player">
        {isEdit ? (
          <input
            type="text"
            value={namePlayer}
            onChange={handleChange}
            required
          />
        ) : (
          <span className="player-name">{namePlayer}</span>
        )}
        <span className="player-symbol"> {symbol} </span>
      </span>
      <button onClick={handleEdit}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
}
