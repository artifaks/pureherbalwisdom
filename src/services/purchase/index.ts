
import { ebookService } from './ebookService';
import { paymentService } from './paymentService';
import { migrationService } from './migrationService';

// Export all services as a single purchaseService object
export const purchaseService = {
  ...ebookService,
  ...paymentService,
  ...migrationService
};
