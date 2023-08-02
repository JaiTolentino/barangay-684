class Address{
    constructor(address_line_1, address_line_2, barangay, country){
        this.address_line_1 = address_line_1;
        this.address_line_2 = address_line_2;
        this.barangay = barangay;
        this.country = country;
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