import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VerificationService } from './verification.service';
import { VerificationStatusResponse } from './verification.types';

@ApiTags('verification')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('verification')
export class VerificationController {
  constructor(private readonly verification: VerificationService) {}

  @Get('user/:id')
  @ApiOperation({
    summary: 'KYC status for an individual user',
    description:
      'Standardized, provider-agnostic compliance status for a user. Always 200 — an unknown or unverified subject returns an `unverified` payload rather than 404.',
  })
  @ApiParam({ name: 'id', description: 'User (profile) UUID', format: 'uuid' })
  getUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<VerificationStatusResponse> {
    return this.verification.getUserVerification(id);
  }

  @Get('business/:id')
  @ApiOperation({
    summary: 'KYB status for an organization',
    description:
      'Standardized, provider-agnostic compliance status for a business. Always 200 — an unknown or unverified subject returns an `unverified` payload rather than 404.',
  })
  @ApiParam({ name: 'id', description: 'Business (organization) UUID', format: 'uuid' })
  getBusiness(@Param('id', new ParseUUIDPipe()) id: string): Promise<VerificationStatusResponse> {
    return this.verification.getBusinessVerification(id);
  }
}
