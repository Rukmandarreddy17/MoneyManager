// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transaction, updateOnDelete} = props
  const {id, title, amount, type} = transaction

  const deleteButton = () => {
    updateOnDelete(id, amount, type)
  }

  return (
    <>
      <li className="historyItemContainer">
        <p className="listStyle ">{title}</p>
        <p className="listStyle">{amount}</p>
        <p className="listStyle">{type}</p>
        <button className="deleteButton" onClick={deleteButton}>
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </li>
      <hr
        style={{
          border: 'none',
          height: '2px',
          backgroundColor: '#d7dfe9',
          width: '100%',
          margin: '20px 0',
        }}
      />
    </>
  )
}
export default TransactionItem
