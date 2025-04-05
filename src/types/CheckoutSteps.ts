import { z } from "zod";

import { step1Schema, step2Schema, step3Schema } from "@/schemas";


export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

export type FormData = Step1Data & Step2Data & Step3Data