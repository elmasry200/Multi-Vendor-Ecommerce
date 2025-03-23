import PageHeader from "@/components/backoffice/PageHeader"
import TableActions from "@/components/backoffice/TableActions"
import DataTable from "@/components/data-table-components/DataTable"
import { columns } from "./columns";
import { getData } from "@/lib/getData";



async function CommunityPage() {

const trainings = await getData("trainings");

  return (
    <div>
      {/* Header */}
      <PageHeader
        headingTitle="Limi  Community Trainings"
        pageHref="/dashboard/community/new"
        linkTitle="Add Training"
      />
      {/* Table Actions */}
      {/* Export || Search || Bulk Delete */}
      {/* <TableActions /> */}
      <div className="py-8">
        <DataTable data={trainings} columns={columns} filterKeys={["title"]} />
      </div>
    </div>
  )
}
export default CommunityPage
