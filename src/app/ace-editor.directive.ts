import { Directive, ElementRef, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';

declare const ace: any;

@Directive({
  selector: '[appAceEditor]'
})
export class AceEditorDirective {

  private editor;
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
    this.editor.setReadOnly(value);
  }

  @Input()
  set theme(value) {
    this.editor.setTheme(`ace/theme/${value}`);
  }

  @Input()
  set mode(value) {
    this.editor.getSession().setMode(`ace/mode/${value}`);
  }

  @Input()
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
      this.textChange.next(newVal);
      this.oldVal = newVal;
    });
  }
}
