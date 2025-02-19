import { Component, OnInit } from '@angular/core';
import { mainData } from './data/main';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule],
  styles: ["body { position:relative }"]
})
export class AppComponent implements OnInit {
  
  data = mainData;

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


}
