const numbers = document.getElementsByClassName("number");
console.log(numbers)
const operators = document.getElementsByClassName("operator");
console.log(operators)
const displayValue = document.getElementById("display-numbers");
console.log( displayValue)
const deletebtn = document.getElementById("del");
console.log(deletebtn)
const deleteAllbtn = document.getElementById("delall");
console.log(deleteAllbtn)
const historyBtn = document.getElementById("history");
console.log(historyBtn)
const historyPage = document.getElementById("history-p");
console.log(historyPage)
console.log("helllllllllllllllllo")

let number1 = "";
let number2 = "";
let operatorValue = "";
let result = 0;


const deleteHistory=()=>{
    historyPage.innerHTML="";
}

// تابع ذخیره محاسبات در localStorage
const saveCalculation = (expression, result) => {
    const calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];

    // اضافه کردن محاسبه جدید
    calcHistory.push({ expression: expression, result: result });

    // محدود کردن تاریخچه به ۵ مورد
    if (calcHistory.length > 5) {
        calcHistory.shift(); // حذف اولین مورد قدیمی
        console.log("yessssssssssss")
    }

    // ذخیره‌سازی تاریخچه محدود شده
    localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
};

const historyCalc = () => {
    const isToggle = historyPage.classList.toggle("active");

    // پاک کردن محتوای قبلی
    historyPage.innerHTML = "";

    const svgJSX = `
        <svg class="svgclass" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
            <path d="M 42 5 L 32 5 L 32 3 C 32 1.347656 30.652344 0 29 0 L 21 0 C 19.347656 0 18 1.347656 18 3 L 18 5 L 8 5 C 7.449219 5 7 5.449219 7 6 C 7 6.550781 7.449219 7 8 7 L 9.085938 7 L 12.695313 47.515625 C 12.820313 48.90625 14.003906 50 15.390625 50 L 34.605469 50 C 35.992188 50 37.175781 48.90625 37.300781 47.515625 L 40.914063 7 L 42 7 C 42.554688 7 43 6.550781 43 6 C 43 5.449219 42.554688 5 42 5 Z M 20 44 C 20 44.554688 19.550781 45 19 45 C 18.449219 45 18 44 L 18 11 C 18 10.449219 18.449219 10 19 10 C 19.550781 10 20 10.449219 20 11 Z M 20 3 C 20 2.449219 20.449219 2 21 2 L 29 2 C 29.550781 2 30 2.449219 30 3 L 30 5 L 20 5 Z M 26 44 C 26 44.554688 25.550781 45 25 45 C 24.449219 45 24 44.554688 24 44 L 24 11 C 24 10.449219 24.449219 10 25 10 C 25.550781 10 26 10.449219 26 11 Z M 32 44 C 32 44.554688 31.554688 45 31 45 C 30.445313 45 30 44.554688 30 44 L 30 11 C 30 10.449219 30.445313 10 31 10 C 31.554688 10 32 10.449219 32 11 Z"></path>
        </svg>`;

    if (isToggle) {
        const calcHistory = JSON.parse(localStorage.getItem("calcHistory"));

        
        // افزودن آیکن در بالای تاریخچه
        const iconElement = document.createElement('div');
        iconElement.innerHTML = svgJSX;
        iconElement.style.position = "absolute";
        iconElement.style.bottom = "10px";
        iconElement.style.right = "10px";
        iconElement.style.cursor = "pointer";

     



        historyPage.appendChild(iconElement);
       



        iconElement.addEventListener('click', () => {
            localStorage.removeItem("calcHistory"); // پاک کردن تاریخچه
            historyPage.innerHTML = ""; // پاک کردن محتوای historyPage
            historyPage.innerHTML = "<p>No calculations found in local storage.</p>"; // نمایش پیام مناسب
            console.log('History cleared.');
        });
        historyPage.appendChild(iconElement);
        if (calcHistory && calcHistory.length > 0) {
            // ایجاد یک لیست برای نمایش محاسبات
            const ulElement = document.createElement('ul');

            calcHistory.forEach(item => {
                const { expression, result } = item;

                // نمایش صحیح عبارت محاسباتی و نتیجه در هر آیتم از لیست
                const liElement = document.createElement('li');
                liElement.innerHTML = `<strong>${expression}</strong> = <strong>${result}</strong>`;
                liElement.classList.add('lists');

                ulElement.appendChild(liElement);
            });

            historyPage.appendChild(ulElement);
        } else {
            historyPage.innerHTML += "<p>No calculations found in local storage.</p>";
        }
    } else {
        console.log('historyPage is not active.');
    }
};


// تابع فرمت کردن عدد (افزودن ویرگول)
const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// تابع انجام محاسبه و نمایش نتیجه
const calculate = () => {
    // تبدیل رشته‌های عددی به اعداد
    number1 = parseFloat(number1.replace(/,/g, ""));
    number2 = parseFloat(number2.replace(/,/g, ""));

    let expression = `${number1} ${operatorValue} ${number2}`;

    if (operatorValue === "+") {
        result = number1 + number2;
    } else if (operatorValue === "-") {
        result = number1 - number2;
    } else if (operatorValue === "*") {
        result = number1 * number2;
    } else if (operatorValue === "/") {
        result = number1 / number2;
    }


    // نمایش نتیجه در نمایشگر
    displayValue.value = formatNumber(result);
    console.log(result)

    // ذخیره عبارت محاسباتی و نتیجه در localStorage
    saveCalculation(expression, result);

    // بازنشانی متغیرها برای محاسبه جدید
    number1 = "";
    number2 = "";
    operatorValue = "";
};

// حذف عدد آخر از ورودی
const deleteNumber = () => {
    let valuee = displayValue.value;
    let updatedNumber = valuee.slice(0, -1);

    displayValue.value = updatedNumber ? formatNumber(updatedNumber) : "0";
};

// حذف کل اعداد از ورودی
const deleteAllNumber = () => {
    number1 = "";
    number2 = "";
    operatorValue = "";
    displayValue.value = "0";
};

// ثبت عملگرها
const operatorBtn = (event) => {
    operatorValue = event.target.innerText;
};

// دریافت اعداد از کاربر
const getNumbers = (event) => {
    console.log("wh")
    if (operatorValue === "") {
        number1 += event.target.innerText;
        displayValue.value = formatNumber(number1);
        console.log(number1)
    } else {
        number2 += event.target.innerText;
        displayValue.value = formatNumber(number2);
        console.log(number2)
    }
};

// فراخوانی توابع
Array.from(numbers).forEach((num1) => {
    num1.addEventListener("click", getNumbers);
});

Array.from(operators).forEach(op => {
    if (op.innerText === "=") {
        op.addEventListener("click", calculate);
    } else {
        op.addEventListener("click", operatorBtn);
    }
});

deletebtn.addEventListener("click", deleteNumber);
deleteAllbtn.addEventListener("click", deleteAllNumber);
historyBtn.addEventListener("click", historyCalc);

