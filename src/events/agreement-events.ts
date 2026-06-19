import type {
  AgreementCompletedData,
  AgreementCreatedData,
  AgreementFundedData,
  DisputeOpenedData,
  DisputeResolvedData,
  EvidenceSubmittedData,
  MilestoneApprovedData,
} from "../notifications/types/notification-data.types";

export const AgreementEventNames = {
  AgreementCreated: "agreement.created",
  AgreementFunded: "agreement.funded",
  AgreementCompleted: "agreement.completed",
  EvidenceSubmitted: "evidence.submitted",
  MilestoneApproved: "milestone.approved",
  DisputeOpened: "dispute.opened",
  DisputeResolved: "dispute.resolved",
} as const;

export type AgreementEventName =
  (typeof AgreementEventNames)[keyof typeof AgreementEventNames];

export interface AgreementEventMap {
  [AgreementEventNames.AgreementCreated]: AgreementCreatedData;
  [AgreementEventNames.AgreementFunded]: AgreementFundedData;
  [AgreementEventNames.AgreementCompleted]: AgreementCompletedData;
  [AgreementEventNames.EvidenceSubmitted]: EvidenceSubmittedData;
  [AgreementEventNames.MilestoneApproved]: MilestoneApprovedData;
  [AgreementEventNames.DisputeOpened]: DisputeOpenedData;
  [AgreementEventNames.DisputeResolved]: DisputeResolvedData;
}
