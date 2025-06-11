document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const amountInput = document.getElementById('amount');
  const fromCurrencySelect = document.getElementById('from-currency');
  const toCurrencySelect = document.getElementById('to-currency');
  const resultElement = document.getElementById('result');
  const rateInfoElement = document.getElementById('rate-info');
  const lastUpdatedElement = document.getElementById('last-updated');
  const convertBtn = document.getElementById('convert-btn');
  const swapBtn = document.getElementById('swap-currencies');

  // Exchange rates data
  let exchangeRates = {};
  let lastUpdated = '';
  let currencies = [];

  // Fetch exchange rates from API
  async function fetchExchangeRates() {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      exchangeRates = data.rates;
      lastUpdated = new Date(data.time_last_updated * 1000).toLocaleString();
      currencies = Object.keys(exchangeRates).sort();

      populateCurrencyDropdowns();
      updateConversion();
      updateLastUpdated();
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      lastUpdatedElement.textContent = 'Failed to load exchange rates. Please try again later.';
      lastUpdatedElement.style.color = 'var(--error-color)';
    }
  }

  // Populate currency dropdowns
  function populateCurrencyDropdowns() {
    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;

      const option2 = document.createElement('option');
      option2.value = currency;
      option2.textContent = currency;

      fromCurrencySelect.appendChild(option1);
      toCurrencySelect.appendChild(option2);
    });

    // Set default values
    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';
  }

  // Update conversion result
  function updateConversion() {
    const amount = parseFloat(amountInput.value) || 0;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Convert through USD as base currency
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;

    const result = (amount / fromRate) * toRate;
    const rate = (1 / fromRate) * toRate;

    resultElement.textContent = result.toFixed(2);
    rateInfoElement.textContent = `1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}`;
  }

  // Update last updated time
  function updateLastUpdated() {
    lastUpdatedElement.textContent = `Rates last updated: ${lastUpdated}`;
  }

  // Swap currencies
  function swapCurrencies() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;
    updateConversion();
  }

  // Event listeners
  amountInput.addEventListener('input', updateConversion);
  fromCurrencySelect.addEventListener('change', updateConversion);
  toCurrencySelect.addEventListener('change', updateConversion);
  convertBtn.addEventListener('click', updateConversion);
  swapBtn.addEventListener('click', swapCurrencies);

  // Initialize
  fetchExchangeRates();
});