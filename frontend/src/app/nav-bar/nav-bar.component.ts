import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../model/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public project: Project = { name: '', labels: [], users: []};
  public id: string;
  constructor(private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.prId;
    this.projectService.get(this.id).subscribe(
      (data: Project) => {
        this.project = data;
      }
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
