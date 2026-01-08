import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../Model/product';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-item-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './item-master.component.html',
  styleUrl: './item-master.component.css'
})
export class ItemMasterComponent {
@ViewChild('myModal') modal:ElementRef | undefined;
productForm :FormGroup = new FormGroup({})
productList: Product[] = [];
formValue:any;
prodService=inject(ProductService)
constructor(private fb:FormBuilder){

}
ngOnInit():void{
  this.setFormState();
  this.getProduct()

}
  openModal(){
    const prodModal = document.getElementById('myModal');
    if(prodModal!=null)
    {
      prodModal.style.display='block';
    }
  }
  closeModal()
  {
  if(this.modal != null)
  {
  this.modal.nativeElement.style.display= 'none'
  }
  }

  setFormState()
  {
    this.productForm = this.fb.group({
      id:[0],
      ProductName:['',Validators.required],
      Price:['',Validators.required],
      Description:['',Validators.required],
      Rating:['',Validators.required],
      Status:[false,[Validators.required]]
    })
  }
  onSubmit(){
    console.log(this.productForm.value)
    if(this.productForm.invalid){
      alert("Please fill all the records");
      return;
    }else{
      this.formValue=this.productForm.value;
      this.prodService.addProduct(this.formValue).subscribe((res)=>{
        alert("Product added Successfully");
        this.productForm.reset();
        this.getProduct();

        this.closeModal
      })
    }
  }
  getProduct()
  {
    this.prodService.getAllProduct().subscribe((res)=>{
      this.productList = res;
    })
  }
  onDelete(id:number){
    this.prodService.deleteProduct(id).subscribe
((res)=>{
  alert("product deleted successfully");
  this.getProduct();
})  }
}
