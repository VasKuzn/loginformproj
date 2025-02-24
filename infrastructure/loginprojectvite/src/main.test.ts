import { describe, it, expect, vi } from 'vitest';

globalThis.document = {
    addEventListener: vi.fn(),
    getElementById: vi.fn(),
    querySelector: vi.fn(),
} as any;

const correctTuple = {
    phone: '+12345678901',
    email: 'Semyon@Volkov.com',
    password: '123456',
};

const secretTuple = {
    phone: '+12345678902',
    email: 'Secret@redir.haha',
    password: 'nichegoneproizoshlo',
};

function validateForm(inputEmailPhone: string, inputPassword: string, keepSignedIn: boolean) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{11}$/;
    let isValid = true;

    if (!inputEmailPhone) {
        alert('Пожалуйста, введите email или номер телефона.');
        isValid = false;
    } else if (!(emailRegex.test(inputEmailPhone) || phoneRegex.test(inputEmailPhone))) {
        alert('Введите корректный email или номер телефона.');
        isValid = false;
    }

    if (!inputPassword) {
        alert('Введите пароль.');
        isValid = false;
    } else if (inputPassword.length < 6) {
        alert('Пароль должен содержать минимум 6 символов.');
        isValid = false;
    }

    if (!isValid) return false;

    if ((inputEmailPhone === correctTuple.email || inputEmailPhone === correctTuple.phone) && inputPassword === correctTuple.password) {
        alert('Введено правильно');
    } else if ((inputEmailPhone === secretTuple.email || inputEmailPhone === secretTuple.phone) && inputPassword === secretTuple.password) {
        alert('Секретные данные, перенаправляем...');
    } else {
        alert('Введено неправильно');
    }

    return true;
}

describe('UserCredentials Form Validation', () => {

    it('Проверяем некорректный email', () => {
        const result = validateForm('incorrectemail.com', '123456', false);
        expect(result).toBeFalsy();
    });

    it('Проверяем некорректный формат email', () => {
        const result = validateForm('Semyon@Volkov', '123456', false);
        expect(result).toBeFalsy();
    });

    it('Проверяем некорректный телефонный номер', () => {
        const result = validateForm('12345678901', '123456', false);
        expect(result).toBeFalsy();
    });

    it('Проверяем верную комбинацию', () => {
        const result = validateForm(correctTuple.email, correctTuple.password, false);
        expect(result).toBeTruthy();
    });

    it('Проверяем секретную комбинацию', () => {
        const result = validateForm(secretTuple.email, secretTuple.password, true);
        expect(result).toBeTruthy();
    });

});