import PageHeader from "@/components/backoffice/PageHeader"
import TableActions from "@/components/backoffice/TableActions"
import DataTable from "@/components/data-table-components/DataTable"
import { getData } from "@/lib/getData"
import { columns } from "./columns";

async function BannersPage() {

  const banners = await getData("banners"); 

  return (
    <div>
      {/* Header */}
      <PageHeader
        headingTitle="Banners"
        pageHref="/dashboard/banners/new"
        linkTitle="Add Banner"
      />
        {/* Table Actions */}
          {/* Export || Search || Bulk Delete */}
           {/* <TableActions /> */}
          <div className="py-8"> 
            <DataTable data={banners} columns={columns} filterKeys={["title"]} />
           </div> 
        </div>
  )
}
export default BannersPage
