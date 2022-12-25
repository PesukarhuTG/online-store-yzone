import Filter from '../filters';

class ClearButton {
    filter: Filter;

    constructor() {
        this.filter = new Filter();
    }

    public clearStorage() {
        const clearBtn = document.getElementById('btn-clear-storage') as HTMLButtonElement;

        clearBtn.addEventListener('click', () => {
            localStorage.clear();
            this.filter.isSale();
            location.reload();
        });
    }
}

export default ClearButton;
