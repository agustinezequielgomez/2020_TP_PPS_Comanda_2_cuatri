import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatExpansionModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatExpansionModule],
})
export class MaterialModule {}
