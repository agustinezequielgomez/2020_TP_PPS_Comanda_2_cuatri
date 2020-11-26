export interface Photo {
  photoUrl: string;
  fileName: string;
  takenBy: string;
  takenAt: Date;
}

export type Photos = Photo[];
