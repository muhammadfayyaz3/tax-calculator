import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import slabData from '../tax-year-multiple.json'; 

interface Year {
  name: string;
  value: string;
}

interface Slabs {  
  id: any;  
  min_amount: any;  
  max_amount: any;  
  fix_tax_amount: any;  
  tax_percent:any;
}  
interface Years {  
  id: any;  
  name: any;  
  slabs: any;
}  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {
  }
  income: any;
  yearly_amount: any;
  formControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  public monthly_income:any=0;
  public monthly_tax:any=0;
  public monthly_income_after_tax:any=0;
  public yearly_income:any=0;
  public yearly_tax:any=0;
  public yearly_income_after_tax:any=0;
  years:Years[] = slabData;
  current_year = this.getCurrentTaxYear(1);
  slabs:Slabs[] = this.current_year.slabs
  tax_year = this.current_year.name;
  
  numberOnly(event:KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  loadYearlyData(year:any){
    this.income="";
    let current_year = this.getCurrentTaxYear(year);
    this.tax_year = current_year.name;
    this.slabs = current_year.slabs;
  }
  calculateTax(event:any){
    var year = (<HTMLInputElement>document.getElementById("current_year")).value;

    this.income = event.target.value;
    this.yearly_income = this.income * 12; 
    let yearly_slabs = this.getCurrentTaxYear(year).slabs;
    for(var i = 0; i < yearly_slabs.length; i++){
      var obj = yearly_slabs[i];
      if((this.yearly_income >= obj.min_amount && this.yearly_income < obj.max_amount) ||
          this.yearly_income >= obj.min_amount && obj.max_amount==0){
            this.monthly_income = Number(this.income);
            let exceed_amount =  this.yearly_income-Number(obj.min_amount);
            
            this.yearly_tax = Number(obj.fix_tax_amount) + (exceed_amount*(obj.tax_percent / 100));
            this.monthly_income = Number(this.income);
            this.monthly_tax = Number(this.yearly_tax/12);
            this.monthly_income_after_tax = Number(this.monthly_income-this.monthly_tax);
            this.yearly_income = Number(this.yearly_income);
            this.yearly_tax = Number(this.yearly_tax);
            this.yearly_income_after_tax = Number(this.yearly_income-this.yearly_tax);
      }
    } 
  }
  getCurrentTaxYear(year:any){
    return this.years.filter(item => item.id.toString().indexOf(year) > -1)[0];
  }
}