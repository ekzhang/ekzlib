import { Directive, ElementRef, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';

declare const ace: any;

@Directive({
  selector: '[appAceEditor]'
})
export class AceEditorDirective {

  private editor;
  private _readOnly: boolean;
  private _theme: string;
  private _mode: string;
  private oldVal: string;

  static get parameters() {
    return [[ElementRef]];
  }

  @Input()
  set options(value) {
    this.editor.setOptions(value || {});
  }

  @Input()
  set readOnly(value) {
    this._readOnly = value;
    this.editor.setReadOnly(value);
  }

  @Input()
  set theme(value) {
    this._theme = value;
    this.editor.setTheme(`ace/theme/${value}`);
  }

  @Input()
  set mode(value) {
    this._mode = value;
    this.editor.getSession().setMode(`ace/mode/${value}`);
  }

  @Input()
  get text(): string {
    return this.oldVal;
  }

  set text(value: string) {
    if (value === this.oldVal) {
      return;
    }
    this.editor.setValue(value);
    this.editor.clearSelection();
    this.editor.focus();
  }

  @Output()
  public textChange = new EventEmitter();

  constructor(elementRef: ElementRef) {
    const el = elementRef.nativeElement;
    el.classList.add('editor');

    this.editor = ace.edit(el);
    this.options = {
      fontSize: 14,
      showPrintMargin: false,
      scrollPastEnd: 1.0
    };
    this.theme = 'textmate';
    this.mode = 'c_cpp';
    this.editor.$blockScrolling = Infinity;

    this.editor.on('change', () => {
      const newVal = this.editor.getValue();
      if (newVal === this.oldVal) {
        return;
      }
      if (typeof this.oldVal !== 'undefined') {
        this.textChange.next(newVal);
      }
      this.oldVal = newVal;
    });
  }
}
