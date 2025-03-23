import PageHeader from "@/components/backoffice/PageHeader"
import TableActions from "@/components/backoffice/TableActions"
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";



async function CouponsPage() {

  const coupons = await getData("coupons");

  return (
    <div>
      {/* Header */}
      <PageHeader
        headingTitle="Coupons"
        pageHref="/dashboard/coupons/new"
        linkTitle="Add Coupon"
      />
      {/* Table Actions */}
      {/* Export || Search || Bulk Delete */}
      {/* <TableActions /> */}
      <div className="py-8">
        <DataTable data={coupons} columns={columns} filterKeys={["title"]} />
      </div>
    </div>
  )
}
export default CouponsPage
