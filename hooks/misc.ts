// utils/misc.ts

/**
 * Returns a countdown string for 72 hours (or any duration) after a given date.
 */
export const getCountdown = (date: string): string => {
    const targetDate = new Date(new Date(date).getTime() + 72 * 60 * 60 * 1000);
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
  
    if (diff <= 0) return '00 Days, 00 Hours, 00 Minutes';
  
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  
    return `${days.toString().padStart(2, '0')} Days, ${hours
      .toString()
      .padStart(2, '0')} Hours, ${minutes.toString().padStart(2, '0')} Minutes`;
  };
  
  /**
   * Recursively finds the first Formik error message from nested error objects.
   */
  export const getFirstFormikErrorMessage = (errors: any): string | null => {
    if (typeof errors === 'string') return errors;
  
    if (errors && typeof errors === 'object') {
      for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
          const error = getFirstFormikErrorMessage(errors[key]);
          if (error) return error;
        }
      }
    }
  
    return null;
  };
  
  /**
   * Calculates average rating from rating distribution.
   */
  export const getIntRatingFromDistribution = (
    ratingDistribution: Record<0 | 1 | 2 | 3 | 4 | 5, number>
  ): number => {
    const ratingSum = Object.keys(ratingDistribution).reduce(
      (sum, rating) => sum + Number(rating) * ratingDistribution[Number(rating)],
      0
    );
    const totalRating = Object.values(ratingDistribution).reduce(
      (sum, count) => sum + count,
      0
    );
    const rating = ratingSum / totalRating;
    return isNaN(rating) ? 0 : rating;
  };
  
  /**
   * Checks if the provided date is within N hours from now.
   */
  export const isAtLeastNHoursInFuture = (dateString: string, n = 48): boolean => {
    const parsedDate = new Date(dateString.replace(' ', 'T')); // handles "2025-10-30 10:00" formats
    const currentDate = new Date();
    const nHoursInMs = n * 60 * 60 * 1000;
    const timeDifference = currentDate.getTime() - parsedDate.getTime();
    return timeDifference <= nHoursInMs;
  };
  