export interface IFilm {
  id: string; // mongoose.Types.ObjectId;
  rating?: number;
  director?: string;
  tags?: string[];
  image?: string;
  cover?: string;
  title?: string;
  about?: string;
  description?: string;
}

export interface ISchedule {
  id: string; // mongoose.Types.ObjectId;
  daytime?: string;
  hall?: string;
  rows?: number;
  seats?: number;
  price?: number;
  taken?: string[];
}

export interface IFilmsAll {
  total: number;
  items: IFilm[];
}

export interface IScheduleAll {
  total: number;
  items: ISchedule[];
}

export interface ITicket {
  film: string;
  session: string;
  daytime?: string;
  row?: number;
  seat?: number;
  price?: number;
}

export interface IOrderAll {
  email: string;
  phone: string;
  tickets: ITicket[];
}
