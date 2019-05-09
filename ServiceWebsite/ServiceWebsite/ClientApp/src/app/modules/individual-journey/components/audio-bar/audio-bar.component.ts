import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-audio-bar',
  templateUrl: './audio-bar.component.html',
  styles: []
})
export class AudioBarComponent {

  @Input()
  audioBarWidth: string;

  @ViewChild('visualizer')
  visualizer: ElementRef;

  audioContext: AudioContext;
  widthCanvas: number;
  heightCanvas: number;
  canvasContext: CanvasRenderingContext2D;
  volume = 1;
  colorAudio = '#006435';

  constructor() {
    this.createAudioContext();
  }

  async setSource(stream: MediaStream) {
    this.getCanvasContex();
    await this.resumeAudioContext();
    this.createAudioSource(stream);
  }

  async resumeAudioContext() {
    if (!this.audioContext) {
      this.createAudioContext();
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  private createAudioContext() {
    this.audioContext = new (window['AudioContext'] || window['webkitAudioContext'])();
  }
  private createAudioSource(stream: MediaStream) {
    const source = this.audioContext.createMediaStreamSource(stream);
    // Create a new volume meter and connect it.
    const meter = this.createAudioMeter();
    source.connect(meter);
    // kick off the visual updating
    this.onLevelChange();
  }

  private getCanvasContex() {
    this.widthCanvas = this.visualizer.nativeElement.width;
    this.heightCanvas = this.visualizer.nativeElement.height;
    this.canvasContext = this.visualizer.nativeElement.getContext('2d');
    this.canvasContext.clearRect(0, 0, this.widthCanvas, this.heightCanvas);
  }

  private createAudioMeter() {
    const processor = this.audioContext.createScriptProcessor(512);
    processor.onaudioprocess = (event) => { this.volumeAudioProcess(event); };

    // this will have no effect, since we don't copy the input to the output,
    // but works around a current Chrome bug.
    processor.connect(this.audioContext.destination);
    return processor;
  }

  private volumeAudioProcess(event) {
    const buf = event.inputBuffer.getChannelData(0);
    const bufLength = buf.length;
    let sum = 0;
    let x = 0;
    for (let i = 0; i < bufLength; i++) {
      x = buf[i];
      sum += x * x;
    }
    const rms = Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume * 0.95);
  }

  private onLevelChange() {
    requestAnimationFrame(() => this.onLevelChange());
    this.canvasContext.clearRect(0, 0, this.widthCanvas, this.heightCanvas);
    this.canvasContext.fillStyle = this.colorAudio;
    // draw a bar based on the current volume
    this.canvasContext.fillRect(0, 0, this.volume * this.widthCanvas * 1.4, this.heightCanvas);
    this.canvasContext.strokeRect(0, 0, this.widthCanvas, this.heightCanvas);
  }

}
