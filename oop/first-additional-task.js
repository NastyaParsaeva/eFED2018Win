/*
1.	*Используя прототипное наследование  создать иерархию классов для объектов из задания 1 с дополнениями):
Vehical 
	Добавить функции move увеличивающий скорость на 1 и stop обнуляющий скорость
Bike	Переопределить фукнцию move таким образом, что бы при ускорении (вызов move), 
кроме изменения скорости, в консоль приходили "звуки" разгона.
Car	Добавить фунции openDoor, которая 'открывает' одну дверь и выводит в консоль 
количество открытых дверей, и closeDoor , которая 'закрывает' одну дверь и выводит в консоль 
количество закрытых дверей. Число должо быть больше или равно 0 И меньше или равно количеству дверей.
MonsterTruck	Вызов фунции openDoor должен делать то же самое что и у Car, но через 1 секунду

+ Для каждого из классов переопределить методы toString и valueOf

+ Вести счет созданных объектов класса Car, используя статическое поле или метод
*/

function Vehical(speed) {
    this.speed = speed;
}

Vehical.prototype.move = function() {
    this.speed += 1;
};
Vehical.prototype.stop = function() {
    this.speed = 0;
};

function Bike(speed) {
    Vehical.apply(this, arguments);
    this.wheelsCount = 2;
}

Bike.prototype = Object.create(Vehical.prototype);

Bike.prototype.move = function() {
    Vehical.prototype.move.call(this);
    console.log('noise');
};


function Car(speed, wheelsCount, doorsCount) {
    Vehical.apply(this, arguments);
    this.wheelsCount = wheelsCount;
    this.doorsCount = doorsCount;
    this.openedDoorsCount = 0;
}

Car.prototype = Object.create(Vehical.prototype);

Car.prototype.openDoor = function() {
    if (this.openedDoorsCount < this.doorsCount) {
        this.openedDoorsCount ++;
    }
    console.log(`Opened doors count is ${this.openedDoorsCount}`);
};
Car.prototype.closeDoor = function() {
    if (this.openedDoorsCount > 0) {
        this.openedDoorsCount--; 
    }
    console.log(`Closed doors count is ${this.doorsCount - this.openedDoorsCount}`);
};

function MonsterTruck(speed, wheelsCount, doorsCount, wheelsSize) {
    Car.apply(this, arguments);
    this.wheelsSize = wheelsSize;
}
/*
Вызов фунции openDoor должен делать то же самое что и у Car, но через 1 секунду*/


MonsterTruck.prototype = Object.create(Car.prototype);

MonsterTruck.prototype.openDoor = function() {
    setTimeout(Car.prototype.openDoor.call(this), 1000);
};

const myVehical = new Vehical(50);
// console.log(`myVehical speed is ${myVehical.speed}`);
// console.log(myVehical instanceof Vehical);
// myVehical.move();
// console.log(`myVehical speed is ${myVehical.speed}`);


const myBike = new Bike(90);
// console.log(`myBike speed is ${myBike.speed}`);
// myBike.move();
// console.log(`myBike speed is ${myBike.speed}`);
// console.log(`myBike wheels count is ${myBike.wheelsCount}`); 
// console.log(myBike instanceof Vehical);
// console.log(myBike instanceof Bike);

const myCar = new Car(150, 6, 3);
// console.log(`myCar speed is ${myCar.speed}`);
// console.log(`myCar doors count is ${myCar.doorsCount}`);
// myCar.closeDoor();
// myCar.openDoor();
// myCar.openDoor();
// myCar.openDoor();
// myCar.openDoor();
// myCar.closeDoor();
// myCar.closeDoor();
// myCar.closeDoor();
// myCar.closeDoor();
// console.log(`myCar wheels count is ${myCar.wheelsCount}`);
// console.log(`myCar doors count is ${myCar.doorsCount}`);

const myMonsterTruck = new MonsterTruck(300, 5, 4, 100);
// console.log(`myMonsterTruck speed is ${myMonsterTruck.speed}`);
// console.log(`myMonsterTruck wheels count is ${myMonsterTruck.wheelsCount}`);
console.log(`myMonsterTruck doors count is ${myMonsterTruck.doorsCount}`);
myMonsterTruck.openDoor();
// myMonsterTruck.openDoor();
// myMonsterTruck.openDoor();
// myMonsterTruck.openDoor();
// myMonsterTruck.openDoor();
// myMonsterTruck.openDoor();

// console.log(`myMonsterTruck wheels size is ${myMonsterTruck.wheelsSize}`);