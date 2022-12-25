import Filter from './filters';

class Colors {
    filter: Filter;

    constructor() {
        this.filter = new Filter();
    }

    public renderColors(): void {
        const cards = document.querySelectorAll('.goods .card') as NodeListOf<HTMLDivElement> | null;
        const colorList = document.querySelector('.field-color') as HTMLDivElement;
        const colors = new Set();

        //получение из Local Storage
        let dataLS: string;
        let checkedItems: [];

        if (localStorage.getItem('y-color')) {
            dataLS = localStorage.getItem('y-color') as string;
            checkedItems = JSON.parse(dataLS);
        } else {
            checkedItems = [];
        }

        //со всех карточек собираем в Set цветов
        if (cards === null) {
            throw new Error('данные карточек не получены');
        } else {
            cards.forEach((card) => {
                colors.add(card.dataset.color);
            });
        }

        //согласно Set формируем в верстке список цветов
        colors.forEach((item) => {
            const div = document.createElement('div') as HTMLDivElement;
            div.className = 'color-item';

            const input = document.createElement('input') as HTMLInputElement;
            input.className = 'input-color-item';
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', `${item}`.toLowerCase());
            input.setAttribute('name', 'color');
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
            colorList.appendChild(div);
        });

        colorList.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            const targetName = target.tagName as string;

            if (targetName.toLowerCase() === 'label' || targetName.toLowerCase() === 'input') {
                this.filter.filter();
            }
        });
    }
}

export default Colors;
