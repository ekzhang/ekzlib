import { Directive, ElementRef, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import * as ace from 'brace';
import 'brace/mode/c_cpp';
import 'brace/theme/textmate';

@Directive({
  selector: '[appAceEditor]'
})
export class AceEditorDirective {
  private editor: ace.Editor;
  private oldVal: string;

  static get parameters() {
    return [[ElementRef]];
  }

  @Input()
  set options(value: object) {
    this.editor.setOptions(value || {});
  }

  @Input()
  set readOnly(value: boolean) {
    this.editor.setReadOnly(value);
  }

  @Input()
  set theme(value: string) {
    this.editor.setTheme(`ace/theme/${value}`);
  }

  @Input()
  set mode(value: string) {
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
