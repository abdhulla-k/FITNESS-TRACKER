import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class MaterialModule {}
