export type CarouselImage = {
  url: string;
  title?: string;
};

export type CarouselProps = {
  images: CarouselImage[];
};

export type ImageGroup = {
  label: string;
  images: CarouselImage[];
};

export type GroupedCarouselProps = {
  groups: ImageGroup[];
};
