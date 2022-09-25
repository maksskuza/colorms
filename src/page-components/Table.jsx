import React from 'react'

const Table = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.id + 1}.</td>
        <td>{props.name}</td>
        <td>{props.score}</td>
      </tr>
    </tbody>
  )
}

export default Table