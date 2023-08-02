class Disease{
    constructor(disease_id, person_id, disease){
        this.disease_id = disease_id;
        this.person_id = person_id;
        this.disease = disease;
    }
    getDiseaseId(){
        return this.disease_id;
    }
    setDiseaseId(disease_id){
        this.disease_id = disease_id;
    }
    getPersonId(){
        return this.person_id;
    }
    setPersonId(person_id){
        this.person_id = person_id;
    }
    getDisease(){
        return this.disease;
    }
    setDisease(disease){
        this.disease = disease
    }
}
module.exports = Disease;