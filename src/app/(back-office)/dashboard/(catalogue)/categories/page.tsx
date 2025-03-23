import PageHeader from "@/components/backoffice/PageHeader"
import TableActions from "@/components/backoffice/TableActions"
import DataTable from "@/components/data-table-components/DataTable"
import { getData } from "@/lib/getData"
import { columns } from "./columns";




async function CategoriesPage() {
 
  const categories = await getData("categories");

  return (
    <div>
      {/* Header */}
      <PageHeader
        headingTitle="Categories"
        pageHref="/dashboard/categories/new"
        linkTitle="Add Category"
      />
      {/* Table Actions */}
      {/* Export || Search || Bulk Delete */}
       {/* <TableActions /> */}
      <div className="py-8"> 
        <DataTable data={categories} columns={columns} filterKeys={["title"]} />
       </div> 
    </div>
  )
}
export default CategoriesPage
