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
export function fromReducer(curState, action) {
    // Проеверяем на типы
    switch(action.type) {
        // Сбрасываем нашу валидность
        case 'RESET_VALIDITY': 
            return { ...curState, isValid: INITIAL_STATE.isValid };
        
        // Наполнение и отправка формы
        case 'SUBMIT': {
            const curFormData = curState.values;

            // Валидация значений обязательных к заполненнию полей из формы 
            // тут же преобразуем из в boolean
            const postValidity = !!curFormData.post?.trim().length;
            const titleValidity = !!curFormData.title?.trim().length;
            const dateValidity = !!curFormData.date;

            return {
                // Данные полей формы
                values: curFormData,

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
            return { ...curState, values: INITIAL_STATE.values, isFormReadyToSubmit: false };

        // События при изменении полей ввода формы    
        case 'SET_VALUE': 
            let out = { 
                // Текущее значения
                ...curState, 

                // Переопределяем значение values в статусах INITIAL_STATE
                values: {
                    // все ключи и значения из текущего статуса
                    ...curState.values,

                    // переопределяем полученными ключами и значениями из поля формы при изменении
                    ...action.payload
                }
            };

            return out;
    }
}