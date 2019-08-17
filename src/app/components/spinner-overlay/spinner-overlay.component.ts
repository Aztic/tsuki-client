import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss']
})
export class SpinnerOverlayComponent implements OnInit {
  @Input() public message: string;
  public wrapperClasses = ['spinner-wrapper'];
  constructor() { }
  addHide() {
    this.wrapperClasses.push('hide');
  }

  ngOnInit() {
  }

}
