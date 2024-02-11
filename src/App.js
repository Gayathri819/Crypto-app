import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins", {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      })
      .then((response) => {
        console.log(response);
        setListOfCoins(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching coin data:", error.message);
      });
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Enter your coin"
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <Coin
              key={coin.id}
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          ))
        ) : (
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>No coins available!</p>
        )}
      </div>
    </div>
  );
}

export default App;
