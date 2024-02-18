const Messages = {};

export const Validation = {
    Doctor: {
        fieldEmpty: 'Поле не может быть пустым',
        invalidEmail: 'Неверный формат почты',
        invalidPhone: 'Неверный формат телефона',
        maxLengthLimited: (n: Number) => `Превышена максимальная длина: ${n} символов`,
        minLengthLimited: (n: Number) => `Превышена минимальная длина: ${n} символов`
    }
};

export default Messages;
