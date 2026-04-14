import { Component, OnInit, Inject, PLATFORM_ID, Renderer2, HostBinding, ViewEncapsulation } from '@angular/core';
import { mainData } from './data/main';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  data = mainData;
  isDarkMode = true;
  currentSlide = 0;
  sliderTimer: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        this.isDarkMode = false;
        document.body.classList.add('light-theme');
      }
      this.startSlider();
    }
  }

  startSlider() {
    this.sliderTimer = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.data.mainSlider.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.data.mainSlider.length) % this.data.mainSlider.length;
  }

  resetSlider() {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
    }
    this.startSlider();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const root = document.documentElement;
    
    if (this.isDarkMode) {
      root.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }

}
