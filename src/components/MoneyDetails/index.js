// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {transactionOption, balance, income, expenses} = props
  const {optionId, displayText, imageUrl, altValue, bgClass, testid} =
    transactionOption
  let amount
  if (optionId === 'BALANCE') {
    amount = balance
  } else if (optionId === 'INCOME') {
    amount = income
  } else {
    amount = expenses
  }

  return (
    <li className={bgClass}>
      <img className="imageStyle" src={imageUrl} alt={altValue} />
      <div>
        <p>Your {displayText}</p>
        <p data-testid={testid}>{amount}</p>
      </div>
    </li>
  )
}
export default MoneyDetails
