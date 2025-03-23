import NewMarketForm from "@/components/backoffice/NewMarketForm";
import { getData } from "@/lib/getData";
import { Prisma } from "@prisma/client";

export default async function NewMarket() {

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

    <NewMarketForm categories={categories}/>

  )
}
