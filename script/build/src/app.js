import { newExpenseData } from "../build/data.js";
const $addExpanseBtn = document.getElementById("add-expanse-btn");
$addExpanseBtn === null || $addExpanseBtn === void 0 ? void 0 : $addExpanseBtn.addEventListener("click", () => {
    newExpenseData();
});
