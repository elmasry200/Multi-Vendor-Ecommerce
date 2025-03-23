import PageHeader from "@/components/backoffice/PageHeader"
import TableActions from "@/components/backoffice/TableActions"

const FarmerPage = () => {
  return (
    <div>
      {/* Header */}
      <PageHeader
        headingTitle="Staff"
        pageHref="/dashboard/staff/new"
        linkTitle="Add Staff"
      />
      {/* Table Actions */}
      {/* Export || Search || Bulk Delete */}
       <TableActions />
      <div className="py-8">
      <h2>Table</h2>
      </div>
    </div>
  )
}
export default FarmerPage
