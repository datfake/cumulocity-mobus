import { Injectable } from '@angular/core';
import { Device } from './device.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeviceStepperComponent } from './device-stepper.component';
/**
 * With the help of this service you can add or remove devices.
 */
@Injectable()
export class ConfigurationService {
  private devices: Device[];

  constructor(private modalService: BsModalService) {
    this.devices = [];
  }

  addDevice(device: Device) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.devices.push(device);
        resolve(true);
      }, 2000);
    });
  }

  modalCreateDevice() {
    this.modalService.show(DeviceStepperComponent, {
      class: 'modal-lg',
      ariaDescribedby: 'modal-body',
      ariaLabelledBy: 'modal-title'
    });
  }
}
