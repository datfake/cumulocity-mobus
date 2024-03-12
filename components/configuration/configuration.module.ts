import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@c8y/ngx-components';
import { ConfigurationComponent } from './configuration.component';
import { ConfigurationService } from './configuration.service';
import { DeviceStepperComponent } from './device-stepper.component';

/**
 * Angular Routes.
 * Within this array at least path (url) and components are linked.
 */
const routes: Routes = [
  {
    path: 'configuration',
    component: ConfigurationComponent
  }
];

@NgModule({
  declarations: [ConfigurationComponent, DeviceStepperComponent],
  imports: [RouterModule.forChild(routes), CoreModule, FormsModule, ReactiveFormsModule],
  providers: [ConfigurationService],
  entryComponents: [DeviceStepperComponent]
})
export class ConfigurationModule {}
