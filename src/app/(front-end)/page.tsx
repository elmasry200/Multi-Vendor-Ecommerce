import CategoryList from "@/components/frontend/CategoryList";
import CommunityTrainings from "@/components/frontend/CommunityTrainings";
import Hero from "@/components/frontend/Hero";
import MarketList from "@/components/frontend/MarketList";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";


export default async function Home() {
    
   const categoriesDta = await getData('categories');   

  const categories = categoriesDta.filter((category: Prisma.CategoryGetPayload<{ include: { products: true } }>)=>{

    return category.products.length > 3
    
  });

  const session = await getServerSession(authOptions);
  console.log(session?.user);

  return (
    <div className="min-h-screen">
      <Hero />
      <MarketList />

       {
        categories.map((category: Prisma.CategoryGetPayload<{ include: { products: true } }>,i: number) => {
          return (
            <div className="py-8" key={i}>
            <CategoryList category={category} />
          </div>
          )
        })
       }

      <CommunityTrainings />
      {/* <h1 className="text-4xl">Wellcome to Limi Ecommerce</h1>
      <Link href="/register-farmer" className="my-4 underline">Become a Farmer /Vendor / Supplier</Link> */}
    </div>
  );
}
