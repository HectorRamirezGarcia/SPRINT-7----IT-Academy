export class Forms {

    static arrForms = Array.from({length: 0}, () => ({}));

    static addContent(nform : string, nuser : string, price : string){
        Forms.arrForms.push({name_form : nform, name_user : nuser, price : price});
    }

    static loadContent(){
        return this.arrForms;
    }
}