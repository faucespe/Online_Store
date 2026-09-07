import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SharedModule } from './modules/shared/shared-module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, SharedModule, RouterModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
