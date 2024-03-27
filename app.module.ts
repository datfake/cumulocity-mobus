import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule as ngRouterModule } from '@angular/router';
import { CoreModule, BootstrapComponent, RouterModule } from '@c8y/ngx-components';
import { HooksModule } from './hooks';
import { ConfigurationModule } from './components/configuration';

const routes: Routes = [
  { path: '', redirectTo: '/configuration', pathMatch: 'full' }
]
@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ngRouterModule.forRoot([], { enableTracing: false, useHash: true }),
    CoreModule.forRoot(),
    HooksModule,
    ConfigurationModule
  ],
  bootstrap: [BootstrapComponent]
})
export class AppModule {}
