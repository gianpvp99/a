import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { UserModule } from "./User/user/user.module";
import { PrestamoComponent } from './Prestamo/prestamo/prestamo.component';
@NgModule({
	declarations: [AppComponent, PrestamoComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, RouterModule,HttpClientModule , UserModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}