import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;
  recognition: any;
  isListening: boolean = false;

  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef 
  ){}

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
    this.initializeVoiceRecognition();
  }

  getAllProducts() {
    this.products=[];
    this.adminService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      
    })
  }

  submitForm(){
    this.products=[];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      this.cdr.detectChanges(); // Değişiklik algılama mekanizmasını manuel olarak tetikleyin
      console.log(this.products)
    })
  }

  deleteProduct(productId:any){
    this.adminService.deleteProduct(productId).subscribe(res => {
      if(res == null){ //degisiklik yapıldı res.body == null
        this.snackBar.open('Ürün Başarıyla Silindi','Kapat', {
          duration: 5000
        });
        this.getAllProducts();
      } else {
        this.snackBar.open(res.message,'Kapat',{
          duration:5000,
          panelClass:'error-snackbar'
        });
      }
    })
  }

  initializeVoiceRecognition() {
    const { webkitSpeechRecognition }: IWindow = window as any;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'tr-TR';
  
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.searchProductForm.controls['title'].setValue(transcript);
      this.submitForm(); // Algılanan metin girildiğinde arama işlemini otomatik olarak başlat
      this.isListening = false;
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      this.snackBar.open("Sesli arama hatası: " + event.error, "Kapat", { duration: 5000 });
    };
  
    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  startVoiceRecognition() {
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    } else {
      this.recognition.start();
      this.isListening = true;
    }
  }
}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}


