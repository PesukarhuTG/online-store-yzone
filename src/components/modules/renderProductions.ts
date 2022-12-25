import Filter from './filters';

class Productions {
    filter: Filter;

    constructor() {
        this.filter = new Filter();
    }

    public renderProduction(): void {
        const cards = document.querySelectorAll('.goods .card') as NodeListOf<HTMLDivElement> | null;
        const productionList = document.querySelector('.field-production') as HTMLDivElement;
        const productions = new Set();

        //получение из Local Storage
        let dataLS: string;
        let checkedItems: [];

        if (localStorage.getItem('y-prod')) {
            dataLS = localStorage.getItem('y-prod') as string;
            checkedItems = JSON.parse(dataLS);
        } else {
            checkedItems = [];
        }

        //со всех карточек собираем в Set производителей
        if (cards === null) {
            throw new Error('данные карточек не получены');
        } else {
            cards.forEach((card) => {
                productions.add(card.dataset.production);
            });
        }

        //согласно Set формируем в верстке список производителей
        productions.forEach((item) => {
            const div = document.createElement('div') as HTMLDivElement;
            div.className = 'production-item';

            const input = document.createElement('input') as HTMLInputElement;
            input.className = 'input-item';
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', `${item}`.toLowerCase());
            input.setAttribute('name', 'production');
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
            productionList.appendChild(div);
        });

        productionList.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            const targetName = target.tagName as string;

            if (targetName.toLowerCase() === 'label' || targetName.toLowerCase() === 'input') {
                this.filter.filter();
            }
        });
    }
}

export default Productions;
