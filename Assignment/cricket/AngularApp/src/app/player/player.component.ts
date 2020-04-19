import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PlayerService } from '../shared/Player.service';
import { Player } from '../shared/Player.model';

declare var M: any;

@Component({
  selector: 'app-Player',
  templateUrl: './Player.component.html',
  styleUrls: ['./Player.component.css'],
  providers: [PlayerService]
})
export class PlayerComponent implements OnInit {

  constructor(private PlayerService: PlayerService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshPlayerList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.PlayerService.selectedPlayer = {
      _id: "",
      name: "",
      doj: "",
      dob: "",
      matches: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.PlayerService.postPlayer(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPlayerList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.PlayerService.putPlayer(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPlayerList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshPlayerList() {
    this.PlayerService.getPlayerList().subscribe((res) => {
      this.PlayerService.Players = res as Player[];
    });
  }

  onEdit(ply: Player) {
    this.PlayerService.selectedPlayer = ply;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.PlayerService.deletePlayer(_id).subscribe((res) => {
        this.refreshPlayerList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
