import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', description: 'High-end laptop', price: 1200, quantity: 10, category: 'Electronics' },
    { id: 2, name: 'Chair', description: 'Ergonomic office chair', price: 150, quantity: 25, category: 'Furniture' },
    { id: 3, name: 'Notebook', description: 'A5 lined notebook', price: 3, quantity: 100, category: 'Stationery' }
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: Product): void {
    product.id = this.generateId();
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  private generateId(): number {
    return this.products.length > 0
      ? Math.max(...this.products.map(p => p.id)) + 1
      : 1;
  }
}

