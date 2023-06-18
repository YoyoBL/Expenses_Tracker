import { Expanse } from "./interfaces/expanse.interface";
import { ExpensesSheet } from "./interfaces/expenses-sheets.interface";

export function newExpenseData() {
   let expensesSheets: ExpensesSheet[] = localStorage.getItem("expenses-sheets")
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
   let expansesList: Expanse[] = expensesLocalStorage
      ? JSON.parse(expensesLocalStorage, (key, value) => {
           if (key === "createdAt") {
              return new Date(value);
           }
           return value;
        })
      : [];

   function getExpanses() {
      return expansesList;
   }

   function save() {
      localStorage.setItem("expenses-sheets", JSON.stringify(expensesSheets));
      localStorage.setItem("sheets-id-counter", String(sheetId));

      localStorage.setItem("expenses", JSON.stringify(getExpanses()));
      localStorage.setItem("id-counter", String(id));
   }

   function getExpenseById(id: number): Expanse {
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

   function addExpensesSheet(sheetName: string): ExpensesSheet {
      const newSheet: ExpensesSheet = {
         sheetId: sheetId++,
         sheetName,
      };
      expensesSheets = [...expensesSheets, newSheet];
      save();
      return newSheet;
   }
   function removeExpensesSheet(sheetId: number) {
      expensesSheets = expensesSheets.filter((e) => e.sheetId !== sheetId);
      expansesList = expansesList.filter((e) => e.sheetId !== sheetId);
      save();
      return expensesSheets;
   }

   function addExpense(
      sheetId: number = 1,
      title: string,
      price: number,
      cardNumber: number | string
   ): Expanse {
      const newExpanse: Expanse = {
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

   function removeExpense(id: number) {
      let removed = getExpenseById(id);
      expansesList = expansesList.filter((expense) => expense.id !== id);
      save();
      return removed;
   }

   function cardsList(): (number | string)[] {
      const allCardsList: (number | string)[] = expansesList.map(
         (expense) => expense.cardNumber
      );
      let cardsList: (number | string)[] = [];
      for (let i = 0; i < allCardsList.length; i++) {
         if (cardsList.indexOf(allCardsList[i]) === -1) {
            cardsList.push(allCardsList[i]);
         }
      }

      return cardsList;
   }

   return {
      save,
      addExpense,
      getExpanses,
      removeExpense,
      getExpenseById,
      cardsList,
      id,
      addExpensesSheet,
      expensesSheets,
      removeExpensesSheet,
   };
}
