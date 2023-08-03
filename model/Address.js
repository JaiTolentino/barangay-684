class Address{
    constructor(resident_id, address_line_1, address_line_2, barangay, city, country){
        this.resident_id = resident_id;
        this.address_line_1 = address_line_1;
        this.address_line_2 = address_line_2;
        this.barangay = barangay;
        this.city = city
        this.country = country;
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
    getBarangay(){
        return this.barangay;
    }
    setBarangay(barangay){
        this.barangay = barangay;
    }
    getCity(){
        return this.city
    }
    setCity(city){
        this.city = city;
    }
    getCountry(){
        return this.country;
    }
    setCountry(country){
        this.country = country;
    }
     getFullAddress() {
        return this.address_line_1 + " " + this.address_line_2 + " " + this.barangay + " " + this.country;
    }
}
module.exports = Address;