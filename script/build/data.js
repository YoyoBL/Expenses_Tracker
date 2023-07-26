function restore() {
    const backup = [
        {
            sheetId: 1,
            id: 1,
            title: "ישיבת ארץ הצבי",
            price: 100,
            cardNumber: "5315",
            createdAt: "2023-06-04T10:25:00.286Z",
        },
        {
            sheetId: 1,
            id: 2,
            title: "רואה חשבון",
            price: 526.5,
            cardNumber: "חשבון עסק",
            createdAt: "2023-06-04T10:30:18.239Z",
        },
        {
            sheetId: 1,
            id: 3,
            title: "הלוואה רכב",
            price: 1070,
            cardNumber: "חשבון עסק",
            createdAt: "2023-06-04T10:30:46.975Z",
        },
        {
            sheetId: 1,
            id: 4,
            title: "הלוואה לימודים",
            price: 400,
            cardNumber: "חשבון עסק",
            createdAt: "2023-06-04T10:31:28.807Z",
        },
        {
            sheetId: 1,
            id: 5,
            title: "ביטוח חובה",
            price: 134.5,
            cardNumber: "5846",
            createdAt: "2023-06-04T10:32:45.255Z",
        },
        {
            sheetId: 1,
            id: 6,
            title: "ביטוח מקיף",
            price: 270,
            cardNumber: "5315",
            createdAt: "2023-06-04T10:37:06.399Z",
        },
        {
            sheetId: 1,
            id: 7,
            title: "מכבי שלי",
            price: 180,
            cardNumber: "5846",
            createdAt: "2023-06-04T10:44:40.535Z",
        },
        {
            sheetId: 1,
            id: 8,
            title: "פרטנר",
            price: 190,
            cardNumber: "5846",
            createdAt: "2023-06-04T10:45:05.519Z",
        },
        {
            sheetId: 1,
            id: 9,
            title: "ספוטיפיי",
            price: 26,
            cardNumber: "5846",
            createdAt: "2023-06-04T10:45:35.343Z",
        },
        {
            sheetId: 1,
            id: 10,
            title: "GOOGLE",
            price: 51,
            cardNumber: "1849",
            createdAt: "2023-06-04T10:47:55.455Z",
        },
        {
            sheetId: 1,
            id: 11,
            title: "ביטוח דירה - ישיר",
            price: 53,
            cardNumber: "1849",
            createdAt: "2023-06-04T10:52:34.839Z",
        },
        {
            sheetId: 1,
            id: 14,
            title: "ארנונה",
            price: 420,
            cardNumber: "5846",
            createdAt: "2023-06-04T10:57:40.552Z",
        },
        {
            sheetId: 1,
            id: 15,
            title: "ביטוח לאומי תהילה",
            price: 1066,
            cardNumber: "חשבון עסק",
            createdAt: "2023-06-04T11:01:34.560Z",
        },
        {
            sheetId: 1,
            id: 16,
            title: 'שכ"ד',
            price: 4520,
            cardNumber: "חשבון בית",
            createdAt: "2023-06-04T11:16:43.769Z",
        },
    ];
    localStorage.setItem("expenses", JSON.stringify(backup));
    localStorage.setItem("id-counter", String(17));
}
// restore();
let expensesSheets = localStorage.getItem("expenses-sheets")
    ? JSON.parse(localStorage.getItem("expenses-sheets"))
    : [
        {
            sheetId: 1,
            sheetName: "כללי",
        },
    ];
let sheetId = localStorage.getItem("sheets-id-counter")
    ? Number(JSON.parse(localStorage.getItem("sheets-id-counter")))
    : 2;
let id = localStorage.getItem("id-counter")
    ? Number(JSON.parse(localStorage.getItem("id-counter")))
    : 1;
const expensesLocalStorage = localStorage.getItem("expenses");
let expansesList = getexpensesLS();
function getexpensesLS() {
    let expenses = [];
    if (expensesLocalStorage) {
        expenses = JSON.parse(expensesLocalStorage, (key, value) => {
            if (key === "createdAt") {
                return new Date(value);
            }
            return value;
        });
        return expenses;
    }
    else {
        return [];
    }
}
let expensesChecked = [];
function getExpanses() {
    return expansesList;
}
function save() {
    localStorage.setItem("expenses-sheets", JSON.stringify(expensesSheets));
    localStorage.setItem("sheets-id-counter", String(sheetId));
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
function addExpensesSheet(sheetName) {
    const newSheet = {
        sheetId: sheetId++,
        sheetName,
    };
    expensesSheets = [...expensesSheets, newSheet];
    save();
    return newSheet;
}
function removeExpensesSheet(sheetId) {
    expensesSheets = expensesSheets.filter((e) => e.sheetId !== sheetId);
    expansesList = expansesList.filter((e) => e.sheetId !== sheetId);
    save();
    return expensesSheets;
}
function addExpense(sheetId = 1, title, price, cardNumber) {
    const newExpanse = {
        sheetId,
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
function checkMultiple(id) {
    if (expensesChecked.indexOf(id) === -1) {
        expensesChecked.push(id);
    }
    else {
        expensesChecked = expensesChecked.filter((num) => num !== id);
    }
    return expensesChecked;
}
function editMultiple(checked, action, transferToSheet) {
    if (action === "transfer") {
        for (let id of expensesChecked) {
            const expense = getExpenseById(id);
            expense.sheetId = transferToSheet;
        }
    }
    if (action === "delete") {
        for (let id of expensesChecked) {
            expansesList = expansesList.filter((e) => e.id !== id);
        }
    }
    save();
    expensesChecked = [];
    return getExpanses();
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
function getSheetById(id) {
    id = Number(id);
    return expensesSheets.find((sheet) => sheet.sheetId === id);
}
export { save, addExpense, getExpanses, removeExpense, getExpenseById, cardsList, id, addExpensesSheet, expensesSheets, removeExpensesSheet, checkMultiple, expensesChecked, editMultiple, getSheetById, };
