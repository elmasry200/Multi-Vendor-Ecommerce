import toast from "react-hot-toast";
import { z } from "zod";
import {
   NewCaetgorySchema,
   NewCouponSchema, 
   NewBannerSchema, 
   NewFarmerSchema, 
   NewMarketSchema,
   NewProductSchema,
   NewStaffSchema,
   NewTrainingSchema,
  } from "@/schemas";

export async function makePostRequest(
    setLoading: (loading: boolean) => void,
    endpoint: string,
    data: z.infer<typeof NewCaetgorySchema> | z.infer<typeof NewCouponSchema> | z.infer<typeof NewBannerSchema> | z.infer<typeof NewFarmerSchema> | z.infer<typeof NewMarketSchema> | z.infer<typeof NewProductSchema> | z.infer<typeof NewStaffSchema> | z.infer<typeof NewTrainingSchema>,
    resourceName: string,
    reset: () => void // Function to reset the form
): Promise<void> {
        try {
          setLoading(true);
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          const response = await fetch(`${baseUrl}/${endpoint}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });
          if(response.ok) {
            setLoading(false);
            toast.success(`New ${resourceName} Created Successfully`);
            reset();
          } else {
            setLoading(false);
            if (response.status === 409) {
                toast.error("The Giving Warehouse Stock is NOT Enough");
            } else {
                toast.error("Something went wrong")
            }
          }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
} 

export async function makePutRequest(
  setLoading: (loading: boolean) => void,
  endpoint: string,
  data: z.infer<typeof NewCaetgorySchema> | z.infer<typeof NewCouponSchema> | z.infer<typeof NewBannerSchema> | z.infer<typeof NewFarmerSchema> | z.infer<typeof NewMarketSchema> | z.infer<typeof NewProductSchema> | z.infer<typeof NewStaffSchema> | z.infer<typeof NewTrainingSchema>,
  resourceName: string,
  reset: () => void // Function to reset the form
): Promise<void> {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await fetch(`${baseUrl}/${endpoint}`,{
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        if(response.ok) {
          setLoading(false);
          toast.success(`Success ${resourceName} Updated Successfully`);
          reset();
        } else {
          setLoading(false);
          toast.error("Something went wrong");
        }
      } catch (error) {
          setLoading(false);
          console.log(error);
      }
} 