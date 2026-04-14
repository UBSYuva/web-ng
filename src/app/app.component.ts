import { Component, OnInit, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { mainData } from './data/main';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule],
  styles: ["body { position:relative }"],
  styleUrl: './app.component.css',
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
        this.renderer.addClass(document.body, 'light-theme');
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
    console.log('Toggling theme. Dark mode:', this.isDarkMode);
    
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        this.renderer.removeClass(document.body, 'light-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        this.renderer.addClass(document.body, 'light-theme');
        localStorage.setItem('theme', 'light');
      }
      
      // Verify the class state
      console.log('Body classes:', document.body.className);
    }
  }

}
