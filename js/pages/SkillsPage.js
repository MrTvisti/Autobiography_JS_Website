import { BasePage } from './BasePage.js';
export class SkillsPage extends BasePage {
    constructor() {
        super("Автобиография — Навыки");
        this.CBR_API_URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
        this.exchangeRatesCache = null;
        this.lastFetchTime = null;
        this.CACHE_DURATION = 60 * 60 * 1000;
    }
    init() {
        super.init();
        this.initInputRestrictions();
        this.initCalculator();
        this.initConverter();
        this.initSwapButton();
        this.initResetButtons();
    }
    initSwapButton() {
        const swapBtn = document.querySelector('.arrow-swap');
        if (swapBtn) {
            swapBtn.style.cursor = 'pointer';
            swapBtn.addEventListener('click', () => this.swapCurrencies());
        }
    }
    swapCurrencies() {
        const currency1 = document.getElementById('currency1');
        const currency2 = document.getElementById('currency2');
        if (!currency1 || !currency2) return;
        const tempValue = currency1.value;
        currency1.value = currency2.value;
        currency2.value = tempValue;
        this.convCalculate();
    }
    sanitizeNumber(value) {
        if (value === undefined || value === null || value === '') return NaN;
        const stringValue = String(value).toLowerCase();
        if (stringValue.includes('e')) return NaN;
        const num = Number(value);
        if (isNaN(num)) return NaN;
        if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-15 && num !== 0)) return NaN;
        return num;
    }
    normalizeNumberInput(value) {
        if (value === undefined || value === null || value === '') return '';
        let stringValue = String(value);
        stringValue = stringValue.replace(/[^0-9.]/g, '');
        stringValue = stringValue.replace(/(\d)[+\-](\d)/g, '$1$2');
        stringValue = stringValue.replace(/^[+\-]+/, '');
        stringValue = stringValue.replace(/[+\-]/g, '');
        const dotIndex = stringValue.indexOf('.');
        if (dotIndex !== -1) {
            stringValue = stringValue.slice(0, dotIndex + 1) + 
                         stringValue.slice(dotIndex + 1).replace(/\./g, '');
        }
        if (stringValue.length > 1 && stringValue[0] === '0') {
            if (!stringValue.startsWith('0.')) {
                stringValue = stringValue.replace(/^0+/, '');
                if (stringValue === '' || stringValue === '.') {
                    stringValue = '0';
                }
            }
        }
        return stringValue;
    }
    initInputRestrictions() {
        const inputIds = ['num1', 'num2', 'convAmount'];
        inputIds.forEach(id => {
            const input = document.getElementById(id);
            if (!input) return;
            input.addEventListener('keydown', (e) => {
                if (e.key === 'e' || e.key === 'E') {
                    e.preventDefault();
                }
            });
            input.addEventListener('paste', (e) => {
                const pastedText = (e.clipboardData || window.clipboardData).getData('text');
                if (pastedText.toLowerCase().includes('e')) {
                    e.preventDefault();
                    alert('Вставка чисел с буквой "e" запрещена');
                }
            });
            input.addEventListener('input', (e) => {
                const normalized = this.normalizeNumberInput(e.target.value);
                if (normalized !== e.target.value) {
                    e.target.value = normalized;
                }
            });
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.resetCalculator();
                this.resetConverter();
            }
        });
    }
    initCalculator() {
        const calcBtn = document.getElementById('calc-submit-btn');
        if (calcBtn) {
            calcBtn.addEventListener('click', () => this.calcCalculate());
        }
    }
    calcCalculate() {
        const num1 = document.getElementById('num1');
        const num2 = document.getElementById('num2');
        const operation = document.getElementById('operation').value;
        const resultDiv = document.getElementById('calcResult');
        if (!num1 || !num2 || !resultDiv) return;
        let a = this.sanitizeNumber(num1.value);
        let b = this.sanitizeNumber(num2.value);
        if (isNaN(a) || isNaN(b)) {
            resultDiv.innerHTML = 'Ошибка: некорректный ввод чисел';
            resultDiv.style.color = 'red';
            return;
        }
        let res;
        switch (operation) {
            case '+': res = a + b; break;
            case '-': res = a - b; break;
            case '*': res = a * b; break;
            case '/':
                if (b === 0) {
                    resultDiv.innerHTML = 'Ошибка: деление на ноль запрещено';
                    resultDiv.style.color = 'red';
                    return;
                }
                res = a / b;
                break;
            default:
                resultDiv.innerHTML = 'Неизвестная операция';
                resultDiv.style.color = 'red';
                return;
        }
        const formattedResult = Number(res.toFixed(10));
        if (isNaN(formattedResult) || Math.abs(formattedResult) > 1e15) {
            resultDiv.innerHTML = 'Ошибка: результат слишком велик или некорректен';
            resultDiv.style.color = 'red';
        } else {
            resultDiv.innerHTML = `Результат: ${formattedResult}`;
            resultDiv.style.color = '#6A66AF';
        }
    }
    resetCalculator() {
        const n1 = document.getElementById('num1');
        const n2 = document.getElementById('num2');
        const op = document.getElementById('operation');
        const res = document.getElementById('calcResult');
        if (n1) n1.value = 0;
        if (n2) n2.value = 0;
        if (op) op.value = '+';
        if (res) {
            res.innerHTML = 'Результат: —';
            res.style.color = '#6A66AF';
            res.style.fontWeight = 'bold';
        }
    }
    initConverter() {
        const convBtn = document.getElementById('conv-submit-btn');
        if (convBtn) {
            convBtn.addEventListener('click', () => this.convCalculate());
        }
    }
    async fetchExchangeRates() {
        const now = Date.now();
        if (this.exchangeRatesCache && this.lastFetchTime && (now - this.lastFetchTime < this.CACHE_DURATION)) {
            return this.exchangeRatesCache;
        }
        try {
            const response = await fetch(this.CBR_API_URL);
            if (!response.ok) throw new Error('Ошибка сети при запросе к API ЦБ');
            const data = await response.json();
            this.exchangeRatesCache = data.Valute;
            this.lastFetchTime = now;
            return this.exchangeRatesCache;
        } catch (error) {
            console.error('Не удалось загрузить курсы валют:', error);
            return null;
        }
    }
    async convCalculate() {
        const amountInput = document.getElementById('convAmount');
        const currency1 = document.getElementById('currency1').value;
        const currency2 = document.getElementById('currency2').value;
        const resultDiv = document.getElementById('convResult');
        if (!amountInput || !resultDiv) return;
        let amount = this.sanitizeNumber(amountInput.value);
        if (isNaN(amount) || amount < 0) {
            resultDiv.innerHTML = 'Ошибка: некорректная сумма перевода';
            resultDiv.style.color = 'red';
            return;
        }
        if (currency1 === currency2) {
            resultDiv.innerHTML = `Результат: ${amount} ${currency1}`;
            resultDiv.style.color = '#6A66AF';
            resultDiv.style.fontWeight = 'bold';
            return;
        }
        resultDiv.innerHTML = 'Загрузка актуальных курсов...';
        resultDiv.style.color = '#e6b448';
        const valute = await this.fetchExchangeRates();
        if (!valute) {
            resultDiv.innerHTML = 'Ошибка: не удалось получить данные о курсах валют';
            resultDiv.style.color = 'red';
            return;
        }
        let amountInRub = amount;
        if (currency1 !== 'RUB') {
            const rate1 = valute[currency1];
            if (!rate1) {
                resultDiv.innerHTML = `Ошибка: нет данных для валюты ${currency1}`;
                resultDiv.style.color = 'red';
                return;
            }
            amountInRub = amount * (rate1.Value / rate1.Nominal);
        }
        let finalResult = amountInRub;
        if (currency2 !== 'RUB') {
            const rate2 = valute[currency2];
            if (!rate2) {
                resultDiv.innerHTML = `Ошибка: нет данных для валюты ${currency2}`;
                resultDiv.style.color = 'red';
                return;
            }
            finalResult = amountInRub / (rate2.Value / rate2.Nominal);
        }
        const formattedResult = Number(finalResult.toFixed(4));
        if (isNaN(formattedResult) || formattedResult === Infinity) {
            resultDiv.innerHTML = 'Ошибка вычислений';
            resultDiv.style.color = 'red';
        } else {
            resultDiv.innerHTML = `Результат: ${formattedResult} ${currency2}`;
            resultDiv.style.color = '#6A66AF';
            resultDiv.style.fontWeight = 'bold';
        }
    }
    resetConverter() {
        const amt = document.getElementById('convAmount');
        const c1 = document.getElementById('currency1');
        const c2 = document.getElementById('currency2');
        const res = document.getElementById('convResult');
        if (amt) amt.value = 0;
        if (c1) c1.value = 'RUB';
        if (c2) c2.value = 'USD';
        if (res) {
            res.innerHTML = 'Результат: —';
            res.style.color = '#6A66AF';
            res.style.fontWeight = 'bold';
        }
    }
    initResetButtons() {
        const calcResetBtn = document.getElementById('calc-reset-btn');
        const convResetBtn = document.getElementById('conv-reset-btn');
        if (calcResetBtn) {
            calcResetBtn.addEventListener('click', () => this.resetCalculator());
        }
        if (convResetBtn) {
            convResetBtn.addEventListener('click', () => this.resetConverter());
        }
    }
}