const transactionTypeOptions = [
  {
    optionId: 'BALANCE',
    displayText: 'Balance',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    altValue: 'balance',
    bgClass: 'green',
    testid: 'balanceAmount',
  },
  {
    optionId: 'INCOME',
    displayText: 'Income',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    altValue: 'income',
    bgClass: 'blue',
    testid: 'incomeAmount',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    altValue: 'expenses',
    bgClass: 'purple',
    testid: 'expensesAmount',
  },
]
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

class MoneyManager extends Component {
  state = {
    id: 0,
    title: '',
    amount: 0,
    type: 'Income',
    historyTransactionsDetails: [],
    balance: 0,
    income: 0,
    expenses: 0,
  }
  updateValues = () => {
    const {type, amount} = this.state
    if (type === 'Income') {
      this.setState(prev => ({
        balance: prev.balance + parseFloat(amount),
        income: prev.income + parseFloat(amount),
      }))
    } else {
      this.setState(prev => ({
        balance: prev.balance - parseFloat(amount),
        expenses: prev.expenses + parseFloat(amount),
      }))
    }
  }
  updateOnDelete = (id, amount, type) => {
    const {historyTransactionsDetails} = this.state
    if (type === 'Income') {
      this.setState(prev => ({
        balance: prev.balance - parseFloat(amount),
        income: prev.income - parseFloat(amount),
        historyTransactionsDetails: historyTransactionsDetails.filter(
          each => each.id !== id,
        ),
      }))
    } else {
      this.setState(prev => ({
        balance: prev.balance + parseFloat(amount),
        expenses: prev.expenses - parseFloat(amount),
        historyTransactionsDetails: historyTransactionsDetails.filter(
          each => each.id !== id,
        ),
      }))
    }
  }
  addTransactionToList = event => {
    event.preventDefault()
    const {id, title, amount, type, historyTransactionsDetails} = this.state
    const transaction = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      type,
    }
    if (title !== '' && amount !== '') {
      this.setState(
        prev => ({
          historyTransactionsDetails: [
            ...historyTransactionsDetails,
            transaction,
          ],
          title: '',
          amount: '',
          type: 'Income',
        }),
        this.updateValues(),
      )
    }
  }
  updateTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }
  updateAmount = event => {
    this.setState({
      amount: event.target.value,
    })
  }
  updateType = event => {
    this.setState({
      type: event.target.value,
    })
  }

  render() {
    const {
      title,
      amount,
      type,
      historyTransactionsDetails,
      balance,
      income,
      expenses,
    } = this.state

    return (
      <div>
        <div className="profileContainer">
          <h1 className="profileName">Hi,Richard</h1>
          <p className="wishingText">
            Welcome back to your{' '}
            <span className="moneyManager">Money Manager</span>
          </p>
        </div>
        <ul className="transactionOptionContainer">
          {transactionTypeOptions.map(each => (
            <MoneyDetails
              transactionOption={each}
              key={each.optionId}
              balance={balance}
              income={income}
              expenses={expenses}
            />
          ))}
        </ul>
        <div className="AddAndDispalyTransactionContainer">
          <div className="TransactionsAddContainer">
            <h1 className="addTransactionsHeading">Add Transaction</h1>
            <form
              className="formContainer"
              onSubmit={this.addTransactionToList}
            >
              <label htmlFor="title">TITLE</label>
              <input
                value={title}
                onChange={this.updateTitle}
                className="inputElement"
                id="title"
                type="text"
                placeholder="TITLE"
              />
              <label htmlFor="number">AMOUNT</label>
              <input
                value={amount}
                onChange={this.updateAmount}
                className="inputElement"
                id="number"
                type="number"
                placeholder="AMOUNT"
              />
              <label htmlFor="type">TYPE</label>
              <select
                value={type}
                className="inputElement"
                id="type"
                onChange={this.updateType}
              >
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
              <button className="button" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="historyContainer">
            <h1 className="addTransactionsHeading">History</h1>
            <div className="transactionContainer">
              <div className="transactionDetailsContainer">
                <p className="listStyle">Title</p>
                <p className="listStyle">Amount</p>
                <p className="listStyle">Type</p>
                <p className="listStyle"></p>
              </div>
              <hr
                style={{
                  border: 'none',
                  height: '2px',
                  backgroundColor: '#d7dfe9',
                  width: '100%',
                  margin: '20px 0',
                }}
              />
              <ul>
                {historyTransactionsDetails.map(each => (
                  <TransactionItem
                    transaction={each}
                    key={each.id}
                    updateOnDelete={this.updateOnDelete}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
// Write your code here
