import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { operator } from './operator';
import { Forms } from './forms';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
	//ViewsChild
	@ViewChild('pageWeb', { static: true }) pageWeb: ElementRef<HTMLInputElement> | undefined;
	@ViewChild('consultoriaSEO', { static: true }) consultoriaSEO: ElementRef<HTMLInputElement> | undefined;
	@ViewChild('googleAds', { static: true }) googleAds: ElementRef<HTMLInputElement> | undefined;
	@ViewChild('paginas', { static: true }) paginas: ElementRef<HTMLInputElement> | undefined;
	@ViewChild('idiomas', { static: true }) idiomas: ElementRef<HTMLInputElement> | undefined;
	

	//Variables
	title = 'Angular_1_SPRINT_7';
	price_total = 0;
	array_Prices = [{id: 1, price: 500}, {id:2, price: 300}, {id: 3, price: 200}];
	arrForms : any;
	arrForms_save : any;
	error : boolean | undefined;
	div_check_error : boolean | undefined;

	group_input : FormGroup;
	user_info : FormGroup;
	webform_calc : FormGroup;
	
	constructor(private modalService: NgbModal) {
		this.group_input = new FormGroup({
			input_NP: new FormControl(""),
		});
		this.user_info = new FormGroup({
			name: new FormControl("", [
				Validators.required,
				Validators.minLength(1),
			]),
			name_presu: new FormControl("", [
				Validators.required,
				Validators.minLength(1),
			]),
		});
		this.webform_calc = new FormGroup({
			pages: new FormControl(0),
			idioms: new FormControl(0),
		});
		this.error = false;
	}

	get name(): AbstractControl {
		return this.user_info.get('name')!;
	}
	

	ngOnInit() {}

	event_checkbox(event: any, id:any) {
		this.div_check_error = true;
		const price = <HTMLInputElement>document.getElementById("price");
		if (event.checked == true) {
			document.getElementById("card")!.style.display = "block";
			this.price_total += this.array_Prices[id].price;
			price.textContent = String(this.price_total);
		} else {
			if (this.pageWeb!.nativeElement.checked == false) { document.getElementById("card")!.style.display = "none"; }
			this.price_total -= this.array_Prices[id].price;
			price.textContent = String(this.price_total);
		}
		this.updatePriceWeb();
	}

	updatePriceWeb() {
		const price = <HTMLInputElement>document.getElementById("price");
		price.textContent = String(this.webform_calc.value.pages! * this.webform_calc.value.idioms! * 30 + this.price_total);
	}

	cacule(type: string, oper: string) {
		const operations = { "+": operator.add, "-": operator.sub }
		if (oper == "+") { this.webform_calc.get(type)?.setValue(operations[oper](this.webform_calc.get(type)?.value, 1)); }
		else if (oper == "-") { this.webform_calc.get(type)?.setValue(operations[oper](this.webform_calc.get(type)?.value, 1)); }
		this.updatePriceWeb();
	}

	openModal(content: any) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
	}

	addtoForms(){
		if(this.user_info.value.name_presu != "" && this.user_info.value.name! != "" && document.getElementById("price")?.textContent! != "0"){	
			Forms.addContent(this.user_info.value.name_presu!, this.user_info.value.name!, document.getElementById("price")?.textContent!);
			this.loadtopresu();
		}
	}

	loadtopresu() {
		this.arrForms = Forms.loadContent();
		this.arrForms_save = Forms.loadContent();
	}

	filter(type : string){
			this.arrForms = this.arrForms.sort((a : any, b: any) => {
			if(type == "alfabetic") {
				if (a.name_form < b.name_form) return -1;
				else if (a.name_form > b.name_form) return 1;
				else return 0;
			}
			else if(type == "date") {
				if (a.date > b.date) return -1;
				else if (a.date < b.date) return 1;
				else return 0;
			} else {
				if (a.date < b.date) return -1;
				else if (a.date > b.date) return 1;
				else return 0;
			}
		});
	}

	inputNameChange() {
		this.arrForms = this.arrForms_save;
		try {
			if(this.group_input.value.input_NP != "") {
				if (this.arrForms.find((presu: {name_form: string | undefined }) => presu.name_form === this.group_input.value.input_NP) == undefined) {
					throw new Error('');
				} else {
					this.arrForms = [this.arrForms.find((presu: {name_form: string | undefined }) => presu.name_form === this.group_input.value.input_NP)];
					this.error = false;
				}
				
			} else {
				this.arrForms = this.arrForms_save;
			}

		} catch(e) {
			this.error = true;
			return;
		}
	}

}
