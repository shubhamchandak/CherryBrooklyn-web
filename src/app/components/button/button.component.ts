import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "app-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.css"]
})
export class ButtonComponent implements OnInit{

    @Input() orderCounter: number = 0;

    @Output() orderCountChangedEvent:
        EventEmitter<{orderCount: number, isAdded: boolean}> = new EventEmitter<{orderCount: number, isAdded: boolean}>();

    constructor() {

    }

    ngOnInit() {

    }

    updateOrderCount(isAdded: boolean) {
        if (isAdded) {
            this.orderCounter++;
        } else if (this.orderCounter > 0) {
            this.orderCounter--;
        }

        this.orderCountChangedEvent.emit({orderCount: this.orderCounter, isAdded: isAdded});
    }
}