import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.productId;

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['']
    });

    if (this.isEditMode) {
      const product = this.productService.getProductById(this.productId);
      if (product) {
        this.productForm.patchValue(product);
      }
    }
  }

  save(): void {
    if (this.productForm.invalid) {
      return;
    }

    const product: Product = {
      id: this.productId,
      ...this.productForm.value
    };

    if (this.isEditMode) {
      this.productService.updateProduct(product);
    } else {
      this.productService.addProduct(product);
    }

    this.router.navigate(['/products']);
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}

