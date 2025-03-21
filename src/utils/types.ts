export interface HomeProps {
  data: Location[];
  error: string | null;
}

export interface CarouselImage {
  ID: number;
  image_url: string;
  post_title: string;
}

export interface CarouselProps {
  images: CarouselImage[];
}

export interface Location {
  ID: number;
  post_title: string;
  post_excerpt: string;
  image_url: string;
  post_url: string;
}

export interface LocationCardProps {
  readonly locations: readonly Location[];
}
