import { Component, OnInit, ɵɵcontainerRefreshEnd } from '@angular/core';
import { LabelService } from '../services/label.service';
import { GithubUserService } from '../services/github-user.service';
import { Label } from '../model/label';
import { GithubUser } from '../model/github_user';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
})
export class LabelComponent implements OnInit {
  public id: string;
  private newLabelForm = false;
  private labels: Array<Label> = [];
  private labelsEdit: Array<Label> = [];
  public labelForAdd: Label = {
    title: '',
    description: '',
    color: '',
  };

  public forChange: number;

  constructor(
    private labelService: LabelService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.projectId;
    this.getLabels();
  }

  getLabels() {
    this.projectService.getLabelsByProject(this.id).subscribe(
      (response: Label[]) => {
        if (response !== null) {
          this.labels = response;
          this.labelsEdit = response;
          for (const i of this.labelsEdit) {
            // tslint:disable-next-line:no-string-literal
            i['forEdit'] = false;
          }
        }
      },
      (error) => {
        alert('ERROR');
      }
    );
  }
  edit(label) {
    label.forEdit = true;
  }

  delete(label) {
    this.labelService.deleteLabel(label.id).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        alert('ERROR');
      }
    );
  }

  getLabelStyle(label) {
    return 'background-color:' + label.color;
  }

  showNewLabelForm() {
    this.newLabelForm = true;
  }

  closeNewLabelForm() {
    this.newLabelForm = false;
  }

  cancel(index) {
    this.labelsEdit[index] = this.labels[index];
    window.location.reload();
  }

  saveEdit(index) {
    this.labels[index].color = this.labelsEdit[index].color;
    this.labels[index].title = this.labelsEdit[index].title;
    this.labels[index].description = this.labelsEdit[index].description;
    this.labelService
      .editLabel(this.labels[index], this.labelsEdit[index].id)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          alert('ERROR');
        }
      );
  }

  save() {
    if (!/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(this.labelForAdd.color)) {
      alert('COLOR MUST BE IN GOOD FORMAT');
    } else {
      this.labelService.createLabel(this.labelForAdd, this.id).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          alert('ERROR');
        }
      );
    }
  }
}
