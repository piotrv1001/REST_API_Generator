import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';

type entityConfig = {
  name: string,
  props: {
    key: string,
    dataType: string,
    nullable: boolean
  }
};

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent implements OnInit {

  configForm?: FormGroup;
  frontendTechArray: any[] = [];
  backendTechArray: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.configForm = this.fb.group({
      frontendTech: '',
      backendTech: '',
      entities: this.fb.array([])
    });
    this.frontendTechArray = [
      { name: 'Angular' },
      { name: 'React' },
      { name: 'Vue' }
    ];
    this.backendTechArray = [
      { name: 'Express.js' },
      { name: 'Spring Boot' },
      { name: 'Django' },
    ]
  }

  get entityForms(): FormArray {
    return this.configForm?.get('entities') as FormArray;
  }

  newEntity(): FormGroup {
    return this.fb.group({
      name: '',
      props: this.fb.array([])
    });
  }

  addEntity(): void {
    this.entityForms.push(this.newEntity());
  }

  removeEntity(index: number): void {
    this.entityForms.removeAt(index);
  }

  getPropsForEntity(index: number): FormArray {
    return this.entityForms.at(index).get('props') as FormArray;
  }

  newProp(): FormGroup {
    return this.fb.group({
      key: '',
      dataType: '',
      nullable: false
    });
  }

  addNewPropToEntity(index: number): void {
    this.getPropsForEntity(index).push(this.newProp());
  }

  removePropFromEntity(entityIndex: number, propIndex: number): void {
    this.getPropsForEntity(entityIndex).removeAt(propIndex);
  }

}
