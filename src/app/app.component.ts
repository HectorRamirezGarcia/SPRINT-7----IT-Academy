import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular_1_SPRINT_7';
  price_total = "0";

  webform_calc = new FormGroup({
    pages: new FormControl(0),
    idioms: new FormControl(0),
  });

  event_checkbox(event: any, id: string) {
    const option_selected = <HTMLInputElement>document.getElementById("check_" + id);
    const price = <HTMLInputElement>document.getElementById("price");
    if (event.target.checked == true) {
      document.getElementById("card")!.style.display = "block";
      this.price_total = String(parseInt(option_selected.textContent!.substring(option_selected.textContent!.length - 5, option_selected.textContent!.length - 2)) + parseInt(this.price_total)); // Calculo suma entre el precio que seleccionamos y total.
      price.textContent = this.price_total;
    } else {
      document.getElementById("card")!.style.display = "none";
      this.price_total = String(parseInt(this.price_total) - parseInt(option_selected.textContent!.substring(option_selected.textContent!.length - 5, option_selected.textContent!.length - 2))); // Calculo resta entre el precio que seleccionamos y total.
      price.textContent = this.price_total;
    }

  }

  updatePriceWeb() {
    const price = <HTMLInputElement>document.getElementById("price");
    price.textContent = String(this.webform_calc.value.pages! *  this.webform_calc.value.idioms! * 30 + parseInt(this.price_total))
    
  }

  
}





