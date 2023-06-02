export function newExpenseData() {
    let idExpenses = 1;
    let expansesList = [];
    function addExpense(title, price, cardNumber) {
        const newExpanse = {
            idExpenses: idExpenses++,
            title,
            price,
            cardNumber,
            createdAt: new Date(),
        };
        expansesList = [...expansesList, newExpanse];
        return newExpanse;
    }
    return {
        addExpense,
        expansesList,
    };
}
