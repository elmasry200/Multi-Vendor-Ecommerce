import PageHeader from "@/components/backoffice/PageHeader"
import TableActions from "@/components/backoffice/TableActions"
import DataTable from "@/components/data-table-components/DataTable"
import { getData } from "@/lib/getData"
import { columns } from "./columns";

async function MarketsPage() {

const markets = await getData("markets");

  return (
    <div>
      {/* Header */}
      <PageHeader
        headingTitle="Markets"
        pageHref="/dashboard/markets/new"
        linkTitle="Add Market"
      />
   {/* Table Actions */}
        {/* Export || Search || Bulk Delete */}
        {/* <TableActions /> */}
        <div className="py-8">
          <DataTable data={markets} columns={columns} filterKeys={["title"]} />
        </div>
    </div>
  )
}
export default MarketsPage
