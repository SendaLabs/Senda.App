import { Body, Controller, Post } from "@nestjs/common";
import {
  type CreatePaymentIntentDto,
  createPaymentIntentSchema,
} from "@senda/shared";

import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { type PaymentIntentView, PaymentsService } from "./payments.service";

@Controller()
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post("intents")
  createIntent(
    @Body(new ZodValidationPipe(createPaymentIntentSchema))
    dto: CreatePaymentIntentDto,
  ): Promise<PaymentIntentView> {
    return this.payments.createIntent(dto);
  }
}
