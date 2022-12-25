class ScrollToTopButton {
    button: HTMLElement;

    constructor() {
        this.button = document.createElement('button');
    }

    public createTopBtn(): void {
        this.button.classList.add('btn-top');

        const body = document.querySelector('body') as HTMLBodyElement;
        body.append(this.button);

        this.button.addEventListener('click', () => {
            document.body.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });

        window.addEventListener('scroll', () => {
            const clientHeight = document.documentElement.clientHeight as number;

            if (window.scrollY > clientHeight / 4) {
                this.button.classList.add('active-btn');
            } else {
                this.button.classList.remove('active-btn');
            }
        });
    }
}

export default ScrollToTopButton;
