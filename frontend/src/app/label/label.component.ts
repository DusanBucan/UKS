import { Component, OnInit, ɵɵcontainerRefreshEnd } from "@angular/core";
import {LabelService} from '../services/label.service';
import {GithubUserService} from '../services/github-user.service';
import { Label } from '../model/label';
import { GithubUser } from '../model/github_user';


@Component({
  selector: "app-label",
  templateUrl: "./label.component.html",
  styleUrls: ["./label.component.css"],
})
export class LabelComponent implements OnInit {
  private newLabelForm: boolean = false;
  private labels : Array<Label> = [];
  private labelsEdit: Array<Object> = [];
  public labelForAdd : Label ={
    "title": "",
    "description":"",
    "color":""
  }

  public forChange: Number;

  constructor(private labelService:LabelService, private githubService: GithubUserService) {}

  ngOnInit():void {
    this.getLabels();
  }

  getLabels(){
    this.labelService.getLabels().subscribe(
      (response) => {
        if (response !== null) {
          this.labels = response;
          this.labelsEdit = response;
          for(let i=0; i<this.labelsEdit.length;i++){
            this.labelsEdit[i]['forEdit']=false;
          }
        }
      },
      (error) => {
        alert("ERROR");
      }
    );
    
  }
  edit(label){
    label.forEdit = true;
  }

  delete(label){
    this.labelService.deleteLabel(label.id).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        alert("ERROR");
      }
    );
  }

  getLabelStyle(label){
    return "background-color:"+label.color;
  }

  showNewLabelForm() {
    this.newLabelForm = true;
  }

  closeNewLabelForm() {
    this.newLabelForm = false;
  }

  cancel(index){
    this.labelsEdit[index]=this.labels[index]
    window.location.reload();
  }

  saveEdit(index){
    this.labels[index].color = this.labelsEdit[index]['color'];
    this.labels[index].title = this.labelsEdit[index]['title'];
    this.labels[index].description = this.labelsEdit[index]['description'];
    this.labelService.editLabel(this.labels[index],this.labelsEdit[index]['id']).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        alert("ERROR");
      }
    );  
    
  }


  save(){
    if(!/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(this.labelForAdd.color)){
      alert("COLOR MUST BE IN GOOD FORMAT")
    }else{
      this.labelService.createLabel(this.labelForAdd).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          alert("ERROR");
        }
      );
    }

  }
}
