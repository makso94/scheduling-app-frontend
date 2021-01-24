import { Component, Input, OnInit } from '@angular/core';


export class Legend {
  constructor(public name: string, public color: string) { }
}

@Component({
  selector: 'app-generic-legend',
  templateUrl: './generic-legend.component.html',
  styleUrls: ['./generic-legend.component.scss']
})
export class GenericLegendComponent implements OnInit {
  // @Input() title!: string;
  @Input() legends!: Legend[];

  constructor() { }

  ngOnInit(): void {
  }

}
