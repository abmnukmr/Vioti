/**
 * Created by ABHIMANYU SINGH KASH on 3/22/2017.
 */
import { Component, ElementRef, OnChanges, Input } from '@angular/core';
import QRious from 'qrious';

@Component({
  selector: 'qr-code',
  template: `
      <div></div>
  `
})
export class QRCodeComponent implements OnChanges {

  private elementRef;
  @Input() value: string;
  @Input() size: number;
  background: string;
  backgroundAlpha: number;
  foreground: string;
  foregroundAlpha: number;
  level: string;
  mime: string;
  padding: number;
  canvas: boolean;

  constructor(public el: ElementRef) {
    this.elementRef = el;
    this.background = 'white';
    this.backgroundAlpha = 1.0;
    this.foreground = 'black';
    this.foregroundAlpha = 1.0;
    this.level = 'L';
    this.mime = 'image/png';
    this.padding = null;
    this.size = 300;
    this.value = 'uid';
    this.canvas = false;
  };

  ngOnChanges(changes) {
    if ('background' in changes ||
      'backgroundAlpha' in changes ||
      'foreground' in changes ||
      'foregroundAlpha' in changes ||
      'level' in changes ||
      'mime' in changes ||
      'padding' in changes ||
      'size' in changes ||
      'value' in changes ||
      'canvas' in changes) {
      this.generate();
    }
  }

  generate() {
    try {
      var el = this.elementRef.nativeElement;
      el.innerHTML = '';
      var qr = new QRious({
        background: this.background,
        backgroundAlpha: this.backgroundAlpha,
        foreground: this.foreground,
        foregroundAlpha: this.foregroundAlpha,
        level: this.level,
        mime: this.mime,
        padding: this.padding,
        size: this.size,
        value: this.value
      });
      if (this.canvas) {
        el.appendChild(qr.canvas);
      }
      else {
        el.appendChild(qr.image);
      }
    }
    catch (e) {
      console.error("Could not generate QR Code: " + e.message);
    }
  }


}
