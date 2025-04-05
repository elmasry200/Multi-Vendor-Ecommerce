import CustomDataTable from "@/components/backoffice/CustomDataTable"
import DashboardCharts from "@/components/backoffice/DashboardCharts"
import FarmerDashboard from "@/components/backoffice/FarmerDashboard"
import Heading from "@/components/backoffice/Heading"
import LargeCards from "@/components/backoffice/LargeCards"
import SmallCards from "@/components/backoffice/SmallCards"
import UserDashboard from "@/components/backoffice/UserDashboard"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if(role === "USER") {
    return <UserDashboard />
  }

  if(role === "FARMER") {
    return <FarmerDashboard />
  }
  return (
    <div>
      <Heading title="Dashboard Overview"/>
      {/* Large Cards */}
      <LargeCards />
      {/* Small Cards */}
      <SmallCards />
      {/* Charts */}
      <DashboardCharts />
      {/* Recent Orders Table */}
      <CustomDataTable />
    </div>
  )
}

