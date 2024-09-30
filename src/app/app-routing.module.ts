import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { UsercardsComponent } from "./User/user/usercards/usercards.component";
import { UsermaintenanceComponent } from "./User/user/usermaintenance/usermaintenance.component";
import { PrestamoComponent } from "./Prestamo/prestamo/prestamo.component";
const routes: Routes = [
	{
		path: "",
		redirectTo: "/gestion/prestamo",
		pathMatch: "full",
	},
	{
		path: "gestion",
		children: [
			{ path: "prestamo", component: PrestamoComponent },
			{ path: "card", component: UsercardsComponent },
			{ path: "maintenance", component: UsermaintenanceComponent },
		],
	},
	{ path: "**", component: AppComponent },
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}