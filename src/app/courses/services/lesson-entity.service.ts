import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Lesson } from "../model/lesson";

@Injectable()
export class LessonsEntityService extends EntityCollectionServiceBase<Lesson> {

  constructor(serviceElementsFactor: EntityCollectionServiceElementsFactory) {
    super('Lesson', serviceElementsFactor);
  }



}
