import { Component, EventEmitter, inject, Output, TemplateRef } from '@angular/core';

import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'ngbd-modal-basic',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule],
  templateUrl: './filtermodal.component.html',
})
export class FiltermodalComponent {
  selectedStatus: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  onSave() {
    this.activeModal.close(this.selectedStatus);
  }
}
