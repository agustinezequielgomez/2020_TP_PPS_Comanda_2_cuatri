import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dniform-input',
  templateUrl: './dniform-input.component.html',
  styleUrls: ['./dniform-input.component.scss'],
})
export class DNIFormInputComponent implements OnInit {

  @Output() dniRegistered = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}

}
