export function simpleGreeting() {
    if (!sessionStorage.getItem('greetingShown')) {
        setTimeout(() => {
            const now = new Date();
            const hour = now.getHours();
            let greeting;
            if (hour < 12) {
                greeting = "Доброе утро";
            } else if (hour < 18) {
                greeting = "Добрый день";
            } else {
                greeting = "Добрый вечер";
            }
            let name = " ";
            let isValid = false;
            while (!isValid) {
                name = prompt("Как вас зовут?");
                if (name.trim() !== "" && /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name.trim())) {
                    name = name.trim();
                    isValid = true;
                }
                else {
                    alert("Ошибка: имя должно содержать только буквы и не быть пустым");
                }
            }
            alert(`${greeting}, ${name}!`);
            sessionStorage.setItem('greetingShown', 'true');
        }, 100);
    }
}