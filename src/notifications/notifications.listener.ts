import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { NotificationsService } from "./notifications.service";
import { DomainEvents } from "../common/events";
import {
  AgreementCreatedData,
  AgreementFundedData,
  EvidenceSubmittedData,
  MilestoneApprovedData,
  DisputeOpenedData,
  DisputeResolvedData,
  AgreementCompletedData,
} from "./types/notification-data.types";

@Injectable()
export class NotificationsListener {
  private readonly logger = new Logger(NotificationsListener.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @OnEvent(DomainEvents.AGREEMENT_CREATED, { async: true })
  async handleAgreementCreated(data: AgreementCreatedData) {
    try {
      this.logger.log(`Handling agreement created event: ${data.agreementId}`);
      await this.notificationsService.notifyAgreementCreated(data);
    } catch (error) {
      this.logger.error("Failed to send agreement created notification", error);
    }
  }

  @OnEvent(DomainEvents.AGREEMENT_FUNDED, { async: true })
  async handleAgreementFunded(data: AgreementFundedData) {
    try {
      this.logger.log(`Handling agreement funded event: ${data.agreementId}`);
      await this.notificationsService.notifyAgreementFunded(data);
    } catch (error) {
      this.logger.error("Failed to send agreement funded notification", error);
    }
  }

  @OnEvent(DomainEvents.AGREEMENT_COMPLETED, { async: true })
  async handleAgreementCompleted(data: AgreementCompletedData) {
    try {
      this.logger.log(`Handling agreement completed event: ${data.agreementId}`);
      await this.notificationsService.notifyAgreementCompleted(data);
    } catch (error) {
      this.logger.error("Failed to send agreement completed notification", error);
    }
  }

  @OnEvent(DomainEvents.MILESTONE_APPROVED, { async: true })
  async handleMilestoneApproved(data: MilestoneApprovedData) {
    try {
      this.logger.log(`Handling milestone approved event: ${data.milestoneIndex}`);
      await this.notificationsService.notifyMilestoneApproved(data);
    } catch (error) {
      this.logger.error("Failed to send milestone approved notification", error);
    }
  }

  @OnEvent(DomainEvents.EVIDENCE_SUBMITTED, { async: true })
  async handleEvidenceSubmitted(data: EvidenceSubmittedData) {
    try {
      this.logger.log(`Handling evidence submitted event: ${data.agreementId}`);
      await this.notificationsService.notifyEvidenceSubmitted(data);
    } catch (error) {
      this.logger.error("Failed to send evidence submitted notification", error);
    }
  }

  @OnEvent(DomainEvents.DISPUTE_OPENED, { async: true })
  async handleDisputeOpened(data: DisputeOpenedData) {
    try {
      this.logger.log(`Handling dispute opened event for agreement: ${data.agreementId}`);
      await this.notificationsService.notifyDisputeOpened(data);
    } catch (error) {
      this.logger.error("Failed to send dispute opened notification", error);
    }
  }

  @OnEvent(DomainEvents.DISPUTE_RESOLVED, { async: true })
  async handleDisputeResolved(data: DisputeResolvedData) {
    try {
      this.logger.log(`Handling dispute resolved event for agreement: ${data.agreementId}`);
      await this.notificationsService.notifyDisputeResolved(data);
    } catch (error) {
      this.logger.error("Failed to send dispute resolved notification", error);
    }
  }
}
