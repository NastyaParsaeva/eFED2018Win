/*
2.	Создать цепочку прототипов для следующих объектов: 

Vehical - обобщеное траспортное средство с полями:
speed - скорость перемещения

Bike - мотоцикл с полями:
wheelsCount = 2- количество колес

Car - автомобиль с полями:
wheelsCount - количество колес
doorsCount - количество дверей

MonsterTruck - автомобиль( https://en.wikipedia.org/wiki/Monster_truck ) с полями:
wheelsSize - размер колес

Таким образом, чтобы были определены:
Bike.speed,
Car.speed,
MonsterTruck.speed,
MonsterTruck.wheelsCount,
MonsterTruck.doorsCount
*/

function Vehical(speed) {
    this.speed = speed;
}

Vehical.prototype.getSpeed = function() {
    return this.speed;
};

function Bike(speed) {
    Vehical.apply(this, arguments);
    this.wheelsCount = 2;
}

Bike.prototype = Object.create(Vehical.prototype);

function Car(speed, wheelsCount, doorsCount) {
    Vehical.apply(this, arguments);
    this.wheelsCount = wheelsCount;
    this.doorsCount = doorsCount;
}

Car.prototype = Object.create(Vehical.prototype);

function MonsterTruck(speed, wheelsCount, doorsCount, wheelsSize) {
    Car.apply(this, arguments);
    this.wheelsSize = wheelsSize;
}

MonsterTruck.prototype = Object.create(Car.prototype);

const myVehical = new Vehical(50);
console.log(`myVehical speed is ${myVehical.speed}`);
console.log(myVehical instanceof Vehical);


const myBike = new Bike(90);
console.log(`myBike speed is ${myBike.speed}`);
console.log(`myBike wheels count is ${myBike.wheelsCount}`); 
console.log(myBike instanceof Vehical);
console.log(myBike instanceof Bike);

const myCar = new Car(150, 6, 3);
console.log(`myCar speed is ${myCar.speed}`);
console.log(`myCar wheels count is ${myCar.wheelsCount}`);
console.log(`myCar doors count is ${myCar.doorsCount}`);

const myMonsterTruck = new MonsterTruck(300, 5, 4, 100);
console.log(`myMonsterTruck speed is ${myMonsterTruck.speed}`);
console.log(`myMonsterTruck wheels count is ${myMonsterTruck.wheelsCount}`);
console.log(`myMonsterTruck doors count is ${myMonsterTruck.doorsCount}`);
console.log(`myMonsterTruck wheels size is ${myMonsterTruck.wheelsSize}`);
console.log(`myMonsterTruck get speed ${myMonsterTruck.getSpeed()}`);