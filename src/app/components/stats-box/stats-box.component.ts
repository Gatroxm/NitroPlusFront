import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-box',
  templateUrl: './stats-box.component.html',
  styleUrls: ['./stats-box.component.scss']
})


export class StatsBoxComponent {
  @Input('nombre') nombre:string = 'nombre';
  @Input('total') total:any = 1000000;
}
