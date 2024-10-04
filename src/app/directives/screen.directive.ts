import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScreen]',
  standalone: true
})
export class ScreenDirective {
  @Output() screenWidth = new EventEmitter<number>();
  @Output() screenHeight = new EventEmitter<number>();

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth.emit(window.innerWidth);
    this.screenHeight.emit(window.innerHeight);
  }

}