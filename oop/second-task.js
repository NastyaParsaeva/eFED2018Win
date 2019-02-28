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

function Bike(speed) {
    Vehical.call(this, speed);
    this.wheelsCount = 2;
}

function Car(speed, wheelsCount, doorsCount) {
    Vehical.call(this, speed);
    this.wheelsCount = wheelsCount;
    this.doorsCount = doorsCount;
}

function MonsterTruck(speed, wheelsCount, doorsCount, wheelsSize) {
    Car.call(this, speed, wheelsCount, doorsCount);
    this.wheelsSize = wheelsSize;
}

const myVehical = new Vehical(50);
console.log(`myVehical speed is ${myVehical.speed}`);

const myBike = new Bike(90);
console.log(`myBike speed is ${myBike.speed}`);
console.log(`myBike wheels count is ${myBike.wheelsCount}`); 

const myCar = new Car(150, 6, 3);
console.log(`myCar speed is ${myCar.speed}`);
console.log(`myCar wheels count is ${myCar.wheelsCount}`);
console.log(`myCar doors count is ${myCar.doorsCount}`);

const myMonsterTruck = new MonsterTruck(300, 5, 4, 100);
console.log(`myMonsterTruck speed is ${myMonsterTruck.speed}`);
console.log(`myMonsterTruck wheels count is ${myMonsterTruck.wheelsCount}`);
console.log(`myMonsterTruck doors count is ${myMonsterTruck.doorsCount}`);
console.log(`myMonsterTruck wheels size is ${myMonsterTruck.wheelsSize}`);