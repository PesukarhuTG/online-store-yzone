import { Cart } from '../components/modules';

const cart = new Cart();

describe('Cart', () => {
    describe('Sum of items, which put to the cart', () => {
        it('should accept a few numbers and return total sum', () => {
            expect(cart.getTotalSum([3333, 350, 897])).toBe(4580);
            expect(cart.getTotalSum([1235, 5018, 31000])).toBe(37253);
        });

        it('should accept empty data and return zero', () => {
            expect(cart.getTotalSum([])).toBe(0);
        });

        it('should accept sum more than 500000 and return warning', () => {
            expect(cart.getTotalSum([31000, 100000, 300500, 71200])).toBe('Сумма заказа превышает 500000 руб.');
        });

        it('should accept sum less than 1000 and return warning', () => {
            expect(cart.getTotalSum([310, 530])).toBe('Сумма заказа должна быть больше 1000 руб.');
        });
    });
});
