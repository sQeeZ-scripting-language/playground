import { Directive, EventEmitter, Host, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScreen]',
  standalone: true
})
export class ScreenDirective {
  @Output() scrollX = new EventEmitter<number>();
  @Output() scrollY = new EventEmitter<number>();
  @Output() screenWidth = new EventEmitter<number>();
  @Output() screenHeight = new EventEmitter<number>();

  constructor() { }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.scrollX.emit(window.scrollX);
    this.scrollY.emit(window.scrollY);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth.emit(window.innerWidth);
    this.screenHeight.emit(window.innerHeight);
  }

}