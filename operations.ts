class accounts{
    private _balance:number
    private _accountNumber:string
    public constructor(private _name:string, private _amount:number = 0, private _password:string){
        this._name = _name
        this._balance = _amount
        this._accountNumber = padStart(9, '0',(Math.floor(Math.random() * 999999999)).toString())
        this._password = _password
    }

    public getName():string{return this._name}
    public getBalance():number{return this._balance}
    public getAccountNumber():string{return this._accountNumber}
    public getPassword(): string{return this._password}

    public setBalance(num:number): void{
        this._balance = num
    }

    public deposit(amount:number):void{
        this.setBalance(this._balance+amount)
    }

    public withdraw(amount:number): boolean{
        if (this._balance < amount){
            return false
        }
        else{
            this.setBalance(this._balance - amount)
            return true
        }
    }

    public transfer(destination:accounts, password:string, amount:number): boolean{
        if (this._balance >= amount && this._password === password){
            destination.deposit(amount)
            this.withdraw(amount)
            return true
        }

        return false
    }
}

function padStart(num:number, pad:string, word:string):string{
    if (word.length >= num){
        return word
    }
    let pads:string = ""
    for (let i = 0; i < Math.abs(word.length - num); i++){
        pads = pads.concat(pad)
    }
    pads = pads.concat(word)
    return pads
}

let names = localStorage.getItem("name")
let password = localStorage.getItem("password")

names = names===null? "":names
password = password===null? "":password

let myAcc = new accounts(names, 0, password)
let testAcc = new accounts("Test Account", 58000, "1234")
const accList = [myAcc, testAcc]

function start(){
    document.querySelectorAll(".acc")[0].querySelectorAll('span')[0].innerHTML = `${myAcc.getName()}`
    document.querySelectorAll(".acc")[0].querySelectorAll('span')[1].innerHTML = `${myAcc.getAccountNumber()}`
    document.querySelectorAll(".acc")[0].querySelectorAll('span')[2].innerHTML = `${myAcc.getBalance()}`

    document.querySelectorAll(".acc")[1].querySelectorAll('span')[0].innerHTML = `${testAcc.getName()}`
    document.querySelectorAll(".acc")[1].querySelectorAll('span')[1].innerHTML = `${testAcc.getAccountNumber()}`
    document.querySelectorAll(".acc")[1].querySelectorAll('span')[2].innerHTML = `${testAcc.getBalance()}`
    console.log("DONE")
}

function toggleAction(id:any){
    let actions = document.querySelector(".op")?.querySelectorAll("p")
    for (let i = 0; i < 3; i++){
        if (actions){
            actions[i].classList.remove("active")
            document.querySelectorAll("form")[i].classList.remove("active")
            if (actions[i] == id){
                document.querySelectorAll("form")[i].classList.add("active")
            }
        }
    }
    id.classList.add("active")
    
}

function transfer(id:any):false{
    let amount = id.querySelectorAll("input")[0].value, recipient = id.querySelectorAll("input")[1].value, password = id.querySelectorAll("input")[3].value
    if (/^[0-9]+$/.test(amount) && /^[0-9]+$/.test(recipient)){
        accList.forEach(i => {
            if (i.getAccountNumber() === recipient){
                myAcc.transfer(i, password, Number(amount))? console.log("Confirmed") : console.log("Invalid transfer")
            }
        })
    }
    start()
    clear()
    return false
}

function deposit(id:any):false{
    let amount = id.querySelectorAll("input")[0].value, password = id.querySelectorAll("input")[1].value
    if (/^[0-9]+$/.test(amount) && password===myAcc.getPassword()){
        myAcc.deposit(Number(amount))
        console.log("Deposit confirmed")
    }
    else{
        console.log("Invalid deposit")
    }
    start()
    clear()
    return false
}

function withdraw(id:any):false{
    let amount = id.querySelectorAll("input")[0].value, password = id.querySelectorAll("input")[1].value
    if (/^[0-9]+$/.test(amount) && password===myAcc.getPassword()){
        myAcc.withdraw(Number(amount))
        console.log("Withdraw confirmed")
    }
    else{
        console.log("Invalid withdraw")
    }
    start()
    clear()
    return false
}

function clear():void{
    let inputs = document.getElementsByTagName("input")
    for (let i = 0; i < inputs.length; i++){
        inputs[i].value = ""
    }
}