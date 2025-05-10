import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/common/interfaces/category';
import { Product } from 'src/app/common/interfaces/product';
import { EcomdataService } from 'src/app/common/services/ecomdata.service';
import { CardComponent } from '../card/card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, CardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _EcomdataService: EcomdataService) {}

  products: Product[] = [];
  categories!: Category[];
  whishList: any[] = [];

  ngOnInit(): void {
    // Get Products
    this._EcomdataService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data.slice(0, 12);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

    // Get Categories
    this._EcomdataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });

    // Get Wishlist
    this._EcomdataService.whishList.subscribe((data) => {
      if (data.length > 0) {
        this.whishList = data;
      }
    });
  }

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    items: 1,
    nav: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut'
  };

  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 2,
        nav: false
      },
      400: {
        items: 3,
        nav: false
      },
      740: {
        items: 5,
        nav: true
      },
      940: {
        items: 7,
        nav: true
      }
    },
    nav: true
  };
}
