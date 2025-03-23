import FormHeader from "@/components/backoffice/FormHeader";

import NewCouponForm from "@/components/backoffice/Forms/NewCouponForm";
import { getData } from "@/lib/getData";

interface CouponProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateCoupon({ params }: CouponProps) {
    const { id } = await params;  
    const coupon = await getData(`coupons/${id}`);
  return (
       <div>
         <FormHeader title='Update Coupon' />
         <NewCouponForm updateData={coupon} />
       </div>
  )
}
