import { ComponentActionee } from '../component-actionee';
import { ModalSelector } from './modal-selector.js';
import ID from './id';

class ModalActionee extends ComponentActionee {
  constructor () {
    super(2, true);
  }

  static get instanceClassName () {
    return 'ModalActionee';
  }

  init () {
    this.setDiscloseType();
    this.detectLevel();
    this.listenDisclose();
  }

  get label () {
    const title = this.node.querySelector(ModalSelector.TITLE);

    if (title) return title.textContent.trim();

    const selector = Array.from({ length: 2 }, (v, i) => `h${i + 1}`).join(',');
    const headings = this.node.querySelector(selector) ? [...this.node.querySelector(selector)].filter(heading => (this.node.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_CONTAINED_BY) > 0) : [];

    if (headings.length) return headings[0].textContent.trim();

    const instance = this.element.getInstance('Modal');
    if (instance) {
      const button = instance.buttons.filter(button => button.isPrimary)[0];
      return this.getFirstText(button.node);
    }
    return null;
  }

  get component () {
    return ID;
  }
}

export { ModalActionee };
