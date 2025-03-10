
import { ebookService } from './purchase/ebookService';
import { paymentService } from './purchase/paymentService';
import { migrationService } from './purchase/migrationService';

// Export all services as a single purchaseService object
export const purchaseService = {
  ...ebookService,
  ...paymentService,
  ...migrationService
};
