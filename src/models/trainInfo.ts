export type TrainInfo = {
  outboundJourneys: Journey[]
}
export type Journey = {
  departureTime: string;
  arrivalTime: string;
  journeyDurationInMinutes: number;
  tickets: Ticket[];
}
export type Ticket = {
  priceInPennies: number;
  name: string;
}
export type Station = {
  name: string;
  crs: string;
}