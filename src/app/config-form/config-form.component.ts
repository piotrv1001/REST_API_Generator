import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';

type DropdownOption = {
  name: string;
  imgUrl?: string
}

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent implements OnInit {

  configForm?: FormGroup;
  frontendTechArray: DropdownOption[] = [];
  backendTechArray: DropdownOption[] = [];
  dataTypeArray: DropdownOption[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.configForm = this.fb.group({
      frontendTech: '',
      backendTech: '',
      entities: this.fb.array([])
    });
    this.frontendTechArray = [
      { name: 'Angular', imgUrl: '../../assets/images/angular_logo.svg.png' },
      { name: 'React', imgUrl: '../../assets/images/react_logo.svg.png' },
      { name: 'Vue', imgUrl: '../../assets/images/vue_logo.svg.png' }
    ];
    this.backendTechArray = [
      { name: 'Express.js', imgUrl: '../../assets/images/express_logo.png' },
      { name: 'Spring Boot', imgUrl: '../../assets/images/spring_boot_logo.png' },
      { name: 'Django', imgUrl: '../../assets/images/django_logo.svg.png' },
    ];
    this.dataTypeArray = [
      { name: 'Number' },
      { name: 'String' },
      { name: 'Boolean' },
    ];
  }

  get entityForms(): FormArray {
    return this.configForm?.get('entities') as FormArray;
  }

  newEntity(): FormGroup {
    return this.fb.group({
      name: 'Entity',
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

  getNameForEntity(index: number): string {
    return this.entityForms.at(index).get('name')?.value;
  }

  clearEntityName(index: number): void {
    this.entityForms.at(index).get('name')?.reset();
  }

}
