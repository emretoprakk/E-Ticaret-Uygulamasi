import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss']
})
export class ViewWishlistComponent {

  products: any[] = [];

  constructor(private customerService: CustomerService,
    private snackBar: MatSnackBar,){}

  ngOnInit() {
    this.getWishlistByUserId();
  }
  
  getWishlistByUserId(){
    this.customerService.getWishlistByUserId().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
      });
    })
  }

  removeProductFromWishlist(productId: number) {
    this.customerService.removeProductFromWishlist(productId).subscribe(() => {
        this.products = this.products.filter(product => product.productId !== productId);
        this.snackBar.open('Ürün favorilerden kaldırıldı.', 'Kapat', { duration:5000 });
    });
  } 
}
