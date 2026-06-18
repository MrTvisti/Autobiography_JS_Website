import { BasePage } from './BasePage.js';
export class ContactsPage extends BasePage {
    constructor() {
        super("Автобиография — Контакты");
    }
    init() {
        super.init();
        this.initFormValidation();
    }
    initFormValidation() {
        const form = document.getElementById('contact-form');
        const fioInput = document.getElementById('fio-input');
        const fioOutput = document.getElementById('fio-output');
        const phoneInput = document.getElementById('phone-input');
        const phoneOutput = document.getElementById('phone-output');
        const emailInput = document.getElementById('email-input');
        const emailOutput = document.getElementById('email-output');
        const photoInput = document.getElementById('photo-input');
        const photoPreview = document.getElementById('photo-preview');
        const dateInput = document.getElementById('date-input');
        const dateOutput = document.getElementById('date-output');
        if (!form) return;
        if (fioInput && fioOutput) {
            fioInput.addEventListener('blur', () => {
                const value = fioInput.value.trim();
                if (!value) {
                    fioOutput.style.display = 'none';
                    return;
                }
                if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)) {
                    fioOutput.style.display = 'block';
                    fioOutput.style.color = 'red';
                    fioOutput.innerText = 'Ошибка: ФИО должно содержать только буквы';
                    return;
                }
                const parts = value.split(/\s+/).filter(part => part.length > 0);
                if (parts.length !== 3) {
                    fioOutput.style.display = 'block';
                    fioOutput.style.color = 'red';
                    fioOutput.innerText = 'Ошибка: Введите Фамилию, Имя и Отчество через пробел (ровно 3 слова)';
                    return;
                }
                const formattedParts = parts.map(part => {
                    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                });
                fioInput.value = formattedParts.join(' ');
                fioOutput.style.display = 'block';
                fioOutput.style.color = '#e6b448';
                fioOutput.innerHTML = `
                    <strong>Фамилия: </strong> ${formattedParts[0]} <br>
                    <strong>Имя: </strong> ${formattedParts[1]} <br>
                    <strong>Отчество: </strong> ${formattedParts[2]}
                `;
            });
        }
        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                const value = phoneInput.value.trim();
                if (!value) {
                    phoneOutput.style.display = 'none';
                    return;
                }
                const digitsOnly = value.replace(/\D/g, '');
                if (digitsOnly.length === 11 && (digitsOnly.startsWith('7') || digitsOnly.startsWith('8'))) {
                    const formatted = `+7 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7, 9)}-${digitsOnly.slice(9, 11)}`;
                    phoneInput.value = formatted;
                    phoneOutput.style.display = 'block';
                    phoneOutput.style.color = '#3fce57';
                    phoneOutput.innerText = '✓ Номер телефона корректен';
                } else {
                    phoneOutput.style.display = 'block';
                    phoneOutput.style.color = 'red';
                    phoneOutput.innerText = 'Ошибка: Введите корректный номер телефона (11 цифр, начиная с +7 или 8).';
                }
            });
        }
        if (emailInput) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
            emailInput.addEventListener('blur', () => {
                const value = emailInput.value.trim();
                if (!value) {
                    emailOutput.style.display = 'none';
                    return;
                }
                if (emailRegex.test(value)) {
                    emailOutput.style.display = 'block';
                    emailOutput.style.color = '#3fce57';
                    emailOutput.innerText = '✓ Email корректен';
                } else {
                    emailOutput.style.display = 'block';
                    emailOutput.style.color = 'red';
                    emailOutput.innerText = 'Ошибка: Введите корректный email (например, user@example.com).';
                }
            });
        }
        if (photoInput && photoPreview) {
            photoInput.addEventListener('change', (event) => {
                photoPreview.innerHTML = '';
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.maxWidth = '150px';
                        img.style.borderRadius = '6px';
                        img.style.border = '2px solid #e6b448';
                        img.style.margin = '1.5rem auto';
                        photoPreview.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        if (dateInput) {
            dateInput.addEventListener('blur', () => {
                const value = dateInput.value;
                if (!value) {
                    dateOutput.style.display = 'none';
                    return;
                }
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selectedDate = new Date(value);
                selectedDate.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                    dateOutput.style.display = 'block';
                    dateOutput.style.color = 'red';
                    dateOutput.innerText = 'Ошибка: Дата связи не может быть раньше сегодняшней. Выберите другую дату.';
                    dateInput.value = '';
                } else {
                    dateOutput.style.display = 'block';
                    dateOutput.style.color = '#3fce57';
                    const formattedDate = selectedDate.toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });
                    dateOutput.innerText = `✓ Дата связи: ${formattedDate}`;
                }
            });
        }
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let isValid = true;
            if (fioInput) {
                const fioParts = fioInput.value.trim().split(/\s+/);
                if (fioParts.length < 3) {
                    alert('Пожалуйста, заполните корректно поле ФИО (Фамилия Имя Отчество).');
                    fioInput.focus();
                    isValid = false;
                    return;
                }
            }
            if (phoneInput) {
                const phoneDigits = phoneInput.value.replace(/\D/g, '');
                if (phoneDigits.length !== 11 || (!phoneDigits.startsWith('7') && !phoneDigits.startsWith('8'))) {
                    alert('Пожалуйста, введите корректный номер телефона.');
                    phoneInput.focus();
                    isValid = false;
                    return;
                }
            }
            if (emailInput) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    alert('Пожалуйста, введите корректный email.');
                    emailInput.focus();
                    isValid = false;
                    return;
                }
            }
            if (dateInput && dateInput.value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selectedDate = new Date(dateInput.value);
                selectedDate.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                    alert('Дата связи не может быть раньше сегодняшней.');
                    dateInput.focus();
                    isValid = false;
                    return;
                }
            }
            if (isValid) {
                alert('Форма успешно отправлена!');
                form.reset();
                if (fioOutput) fioOutput.style.display = 'none';
                if (phoneOutput) phoneOutput.style.display = 'none';
                if (emailOutput) emailOutput.style.display = 'none';
                if (dateOutput) dateOutput.style.display = 'none';
                if (photoPreview) photoPreview.innerHTML = '';
            }
        });
    }
}