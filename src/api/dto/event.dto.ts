export interface EventDto {
  title: string;

  announcement: string;

  photo: string;

  _id: string;
}

export interface PatchEventDto {
  id: string;

  title: string;

  announcement: string;
}
