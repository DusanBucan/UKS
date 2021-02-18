import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { WikiService } from '../services/wiki.service';
import { Wiki } from '../model/wiki';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {
  formdata;
  private exists = false;
  private forEdit = false;
  private text = '';
  private wiki: Wiki = {id: 0, project: null, text: ''};
  private project: Project;
  private projectId: string;
  config: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['customClasses', 'insertImage']
    ]
};
  constructor(
    private formBuilder: FormBuilder,
    private wikiService: WikiService,
    private projectService: ProjectService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
    this.getProjectWiki();
    this.formdata = this.formBuilder.group({
      description: [this.text, [Validators.required,
        Validators.maxLength(1000), Validators.minLength(1)]]
  });
  }

  getProjectWiki() {
    this.wikiService.getWiki(this.projectId).subscribe(
      (response) => {
        if (response !== null) {
          this.exists = true;
          this.text = response.text;
          this.wiki = response;
          this.formdata = this.formBuilder.group({
            description: [this.text, [Validators.required,
              Validators.maxLength(1000), Validators.minLength(1)]]
        });
        }
      },
      (error) => {

      }
    );

  }

  delete() {
    this.wikiService.deleteWiki(this.wiki.id).subscribe(
      (response) => {
        if (response !== null) {
          alert('Successfully deleted');
          location.reload();
        }
      },
      (error) => {
        alert('ERROR');
      }
    );
  }

  create() {
      const newstr = this.formdata.get('description').value.replaceAll('&lt;', '<');
      const newstr2 = newstr.replaceAll('&gt;', '>');
      const newstr3 = newstr2.replaceAll('&lt;/', '</');
      this.wikiService.createWiki({project: this.projectId , text: newstr3}).subscribe(
        (response) => {
          if (response !== null) {
            alert('Successfully added');
            location.reload();
          }
        },
        (error) => {
          alert('ERROR');
        }
      );
  }

  getData() {
    if (this.formdata.get('description').value !== '') {
      return this.formdata.get('description').value;
    }
    return '';
  }

  edit() {
    this.forEdit = true;
  }

  editDone() {
    this.wikiService.editWiki(this.wiki.id, {project: this.projectId , text: this.formdata.get('description').value}).subscribe(
      (response) => {
        if (response !== null) {
          this.forEdit = false;
          alert('Successfully edited');
          location.reload();
        }
      },
      (error) => {
        alert('ERROR');
      }
    );
  }
}
