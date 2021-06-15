import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import slabData from '../tax-year.json'; 

interface Year {
  name: string;
  value: string;
}

interface Slab {  
  id: any;  
  min_amount: any;  
  max_amount: any;  
  fix_tax_amount: any;  
  tax_percent:any;
}  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  income: any;
  yearly_amount: any;
  formControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  years: Year[] = [
    {name: '2022', value: '2021 - 2022'},
    {name: '2021', value: '2020 - 2021'},
    {name: '2021', value: '2020 - 2021'}
  ];

  public monthly_income:any=0;
  public monthly_tax:any=0;
  public monthly_income_after_tax:any=0;
  public yearly_income:any=0;
  public yearly_tax:any=0;
  public yearly_income_after_tax:any=0;
  slabs:Slab[] = slabData;
  
  numberOnly(event:KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  calculateTax(event:any){
    
    this.income = event.target.value;
    this.yearly_income = this.income * 12; 
    let slab = this.slabs.filter(slab => (this.yearly_income >= slab.min_amount && this.yearly_income < slab.max_amount) || (this.yearly_income >= slab.min_amount && slab.max_amount==0))[0]
    this.monthly_income = Number(this.income);
    let exceed_amount =  this.yearly_income-Number(slab.min_amount);
    
    this.yearly_tax = Number(slab.fix_tax_amount) + (exceed_amount*(slab.tax_percent / 100));
    this.monthly_income = Number(this.income);
    this.monthly_tax = Number(this.yearly_tax/12);
    this.monthly_income_after_tax = Number(this.monthly_income-this.monthly_tax);
    this.yearly_income = Number(this.yearly_income);
    this.yearly_tax = Number(this.yearly_tax);
    this.yearly_income_after_tax = Number(this.yearly_income-this.yearly_tax);
    
  }

}
// slabs.filter(slab => value >slab.min && value<=slab.max)