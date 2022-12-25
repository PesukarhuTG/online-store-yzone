import Card from '../interfaces/card';

class Goods {
    public renderCards(data: Card<number>[]): void {
        const goodsWrapper = document.querySelector('.goods') as HTMLDivElement;
        goodsWrapper.textContent = '';

        //получение из Local Storage
        let dataLS: string;
        let choosedItems: [];

        if (localStorage.getItem('y-goods')) {
            dataLS = localStorage.getItem('y-goods') as string;
            choosedItems = JSON.parse(dataLS);
        } else {
            choosedItems = [];
        }

        data.forEach(
            ({ id, category, production, price, color, year, count, connection, title, sale, img }: Card<number>) => {
                const card = document.createElement('div') as HTMLDivElement;
                card.className = 'card';
                card.dataset.id = `${id}`;
                card.dataset.category = `${category}`;
                card.dataset.production = `${production}`;
                card.dataset.price = `${price}`;
                card.dataset.color = `${color}`;
                card.dataset.year = `${year}`;
                card.dataset.stock = `${count}`;
                card.dataset.connection = `${connection}`;
                card.dataset.name = `${title}`;

                if (choosedItems.length !== 0) {
                    choosedItems.forEach((elem: string) => {
                        if (elem === id) {
                            card.classList.add('incart');
                        }
                    });
                }

                card.innerHTML = `
                ${sale ? '<div class="card__sale">Акция</div>' : ''}
                <div class="card__img">
                  <img src="${img}" width="240" height="auto" alt="${title}">
                </div>
                <div class="card__description">
                  <span class="card__price" style="${sale ? 'color: #f91155' : ''}">${price} ₽</span>
                  <h4 class="card__title">${title}</h4>
                  <span class="card__info">В наличии: <span class="card__count">${count}</span></span>
                  <span class="card__info">Год выхода: <span class="card__year">${year}</span></span>
                  <span class="card__info">Производитель: <span class="card__production">${production}</span></span>
                  <span class="card__info">Цвет: <span class="card__color">${color}</span></span>
                  <span class="card__info">Подключение: <span class="card__connect">${connection}</span></span>
                </div>
                <button class="btn card__btn">В корзину</button>
            `;
                goodsWrapper.appendChild(card);
            }
        );
    }
}

export default Goods;
