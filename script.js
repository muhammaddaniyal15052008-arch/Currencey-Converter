// 1. Sabse pehle HTML elements ko select karna
const amountInput = document.querySelector(".amount input");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getBtn = document.querySelector("#get-exchange");
const msgDiv = document.querySelector(".msg p");

// 2. API fetch karne ka function
const getExchangeRate = async () => {
    let amountVal = amountInput.value;
    
    // Agar input khaali ho ya 0 se kam ho, toh default 1 kar dein
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amountInput.value = "1";
    }

    msgDiv.innerText = "Getting exchange rate...";

    // API URL (USD base rate ke liye)
    const url = `https://open.er-api.com/v6/latest/${fromCurrency.value}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        
        // Target currency ka rate nikalna
        let rate = data.rates[toCurrency.value];
        
        // Final calculation
        let finalAmount = (amountVal * rate).toFixed(2);
        
        // Screen par result dikhana
        msgDiv.innerText = `${amountVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
        
    } catch (error) {
        msgDiv.innerText = "Something went wrong!";
        console.error(error);
    }
};

// 3. Button click par function chalana
getBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    getExchangeRate();
});

// 4. Page load hote hi rate dikhana
window.addEventListener("load", () => {
    getExchangeRate();
});
