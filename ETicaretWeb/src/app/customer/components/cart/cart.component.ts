import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  couponForm!: FormGroup;

  constructor(private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,){}
  
    ngOnInit(): void{
      this.couponForm = this.fb.group({
        code: [null, [Validators.required]]
      })
      this.getCart();
    }

    applyCoupon(){
      this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(res =>{
        this.snackBar.open("Kupon Başarıyla Eklendi", 'Kapat', {
          duration: 5000
        });
        this.getCart();
      }, error =>{
        this.snackBar.open(error.error, 'Kapat', {
          duration: 5000
        });
      })
    }

    getCart(){
      this.cartItems = [];
      this.customerService.getCartByUserId().subscribe(res => {
        this.order = res;
        res.cartItems.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItems.push(element);
        });
      })
    }

    increaseQuantity(productId: any){
      this.customerService.increaseProductQuantity(productId).subscribe(res =>{
        this.snackBar.open('Ürün miktarı arttı.', 'Kapat', { duration:5000 });
        this.getCart();
      })  
    }

    decreaseQuantity(productId: any){
      this.customerService.decreaseProductQuantity(productId).subscribe(res =>{
        this.snackBar.open('Ürün miktarı azaldı.', 'Kapat', { duration:5000 });
        this.getCart();
      }, error => {
        if (error.status === 400 && error.error.message === 'Quantity cannot be less than 1') {
          // Sepetten ürünü silme işlemi
          this.customerService.deleteProductFromCart(productId).subscribe(res =>{
            this.snackBar.open('Ürün sepetten silindi', 'Kapat', { duration:5000 });
            this.getCart();
          })
        } else {
          this.snackBar.open('Ürün miktarı 1 olduğu için silindi.', 'Kapat', { duration:5000 });
        }
        this.getCart();
      })
    }

    placeOrder(){
      this.dialog.open(PlaceOrderComponent);
    }
}
