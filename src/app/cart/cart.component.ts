import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [ FormsModule, CommonModule ]
})
export class CartComponent {

  menuItems = [
    { name: 'Brigadeiro', price: 10.00, image: '/brigadeiro.png' },
    { name: 'Beijinho', price: 8.00, image: '/beijinho.png' },
    { name: 'Quindim', price: 12.00, image: '/quindim.jpg' },
    { name: 'Pudim', price: 15.00, image: '/pudim.png' },
    { name: 'Cocada', price: 13.00, image: '/cocada.png' },
    { name: 'Bolo de Chocolate', price: 15.00, image: '/bolodechocolate.jpg' }
  ];

  cart: CartItem[] = [];
  isModalOpen = false;
  address = '';
  showAddressWarning = false;

  get total(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addToCart(name: string, price: number) {
    const existingItem = this.cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ name, price, quantity: 1 });
    }
  }

  removeItemCart(name: string) {
    const index = this.cart.findIndex(item => item.name === name);
    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  checkout() {
    if (this.cart.length === 0) return;

    if (!this.address.trim()) {
      this.showAddressWarning = true;
      return;
    }

    const cartItems = this.cart
      .map(item => `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price}`)
      .join(' | ');

    const phone = '5511996221043';
    const message = encodeURIComponent(cartItems + ` Endereço: ${this.address}`);

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

    this.cart = [];
    this.address = '';
    this.showAddressWarning = false;
  }
}
