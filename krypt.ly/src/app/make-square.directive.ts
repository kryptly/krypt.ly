import { Directive, AfterViewChecked, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMakeSquare]'
})
export class MakeSquareDirective implements AfterViewChecked {

    @Input()
    appMakeSquare: string;
    triggered: Boolean = false;
    

    constructor(private el: ElementRef) {
    }

    ngAfterViewChecked() {
        // call functions once by setting 'triggered = true' afterwards.
        if(!this.triggered){
          this.makeSquare(this.el.nativeElement, this.appMakeSquare);
          this.triggerMemberOverlay(this.el.nativeElement, this.appMakeSquare);
          this.triggered = true;
        }
    }

    @HostListener('window:resize')
    @HostListener('window:orientationchange')
    onResize() {
        // Call makeSquare function
        this.makeSquare(this.el.nativeElement, this.appMakeSquare);
    }

    makeSquare(parent: HTMLElement, className: string) {
      if (!parent) return;

      // Find all the child elements with the selected class name
      const children = parent.getElementsByClassName(className);

      if (!children) return;

      // Reset all children height
      Array.from(children).forEach((x: HTMLElement) => {
        x.style.height = 'initial';
      });

      // Get all the child elements widths
      const memberWidths = Array.from(children)
      .map(x => x.getBoundingClientRect().width);

      // Find out the widest
      const width = memberWidths.reduce((prev, curr) => {
          return curr > prev ? curr : prev;
      }, 0);

      let perspective = width * 2;

      // Update all the child elements to the widest width
      Array.from(children).forEach((x: HTMLElement) => x.style.height = `${width}px`);
      // Add perspective to each child element, perspective should be width * 2
      Array.from(children).forEach((x: HTMLElement) => x.style.perspective = `${perspective}px`);
    }

    triggerMemberOverlay(parent: HTMLElement, className: string){
      if(!parent) return;
      const nodes = parent.getElementsByClassName(className);
      const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
      const classNames = ['in', 'out'].map((p) => Object.values(directions).map((d) => `${p}-${d}`)).reduce((a, b) => a.concat(b));

      const getDirectionKey = (ev, node) => {
        const { width, height, top, left } = node.getBoundingClientRect();
        const l = ev.pageX - (left + window.pageXOffset);
        const t = ev.pageY - (top + window.pageYOffset);
        const x = (l - (width / 2) * (width > height ? (height / width) : 1));
        const y = (t - (height / 2) * (height > width ? (width / height) : 1));
        return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
      }

      class Item {
        el: HTMLElement;

        constructor(element) {
          this.el = element;
          this.el.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
          this.el.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
        }

        update(ev, prefix) {         
          this.el.classList.remove(...classNames);
          this.el.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.el)]}`);
        }
      }

        Array.from(nodes).forEach((x: HTMLElement) => new Item(x));
    }
}
