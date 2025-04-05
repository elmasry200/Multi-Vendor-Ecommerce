import * as z from "zod";

export const NewCaetgorySchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().nullable(),
    slug: z.string(),
    uploadedFiles: z.array(z.string()),
  //  marketIds: z.array(z.string()).min(1, "At least one market must be selected"),
    isActive: z.boolean(),
})

export type Category = z.infer<typeof NewCaetgorySchema>;

export const NewCouponSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    expiryDate: z.string(),
    couponCode: z.string(),
    isActive: z.boolean(),
})

export type Coupon = z.infer<typeof NewCouponSchema>;


export const NewBannerSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    link: z.string().url({ message: "Invalid URL format" }),
    uploadedFiles: z.array(z.string()),
    isActive: z.boolean(),
})

export type Banner = z.infer<typeof NewBannerSchema>;

export const NewFarmerSchema = z.object({
    name: z.string().min(2, "Full name must be at least 2 characters long")
        .max(100, "Full name must be at most 100 characters long")
        .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
    phone: z.string(),
    email: z.string().email("Invalid email address"),
    physicalAddress: z.string().nullable(),
    contactPerson: z.string().nullable(),
    contactPersonPhone: z.string().nullable(),    
    landSize: z.number(),
    mainCrop: z.string(),
    products: z.array(z.string()),
    uploadedFiles: z.array(z.string()),
    terms: z.string().nullable(),
    notes: z.string().nullable(),
    code: z.string(),
    isActive: z.boolean(),
    userId: z.string(),
})

export type Farmer = z.infer<typeof NewFarmerSchema>;

export const NewMarketSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().min(10, {
        message: "Description is required"
    }),
    slug: z.string(),
    uploadedFiles: z.array(z.string()),
    categoryIds: z.array(z.string()).min(1, "At least one category must be selected"),
    isActive: z.boolean(),
})

export type Market = z.infer<typeof NewMarketSchema>;


export const NewProductSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().min(10, {
        message: "Description is required"
    }),
    slug: z.string(),
    uploadedFiles: z.array(z.string()),
    sku: z.string(),    
    barcode: z.string(),
    productPrice: z.preprocess(
        (val) => (typeof val === "string" ? parseFloat(val) : val),
        z.number().nonnegative("Product Price must be a nonnegative number")),
    salePrice: z.preprocess(
        (val) => (typeof val === "string" ? parseFloat(val) : val),
        z.number().nonnegative("Sale Price must be a nonnegative number")),
    categoryId: z.string(),
    userId: z.string(),
    tags: z.array(z.string()).nullable(),
    isActive: z.boolean(),
    isWholesale: z.boolean(),
    wholesalePrice: z.preprocess(
        (val) => (typeof val === "string" ? parseFloat(val) : val),
        z.number().nonnegative("Wholesale Price must be a nonnegative number")),
    wholesaleQty: z
    .preprocess((val) => (val ? Number(val) : val), z
      .number().nonnegative("Wholesale Qty must be a nonnegative number")),
    productCode: z.string(),
    productStock: z
    .preprocess((val) => (val ? Number(val) : val), z
      .number().nonnegative("Product Stock must be a nonnegative number")),
    unit: z.string(),
    qty: z.number().default(1),
})

export type Product = z.infer<typeof NewProductSchema>;

export const NewStaffSchema = z.object({
    name: z.string().min(2, "Full name must be at least 2 characters long")
        .max(100, "Full name must be at most 100 characters long")
        .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
    password:  z.string().min(6, "Password must be at least 6 characters long"),     
    phone: z.string(),
    email: z.string().email("Invalid email address"),
    physicalAddress: z.string().min(5, "Address must be at least 5 characters long"),
    notes: z.string().min(5, "Notes must be at least 5 characters long")
        .max(1000, "Notes must be at most 1000 characters long"),
    code: z.string(),
    nin: z.string(),
    dob: z.string(),
    isActive: z.boolean(),
})

export type Staff = z.infer<typeof NewStaffSchema>;


// training
function extractTextFromHTML(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent?.trim() || "";
  }


export const NewTrainingSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().min(10, {
        message: "Description is required"
    }),
    slug: z.string(),
    uploadedFiles: z.array(z.string()),
    categoryId: z.string(),
    content: z.string().refine(
        (value) => {
          return extractTextFromHTML(value).trim().length >= 5;
        },
        {
          message: "The text must be at least 5 characters long after trimming",
        }
      ),
    isActive: z.boolean(),
})

export type Training = z.infer<typeof NewTrainingSchema>;

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
    role: z.string(),
});
export type Registering = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string(),   
});
export type LoginSchema = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }), 
});
export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
    id: z.string(),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
});
export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

// Checkout Form Validation Schema
export const step1Schema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  });

export const step2Schema = z.object({
    streetAddress: z.string().nonempty("Street address is required"),
    city: z.string().nonempty("City is required"),
    country: z.string().nonempty("Country is required"),
    district: z.string().nonempty("District is required"),
    shippingCost: z.coerce.number().min(0, "Shipping cost must be at least 0"),
  });  

  export const step3Schema = z.object({
    paymentMethod: z.string().nonempty("District is required"),
  });  