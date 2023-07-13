export class Animal {
    move() {
        console.log("moving...")
    }
}

export class Dog extends Animal{
    move(able?: boolean){
        if(able === undefined || able === false){
            super.move();
        }else{
            console.log("aaa")
        }
    }
}

const p = new Dog();
p.move();

