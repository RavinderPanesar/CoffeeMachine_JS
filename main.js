//Coffee machine simulator
//Coded by: Ravinder Singh

// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

//Coffee Machine constructor
function CoffeeMachine(water, milk, coffeeBeans, disposableCups, money) {
    this.water = water;
    this.milk = milk;
    this.coffeeBeans = coffeeBeans;
    this.disposableCups = disposableCups;
    this.money = money;
}

//prints machine details regarding qty of ingredients and money
function printMachineStatus(CoffeeMachine) {
    console.log(`\nThe coffee machine has:
${CoffeeMachine.water} ml of water
${CoffeeMachine.milk} ml of milk
${CoffeeMachine.coffeeBeans} g of coffee beans
${CoffeeMachine.disposableCups} disposable cups
$${CoffeeMachine.money} of money\n`);
}

//Create CoffeeMachine with Initial values;
let myCoffeeMachine = new CoffeeMachine(400, 540, 120, 9, 550);

//Write action
function whatAction() {
    console.log("Write action (buy, fill, take, remaining, exit):");
    return input();
}

function whatToBuy() {
    console.log("\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:");
    return Number(input());
}

function addWater() {
    console.log("\nWrite how many ml of water you want to add:");
    return Number(input());
}

function addMilk() {
    console.log("Write how many ml of milk you want to add:");
    return Number(input());
}

function addCoffeeBeans() {
    console.log("Write how many grams of coffee beans you want to add:");
    return Number(input());
}

function addDisposableCups() {
    console.log("Write how many disposable cups you want to add:");
    return Number(input());
}

function isItPossibleToMake(coffeeMachine, type) {
    function checkIfPossible(water, beans, milk, machine) {
        if (!Math.floor(machine.water / water)) {
            console.log(`Sorry, not enough water!\n`);
            return false;
        } else if (!Math.floor(machine.coffeeBeans / beans)) {
            console.log(`Sorry, not enough coffee beans!\n`);
            return false;
        } else if (!Math.floor(machine.milk / milk)) {
            console.log(`Sorry, not enough milk!\n`);
            return false;
        }
        console.log(`I have enough resources, making you a coffee!\n`);
        return true;
    }

    // 1 for espresso
    // 2 for latte
    // 3 for cappuccino
    let waterNeeded = 0;
    let milkNeeded = 0;
    let coffeeBeansNeeded = 0;
    let isPossible = false;
    switch (Number(type)) {
        case 1:
            waterNeeded = 250;
            milkNeeded = 0;
            coffeeBeansNeeded = 16;
            isPossible = checkIfPossible(waterNeeded, coffeeBeansNeeded, milkNeeded, coffeeMachine);
            break;
        case 2:
            waterNeeded = 350;
            milkNeeded = 75;
            coffeeBeansNeeded = 20;
            isPossible = checkIfPossible(waterNeeded, coffeeBeansNeeded, milkNeeded, coffeeMachine);

            break;
        case 3:
            waterNeeded = 200;
            milkNeeded = 100;
            coffeeBeansNeeded = 12;
            isPossible = checkIfPossible(waterNeeded, coffeeBeansNeeded, milkNeeded, coffeeMachine);
            break;
    }
    return isPossible;
}

function adjustIngredients(teaType, coffeeMachine) {
    // 1 for espresso
    // 2 for latte
    // 3 for cappuccino
    switch (Number(teaType)) {
        case 1:
            if (isItPossibleToMake(coffeeMachine, teaType)) {
                coffeeMachine.water -= 250;
                coffeeMachine.coffeeBeans -= 16;
                coffeeMachine.money += 4;
                coffeeMachine.disposableCups--;
            }
            break;
        case 2:
            if (isItPossibleToMake(coffeeMachine, teaType)) {
                coffeeMachine.water -= 350;
                coffeeMachine.milk -= 75;
                coffeeMachine.coffeeBeans -= 20;
                coffeeMachine.money += 7;
                coffeeMachine.disposableCups--;
            }
            break;
        case 3:
            if (isItPossibleToMake(coffeeMachine, teaType)) {
                coffeeMachine.water -= 200;
                coffeeMachine.milk -= 100
                coffeeMachine.coffeeBeans -= 12;
                coffeeMachine.money += 6;
                coffeeMachine.disposableCups--;
            }
            break;
    }

}

function fillMachine(coffeeMachine) {
    coffeeMachine.water += addWater();
    coffeeMachine.milk += addMilk();
    coffeeMachine.coffeeBeans += addCoffeeBeans();
    coffeeMachine.disposableCups += addDisposableCups();
}

function takeMoney(coffeeMachine) {
    let moneyFromMachine = coffeeMachine.money;
    coffeeMachine.money = 0;
    console.log(`I gave you $${moneyFromMachine}\n`);
}

function remaining() {
    printMachineStatus(myCoffeeMachine);
}

let isRunning = true;

function exit() {
    isRunning = false;
}

function main() {
    let userOption = whatAction();
    while (isRunning) {
        switch (userOption) {
            case "buy":
                let buyOption = whatToBuy();
                adjustIngredients(buyOption, myCoffeeMachine)
                break;
            case "fill":
                fillMachine(myCoffeeMachine);
                break;
            case "take":
                takeMoney(myCoffeeMachine);
                break;
            case "remaining":
                remaining();
                break;
            case "exit":
                exit();
                break;
        }
        if (isRunning) {
            userOption = whatAction();
        }
    }
}

main();

