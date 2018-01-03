import { Directive, ElementRef, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';

declare const ace: any;

@Directive({
  selector: '[appAceEditor]'
})
export class AceEditorDirective {

  private editor;
  private _readOnly;
  private _theme;
  private _mode;
  private oldVal;

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
  set text(value) {
    if (value === this.oldVal) {
      return;
    }
    this.editor.setValue(value);
    this.editor.clearSelection();
    this.editor.focus();
  }

  @Output()
  public textChanged;

  @Output()
  public editorRef;

  constructor(elementRef) {
    this.textChanged = new EventEmitter();
    this.editorRef = new EventEmitter();

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

    setTimeout(() => {
      this.editorRef.next(this.editor);
    });

    this.editor.on('change', () => {
      const newVal = this.editor.getValue();
      if (newVal === this.oldVal) {
        return;
      }
      if (typeof this.oldVal !== 'undefined') {
        this.textChanged.next(newVal);
      }
      this.oldVal = newVal;
    });
  }
}
