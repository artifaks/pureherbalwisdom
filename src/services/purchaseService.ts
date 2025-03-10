
import { ebookService } from './purchase/ebookService';
import { paymentService } from './purchase/paymentService';
import { migrationService } from './purchase/migrationService';

// Export all services as a single purchaseService object
export const purchaseService = {
  ...ebookService,
  ...paymentService,
  ...migrationService,
  
  // Add a direct download function that bypasses payment checks
  async directDownload(ebookId: string) {
    try {
      const { data, error } = await ebookService.getEbookById(ebookId);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error in direct download:', error);
      throw error;
    }
  }
};
