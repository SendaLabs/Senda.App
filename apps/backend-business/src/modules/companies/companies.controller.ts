import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  companyIdSchema,
  type CreateCompanyDto,
  createCompanySchema,
} from "@senda/shared";

import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { CompaniesService, type CompanyView } from "./companies.service";

@Controller()
export class CompaniesController {
  constructor(private readonly companies: CompaniesService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createCompanySchema)) dto: CreateCompanyDto,
  ): Promise<CompanyView> {
    return this.companies.create(dto);
  }

  @Get(":id")
  findById(
    @Param("id", new ZodValidationPipe(companyIdSchema)) id: string,
  ): Promise<CompanyView> {
    return this.companies.findById(id);
  }
}
