export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export type GeoData = {
  city: string;
  country_name: string;
  latitude: number;
  longitude: number;
};
