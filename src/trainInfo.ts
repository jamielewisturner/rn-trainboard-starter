export type TrainInfo = {
  outboundJourneys: Journey[]
}
export type Journey = {
  departureTime: string;
  arrivalTime: string;
  journeyDurationInMinutes: number;
}
