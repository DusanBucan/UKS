import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit{
  formdata;
  constructor(private formBuilder: FormBuilder) { }
  onClickSubmit(data) {
      if(this.formdata.invalid)
     {
      
    this.formdata.get('description').markAsTouched();
    
    }else{
      alert(this.formdata.get('description').value);
      document.getElementById("p").innerHTML = this.formdata.get('description').value;
    }
  }
  ngOnInit(): void {
  this.formdata = this.formBuilder.group({
            description: ['', [Validators.required,
              Validators.maxLength(1000), Validators.minLength(5)]]
        });
  }

  getData(){
    if(this.formdata.get('description').value!=''){
      return this.formdata.get('description').value;
    }
    return "";
  }
}
