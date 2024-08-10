import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  let [amount,setAmount] = useState(1);
  let [fromCurr,setFromCurr] = useState("USD");
  let [toCurr,setToCurr] = useState("INR");
  let [convertedAmt,setConvertedAmt] = useState(null);
  let [exchangeAmt, setExchangeAmt] = useState(null)
  useEffect(()=>{
    const fetchApi = async()=>{
      const url = `https://api.exchangerate-api.com/v4/latest/${fromCurr}`;
      try{
        const res = await axios.get(url);
        setExchangeAmt(res.data.rates[toCurr])
      }catch(error){
        console.error("Error while fetching API",error)
      }
    }
    fetchApi();
  },[fromCurr,toCurr]);
  useEffect(()=>{
    const conAmt = amount*exchangeAmt;
    setConvertedAmt(conAmt.toFixed(2));
  },[amount,exchangeAmt])
  function handleAmount(e){
    const amt = parseFloat(e.target.value);
    setAmount(amt);
  }
  return (
    <>
      <div className="curr-container">
        <h2>CURRENCY CONVERTER</h2>
        <div className="input-field">
          <label htmlFor='amount'>Enter Amount</label>
          <input type="number" id="amount" value={amount} onChange={handleAmount}/>
        </div>
        <div className="input-field">
          <label htmlFor='fromCurrency'>From currency</label>
          <select id="fromCurrency" value={fromCurr} onChange={(e)=>{setFromCurr(e.target.value)}}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor='toCurrency'>To currency</label>
          <select id="toCurrency" value={toCurr} onChange={(e)=>{setToCurr(e.target.value)}}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        <div className="result">
          <h3>{amount} {fromCurr} is equal to {convertedAmt} {toCurr}</h3>
        </div>
      </div>
    </>
  )
}

export default App
