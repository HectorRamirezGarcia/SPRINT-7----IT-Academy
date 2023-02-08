export class Forms {

    static arrForms = Array.from({length: 0}, () => ({name_form: "", name_user: "", price: "", date: ""}));
    static repeats : boolean;

    static addContent(nform : string, nuser : string, price : string){
        console.log(Forms.arrForms.find((name_form) => name_form.name_form === nform))
        if(Forms.arrForms.find((name_form) => name_form.name_form === nform) == undefined){
            Forms.arrForms.push({name_form : nform, name_user : nuser, price : price, date : String(new Date())});
            Forms.repeats = false;
        } else { Forms.repeats = true;}
    }

    static loadContent(){
        return this.arrForms;
    }
}