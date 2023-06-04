export function newExpenseData() {
    const counterLocalStorage = localStorage.getItem("id-counter");
    let id = counterLocalStorage
        ? JSON.parse(counterLocalStorage, (key, value) => {
            if (key === "createdAt") {
                return new Date(value);
            }
            return value;
        })
        : 1;
    let expansesList = localStorage.getItem("expenses")
        ? JSON.parse(localStorage.getItem("expenses"))
        : [];
    function getExpanses() {
        return expansesList;
    }
    function save() {
        localStorage.setItem("expenses", JSON.stringify(getExpanses()));
        localStorage.setItem("id-counter", String(id));
    }
    function getExpenseById(id) {
        // const index: number = getExpanses().findIndex((expanse) => {
        //    expanse.id === expanseId;
        // });
        // if (index === -1) {
        //    return null;
        // }
        // return index;
        const expense = expansesList.find((e) => e.id === id);
        return expense;
    }
    function addExpense(title, price, cardNumber) {
        const newExpanse = {
            id: id++,
            title,
            price,
            cardNumber,
            createdAt: new Date(),
        };
        expansesList = [...expansesList, newExpanse];
        save();
        return newExpanse;
    }
    function removeExpense(id) {
        let removed = getExpenseById(id);
        expansesList = expansesList.filter((expense) => expense.id !== id);
        save();
        return removed;
    }
    function cardsList() {
        const allCardsList = expansesList.map((expense) => expense.cardNumber);
        let cardsList = [];
        for (let i = 0; i < allCardsList.length; i++) {
            if (cardsList.indexOf(allCardsList[i]) === -1) {
                cardsList.push(allCardsList[i]);
            }
        }
        return cardsList;
    }
    return {
        addExpense,
        getExpanses,
        removeExpense,
        getExpenseById,
        cardsList,
        id,
    };
}
