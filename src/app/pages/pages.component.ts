import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
//@ts-ignore
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: [],
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    customInitFunctions();
  }
  cerrarSlider() {
    if (window.innerWidth < 700) {
      const body = document.body;
      body.dispatchEvent(new Event('resize'));
      if (!body.classList.contains('mini-sidebar')) {
        const click = document.getElementById('tegleMenu');
        click?.click();
      }
    }
  }
}
