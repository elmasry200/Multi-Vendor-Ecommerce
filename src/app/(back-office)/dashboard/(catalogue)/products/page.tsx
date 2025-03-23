import PageHeader from "@/components/backoffice/PageHeader"
import TableActions from "@/components/backoffice/TableActions"
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData"
import { columns } from "./columns";



async function ProductsPage() {

const products = await getData("products");

  return (
    <div>
      {/* Header */}
      <PageHeader
        headingTitle="Products"
        pageHref="/dashboard/products/new"
        linkTitle="Add Product"
      />
      {/* Table Actions */}
      {/* Export || Search || Bulk Delete */}
       {/* <TableActions /> */}
      <div className="py-8">
         <DataTable data={products} columns={columns}  filterKeys={["title"]}/>
      </div>
    </div>
  )
}
export default ProductsPage
