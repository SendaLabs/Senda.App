import { Injectable } from "@nestjs/common";
import type { CreateCompanyDto } from "@senda/shared";

import { AppError } from "../../common/errors/app-error";

export interface CompanyView {
  id: string;
  legalName: string;
  taxId: string | null;
  country: string;
  createdAt: string;
}

/**
 * Planned: persist through DatabaseService (Company + CompanyMembership with
 * OWNER role for the creator) and scope every read to the caller's memberships.
 */
@Injectable()
export class CompaniesService {
  create(_dto: CreateCompanyDto): Promise<CompanyView> {
    return Promise.reject(AppError.notImplemented("Company onboarding"));
  }

  findById(_id: string): Promise<CompanyView> {
    return Promise.reject(AppError.notImplemented("Company profile"));
  }
}
