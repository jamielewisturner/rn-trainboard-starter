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
  // ticketClass: string;
  // ticketCategory: string;
  name: string;
}