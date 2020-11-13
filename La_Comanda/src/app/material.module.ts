import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
})
export class MaterialModule {}
