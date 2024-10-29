import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  searchProductForm!: FormGroup;
  recognition: any;
  isListening: boolean = false;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
    this.initializeVoiceRecognition();
  }

  getAllProducts() {
    this.products = [];
    this.customerService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    });
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductsByName(title).subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      this.cdr.detectChanges(); // Değişiklik algılama mekanizmasını manuel olarak tetikleyin
    });
  }

  addToCart(id: any) {
    this.customerService.addToCart(id).subscribe({
      next: (res) => {
        this.snackBar.open("Ürün başarıyla sepete eklendi", "Kapat", { duration: 5000 });
      },
      error: (err) => {
        console.error('Sepete ekleme hatası:', err);
        this.snackBar.open("Ürün başarıyla sepete eklendi", "Kapat", { duration: 5000 });
      }
    });
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
