import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular_1_SPRINT_7';
  
  check_checkbox(id:string){
    const option_selected = <HTMLInputElement> document.getElementById("col_"+id);
    let price = <HTMLInputElement> document.getElementById("price");
    if (check_clicked.checked ==  true) {
      if (id == "0"){
        const price_total = parseInt(price.textContent!) + parseInt();
        price.textContent = String(price_total);
      } 
      if (id == "1"){
        const price_total = parseInt(price.textContent!) + 300;
        price.textContent = String(price_total);
      } 
      if (id == "2"){
        const price_total = parseInt(price.textContent!) + 200;
        price.textContent = String(price_total);
      } 
      
    } else {
      if (id == "0"){
        const price_total = parseInt(price.textContent!) - 500;
        price.textContent = String(price_total);
      } 
      if (id == "1"){
        const price_total = parseInt(price.textContent!) - 300;
        price.textContent = String(price_total);
      } 
      if (id == "2"){
        const price_total = parseInt(price.textContent!) - 200;
        price.textContent = String(price_total);
      } 
    } 

    }
  }

