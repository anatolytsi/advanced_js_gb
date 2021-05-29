const calc = require('../calculator');

describe('Функция calc.sum()', () => {
    it('Должна возвращать 4 при (2, 2)', () => {
        expect(calc.sum(2, 2)).toBe(4);
    });

    it('Должна возвращать 4 при ("2", 2)', () => {
        expect(calc.sum('2', 2)).toBe(4);
    });

    it('Должна возвращать 4 при ("2", "2")', () => {
        expect(calc.sum('2', '2')).toBe(4);
    });

    it('Должна возвращать undefined при (undefined, 2)', () => {
        expect(calc.sum(undefined, 2)).toBe(undefined);
    });

    it('Должна возвращать undefined при (null, 2)', () => {
        expect(calc.sum(null, 2)).toBe(undefined);
    });
});

describe('Функция calc.sub()', () => {
    it('Должна возвращать 0 при (2, 2)', () => {
        expect(calc.sub(2, 2)).toBe(0);
    });

    it('Должна возвращать 0 при ("2", 2)', () => {
        expect(calc.sub('2', 2)).toBe(0);
    });

    it('Должна возвращать 0 при ("2", "2")', () => {
        expect(calc.sub('2', '2')).toBe(0);
    });

    it('Должна возвращать undefined при (undefined, 2)', () => {
        expect(calc.sub(undefined, 2)).toBe(undefined);
    });

    it('Должна возвращать undefined при (null, 2)', () => {
        expect(calc.sub(null, 2)).toBe(undefined);
    });
});

describe('Функция calc.mul()', () => {
    it('Должна возвращать 4 при (2, 2)', () => {
        expect(calc.mul(2, 2)).toBe(4);
    });

    it('Должна возвращать 4 при ("2", 2)', () => {
        expect(calc.mul('2', 2)).toBe(4);
    });

    it('Должна возвращать 4 при ("2", "2")', () => {
        expect(calc.mul('2', '2')).toBe(4);
    });

    it('Должна возвращать 0 при (0, 2)', () => {
        expect(calc.mul(0, 2)).toBe(0);
    });

    it('Должна возвращать 0 при (0, 2)', () => {
        expect(calc.mul(2, 0)).toBe(0);
    });

    it('Должна возвращать undefined при (undefined, 2)', () => {
        expect(calc.mul(undefined, 2)).toBe(undefined);
    });

    it('Должна возвращать undefined при (null, 2)', () => {
        expect(calc.mul(null, 2)).toBe(undefined);
    });
});

describe('Функция calc.div()', () => {
    it('Должна возвращать 1 при (2, 2)', () => {
        expect(calc.div(2, 2)).toBe(1);
    });

    it('Должна возвращать 1 при ("2", 2)', () => {
        expect(calc.div('2', 2)).toBe(1);
    });

    it('Должна возвращать 1 при ("2", "2")', () => {
        expect(calc.div('2', '2')).toBe(1);
    });

    it('Должна возвращать undefined при (0, 2)', () => {
        expect(calc.div(0, 2)).toBe(0);
    });

    it('Должна возвращать undefined при (2, 0)', () => {
        expect(calc.div(2, 0)).toBe(undefined);
    });

    it('Должна возвращать undefined при (undefined, 2)', () => {
        expect(calc.div(undefined, 2)).toBe(undefined);
    });

    it('Должна возвращать undefined при (null, 2)', () => {
        expect(calc.div(null, 2)).toBe(undefined);
    });
});
