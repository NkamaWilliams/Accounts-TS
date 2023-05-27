var accounts = /** @class */ (function () {
    function accounts(_name, _amount, _password) {
        if (_amount === void 0) { _amount = 0; }
        this._name = _name;
        this._amount = _amount;
        this._password = _password;
        this._name = _name;
        this._balance = _amount;
        this._accountNumber = padStart(9, '0', (Math.floor(Math.random() * 999999999)).toString());
        this._password = _password;
    }
    accounts.prototype.getName = function () { return this._name; };
    accounts.prototype.getBalance = function () { return this._balance; };
    accounts.prototype.getAccountNumber = function () { return this._accountNumber; };
    accounts.prototype.getPassword = function () { return this._password; };
    accounts.prototype.setBalance = function (num) {
        this._balance = num;
    };
    accounts.prototype.deposit = function (amount) {
        this.setBalance(this._balance + amount);
    };
    accounts.prototype.withdraw = function (amount) {
        if (this._balance < amount) {
            return false;
        }
        else {
            this.setBalance(this._balance - amount);
            return true;
        }
    };
    accounts.prototype.transfer = function (destination, password, amount) {
        if (this._balance >= amount && this._password === password) {
            destination.deposit(amount);
            this.withdraw(amount);
            return true;
        }
        return false;
    };
    return accounts;
}());
function padStart(num, pad, word) {
    if (word.length >= num) {
        return word;
    }
    var pads = "";
    for (var i = 0; i < Math.abs(word.length - num); i++) {
        pads = pads.concat(pad);
    }
    pads = pads.concat(word);
    return pads;
}
var names = localStorage.getItem("name");
var password = localStorage.getItem("password");
names = names === null ? "" : names;
password = password === null ? "" : password;
var myAcc = new accounts(names, 0, password);
var testAcc = new accounts("Test Account", 58000, "1234");
var accList = [myAcc, testAcc];
function start() {
    document.querySelectorAll(".acc")[0].querySelectorAll('span')[0].innerHTML = "".concat(myAcc.getName());
    document.querySelectorAll(".acc")[0].querySelectorAll('span')[1].innerHTML = "".concat(myAcc.getAccountNumber());
    document.querySelectorAll(".acc")[0].querySelectorAll('span')[2].innerHTML = "".concat(myAcc.getBalance());
    document.querySelectorAll(".acc")[1].querySelectorAll('span')[0].innerHTML = "".concat(testAcc.getName());
    document.querySelectorAll(".acc")[1].querySelectorAll('span')[1].innerHTML = "".concat(testAcc.getAccountNumber());
    document.querySelectorAll(".acc")[1].querySelectorAll('span')[2].innerHTML = "".concat(testAcc.getBalance());
}
function toggleAction(id) {
    var _a;
    var actions = (_a = document.querySelector(".op")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("p");
    for (var i = 0; i < 3; i++) {
        if (actions) {
            actions[i].classList.remove("active");
            document.querySelectorAll("form")[i].classList.remove("active");
            if (actions[i] == id) {
                document.querySelectorAll("form")[i].classList.add("active");
            }
        }
    }
    id.classList.add("active");
}
function transfer(id) {
    var amount = id.querySelectorAll("input")[0].value, recipient = id.querySelectorAll("input")[1].value, password = id.querySelectorAll("input")[3].value;
    if (/^[0-9]+$/.test(amount) && /^[0-9]+$/.test(recipient)) {
        accList.forEach(function (i) {
            if (i.getAccountNumber() === recipient) {
                myAcc.transfer(i, password, Number(amount)) ? console.log("Confirmed") : alert("Invalid transfer");
            }
        });
    }
    start();
    clear();
    return false;
}
function deposit(id) {
    var amount = id.querySelectorAll("input")[0].value, password = id.querySelectorAll("input")[1].value;
    if (/^[0-9]+$/.test(amount) && password === myAcc.getPassword()) {
        myAcc.deposit(Number(amount));
        console.log("Deposit confirmed");
    }
    else {
        alert("Invalid deposit");
    }
    start();
    clear();
    return false;
}
function withdraw(id) {
    var amount = id.querySelectorAll("input")[0].value, password = id.querySelectorAll("input")[1].value;
    if (/^[0-9]+$/.test(amount) && password === myAcc.getPassword()) {
        myAcc.withdraw(Number(amount));
        console.log("Withdraw confirmed");
    }
    else {
        alert("Invalid withdrawal");
    }
    start();
    clear();
    return false;
}
function clear() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
