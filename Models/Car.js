const CustomORM = require("../utils/ORM.js");
class Car {
    constructor(registration_no){
        this.registration_no = registration_no;
    }
    constructor(registration_no, slot, park_timestamp){
        this.registration_no = registration_no
        this.slot = slot
        this.park_timestamp = park_timestamp 
    }
    park(registration_no) => {
        const orm = new CustomORM();
    }
}