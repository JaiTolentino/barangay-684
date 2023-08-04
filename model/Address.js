class Address{
    constructor(resident_id, address_line_1, address_line_2,city){
        this.resident_id = resident_id;
        this.address_line_1 = address_line_1;
        this.address_line_2 = address_line_2;
        this.city = city
    }
    getResidentId(){
        return this.resident_id;
    }
    setResidentId(resident_id){
        this.resident_id = resident_id;
    }
    getAddressLine1(){
        return this.address_line_1;
    }
    setAddressLine1(address_line_1){
        this.address_line_1 = address_line_1;
    }
    getAddressLine2(){
        return this.address_line_2;
    }
    setAddressLine2(address_line_2){
        this.address_line_2 = address_line_2;
    }
    getCity(){
        return this.city
    }
    setCity(city){
        this.city = city;
    }

     getFullAddress() {
        return this.address_line_1 + " " + this.address_line_2 + ", " + this.city;
    }
}
module.exports = Address;