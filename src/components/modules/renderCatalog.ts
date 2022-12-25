import Filter from './filters';

class Categories {
    filter: Filter;

    constructor() {
        this.filter = new Filter();
    }

    public renderCatalog(): void {
        const cards = document.querySelectorAll('.goods .card') as NodeListOf<HTMLDivElement> | null;
        const catalogWraper = document.querySelector('.catalog') as HTMLDivElement;
        const catalogList = document.querySelector('.catalog-list') as HTMLUListElement;
        const filterTitle = document.querySelector('.filter-headling') as HTMLHeadingElement;
        const categories = new Set();

        //получение из Local Storage
        let dataLS: string;

        if (localStorage.getItem('y-catalog')) {
            const activeEl = localStorage.getItem('y-catalog') as string;
            dataLS = JSON.parse(activeEl);
        } else {
            dataLS = '';
        }

        //со всех карточек собираем в Set категории
        if (cards === null) {
            throw new Error('данные карточек не получены');
        } else {
            cards.forEach((card) => {
                categories.add(card.dataset.category);
            });
        }

        //согласно Set формируем в верстке каталог
        categories.forEach((item) => {
            const li = document.createElement('li') as HTMLLIElement;
            li.textContent = `${item}`;

            if (dataLS === item) {
                li.className = 'catalog-list__item active';
            } else {
                li.className = 'catalog-list__item';
            }

            catalogList.appendChild(li);
        });

        //коллекция уникальных категорий
        const catalogListItems = catalogList.querySelectorAll('li') as NodeListOf<HTMLLIElement>;

        catalogWraper.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;

            //открытие/закрытие меню
            if (catalogList.style.display) {
                catalogList.style.display = '';
            } else {
                catalogList.style.display = 'block';
            }

            //если кликнули на категорию
            if (target.classList.contains('catalog-list__item')) {
                cards.forEach((item) => {
                    if (item.dataset.category === target.textContent) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });

                //если кликнули на категорию, помечаем её active
                catalogListItems.forEach((item) => {
                    if (item === target) {
                        item.classList.add('active');
                        localStorage.setItem('y-catalog', JSON.stringify(item.textContent));
                    } else {
                        item.classList.remove('active');
                    }
                });

                this.filter.filter();
                filterTitle.textContent = target.textContent;
            }
        });
    }
}

export default Categories;
