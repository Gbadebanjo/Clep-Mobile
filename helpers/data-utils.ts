interface FormatOptions {
    currency?: string;
    currencyDisplay?: 'symbol' | 'code' | 'name';
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    useGrouping?: boolean;
    locale?: string; // Added locale option
}

const defaultOptions: Required<FormatOptions> = {
    currency: 'NGN',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    locale: 'en-NG', // Default locale for NGN
};

export function amountFormatter(
    amount: number,
    options?: FormatOptions
): string {
    // Merge default options with user-provided options
    const {
        currency,
        currencyDisplay,
        minimumFractionDigits,
        maximumFractionDigits,
        useGrouping,
        locale,
    } = { ...defaultOptions, ...options };

    // Validate input
    // if (isNaN(amount)) {
    //     throw new Error('Invalid amount. Please provide a valid number.');
    // }

    // Create a NumberFormat instance with the specified locale and currency
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        currencyDisplay,
        minimumFractionDigits,
        maximumFractionDigits,
        useGrouping,
    });

    return formatter.format(amount ?? 0);
}

/**
 * A safer version of amountFormatter that handles invalid inputs gracefully
 */
export function safeAmountFormatter(
    amount: any,
    fallback: string = 'Price unavailable',
    options?: FormatOptions
): string {
    if (amount === undefined || amount === null || isNaN(Number(amount))) {
        return fallback;
    }

    try {
        return amountFormatter(Number(amount), options);
    } catch (error) {
        console.error('Error formatting amount:', error);
        return fallback;
    }
}

export const productCategories = [
    'Dresses',
    'Tops',
    'Bottoms',
    'Outerwear',
    'Footwear',
    'Accessories',
];
export const productGenders = ['Men', 'Women', 'Unisex'];

export const productFits = ['Slim', 'Regular', 'Loose', 'Oversized'];

export const productStatus = ['draft', 'published', 'archived'];

export const productCurrencies = [
    { label: 'Nigeria Naira', value: 'NGN' },
    { label: 'US Dollar ($)', value: 'USD' },
];

export const productSizing = ['NUMERIC', 'LETTER', 'SHOE EU', 'SHOE US'];

export const productSizeUnit = ['Centimeters', 'Inches'];

export const getStatusBgColor = (
    statuses: { label: string; value: string; bgColor?: string }[],
    statusValue: string
) => {
    const status = statuses.find((s) => s.value === statusValue);
    return status ? status.bgColor : 'bg-gray-50'; // Default to a light gray
};

// export const amountFormater = (amount: string | number) => {
//     return amount?.toLocaleString('us') ?? 0;
// };

export const formatChatDate = (isoDate: string): string => {
    const inputDate = new Date(isoDate);
    const now = new Date();

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - now.getDay()); // Sunday is the start of the week (0)

    if (inputDate >= startOfToday) {
        return `Today at ${inputDate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })}`;
    }

    if (inputDate >= startOfYesterday) {
        return `Yesterday at ${inputDate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })}`;
    }

    if (inputDate >= startOfWeek) {
        return `${inputDate.toLocaleDateString(undefined, {
            weekday: 'long',
        })} at ${inputDate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })}`;
    }

    return inputDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};
// Convert bytes to KB (rounded to 2 decimal places)
 export const formatFileSize = (bytes: number | undefined) => {
    if (!bytes || isNaN(bytes)) return "0 KB";
    return `${(bytes / 1024).toFixed(2)} KB`;
  };
  