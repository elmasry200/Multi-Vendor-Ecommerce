import PageHeader from "@/components/backoffice/PageHeader"
import TableActions from "@/components/backoffice/TableActions"
import DataTable from "@/components/data-table-components/DataTable"
import { getData } from "@/lib/getData";
import { columns } from "./columns";

async function FarmerPage() {

  const farmers = await getData("farmers");

  return (
    <div>
      {/* Header */}
      <PageHeader
        headingTitle="Farmers"
        pageHref="/dashboard/farmers/new"
        linkTitle="Add Farmer"
      />
      {/* Table Actions */}
      {/* Export || Search || Bulk Delete */}
      {/* <TableActions /> */}
      <div className="py-8">
        <DataTable data={farmers} columns={columns} filterKeys={["name", "email"]} />
      </div>
    </div>
  )
}
export default FarmerPage
