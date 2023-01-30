import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { operator } from './operator';
import { Forms } from './forms';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
	arrForms : any;
	
	constructor(private modalService: NgbModal) { }

	title = 'Angular_1_SPRINT_7';
	price_total = "0";

	presupuesto = Array.from({length: 0}, () => ({nform : "", nuser : "", price : ""}));

	user_info = new FormGroup({
		name: new FormControl(""),
		name_presu: new FormControl(""),
	});

	webform_calc = new FormGroup({
		pages: new FormControl(0),
		idioms: new FormControl(0),
	});

	ngOnInit() { }

	event_checkbox(event: any, id: string) {

		const option_selected = <HTMLInputElement>document.getElementById("check_" + id);
		const price = <HTMLInputElement>document.getElementById("price");
		if (event.target.checked == true) {
			document.getElementById("card")!.style.display = "block";
			this.price_total = String(parseInt(option_selected.textContent!.substring(option_selected.textContent!.length - 5, option_selected.textContent!.length - 2)) + parseInt(this.price_total)); // Calculo suma entre el precio que seleccionamos y total.
			price.textContent = this.price_total;

		} else {
			if (id == "0") { document.getElementById("card")!.style.display = "none"; }
			this.price_total = String(parseInt(this.price_total) - parseInt(option_selected.textContent!.substring(option_selected.textContent!.length - 5, option_selected.textContent!.length - 2))); // Calculo resta entre el precio que seleccionamos y total.
			price.textContent = this.price_total;
		}
		this.updatePriceWeb();
	}

	updatePriceWeb() {
		const price = <HTMLInputElement>document.getElementById("price");
		price.textContent = String(this.webform_calc.value.pages! * this.webform_calc.value.idioms! * 30 + parseInt(this.price_total));
	}

	update_info_user() {
		const username = <HTMLInputElement>document.getElementById("name_f");
		username.textContent = String(this.user_info.value.name);
		const namepresu = <HTMLInputElement>document.getElementById("name_presu_f");
		namepresu.textContent = String(this.user_info.value.name_presu);
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
		const nform = this.user_info.value.name_presu!;
		const nuser = this.user_info.value.name!;
		const price = document.getElementById("price")?.textContent!;
		Forms.addContent(nform, nuser, price);
		this.loadtopresu();
	}

	loadtopresu() {
		this.arrForms = Forms.loadContent();
	}

	filter(type : string){
		this.arrForms = this.arrForms.sort((a : any, b: any) => {
			if(type == "alfabetic") {
				if (a.name_form < b.name_form) return -1;
				else if (a.name_form > b.name_form) return 1;
				else return 0;
			}
			else if(type == "date" || type == "restart") {
				if (a.date < b.date) return -1;
				else if (a.date > b.date) return 1;
				else return 0;
			} else {
				return 0;
			}
		});
	}

}
