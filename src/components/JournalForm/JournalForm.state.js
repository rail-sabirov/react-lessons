// Первоначальные статусы для инициализации
export const INITIAL_STATE = {
    // Начальные статусы для валитации формы
    isValid: {
        post: true,
        date: true,
        title: true
    }, 

    // Начальные значения полей формы
    values: {
        post: '',
        date: '',
        title: '',
        tag: ''
    },

    // Начальный статус - форма не готова к отправке
    isFormReadyToSubmit: false
}

// Фукнция обработчик команд от dispatchForm, вызывается автоматом из useReduce
export function fromReducer(oldState, action) {
    const formData = action.payload;
    // Проеверяем на типы
    switch(action.type) {
        // Сбрасываем нашу валидность
        case 'RESET_VALIDITY': 
            return { ...oldState, isValid: INITIAL_STATE.isValid };
        
        // Наполнение и отправка формы, 
        // payload - будет содержать нашу форму при ее submitе
        case 'SUBMIT': {
            // Валидация значений обязательных к заполненнию полей из формы 
            // тут же преобразуем из в boolean
            const postValidity = !!formData.post?.trim().length;
            const titleValidity = !!formData.title?.trim().length;
            const dateValidity = !!formData.date;

            return {
                // Данные полей формы
                values: formData,

                // результаты проверки каждого поля, для подсветки красным
                isValid: {
                    post: postValidity,
                    title: titleValidity,
                    date: dateValidity
                },

                // Валидация жотя бы одного поля будет false, форма не отправиться
                isFormReadyToSubmit: postValidity && titleValidity && dateValidity
            }
        };

        // Очистка полей формы, после добавления данных в список
        case 'CLEAR': 
            return { ...state, values: INITIAL_STATE.values };
    }
}