import FormHeader from "@/components/backoffice/FormHeader";
import NewTrainingForm from "@/components/backoffice/NewTrainingForm";
import { getData } from "@/lib/getData";
import { Prisma } from "@prisma/client";

export default async function NewTraining() {

   // Categories
     const categoriesData = await getData("categories");
  
      const categories = categoriesData.map((category: Prisma.CategoryGetPayload<{}>)=> {
         return {
           id: category.id,
           title: category.title,
         }
       })
       //console.log(categories);
  
  return (
    <div>
      <FormHeader title="New Training" />
  <NewTrainingForm categories={categories} />
    </div>
 
  )
}
