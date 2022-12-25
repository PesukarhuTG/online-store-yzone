import Filter from './filters';

class Connections {
    filter: Filter;

    constructor() {
        this.filter = new Filter();
    }

    public renderConnectType(): void {
        const cards = document.querySelectorAll('.goods .card') as NodeListOf<HTMLDivElement> | null;
        const connectList = document.querySelector('.field-connect') as HTMLDivElement;
        const connects = new Set();

        //получение из Local Storage
        let dataLS: string;
        let checkedItems: [];

        if (localStorage.getItem('y-connect')) {
            dataLS = localStorage.getItem('y-connect') as string;
            checkedItems = JSON.parse(dataLS);
        } else {
            checkedItems = [];
        }

        //со всех карточек собираем в Set типов подключения
        if (cards === null) {
            throw new Error('данные карточек не получены');
        } else {
            cards.forEach((card) => {
                connects.add(card.dataset.connection);
            });
        }

        //согласно Set формируем в верстке список типов подключения
        connects.forEach((item) => {
            const div = document.createElement('div') as HTMLDivElement;
            div.className = 'connect-item';

            const input = document.createElement('input') as HTMLInputElement;
            input.className = 'connect-input-item';
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', `${item}`.toLowerCase());
            input.setAttribute('name', 'connection');
            input.setAttribute('value', `${item}`);

            if (checkedItems.length !== 0) {
                checkedItems.forEach((elem: string) => {
                    if (elem === item) {
                        input.checked = true;
                    }
                });
            }

            const label = document.createElement('label') as HTMLLabelElement;
            label.className = 'label';
            label.setAttribute('for', `${item}`);
            label.textContent = `${item}`;

            div.append(input, label);
            connectList.appendChild(div);
        });

        connectList.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            const targetName = target.tagName as string;

            if (targetName.toLowerCase() === 'label' || targetName.toLowerCase() === 'input') {
                this.filter.filter();
            }
        });
    }
}

export default Connections;
