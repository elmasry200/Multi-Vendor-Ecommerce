import FormHeader from '@/components/backoffice/FormHeader'
import NewFarmerForm from '@/components/backoffice/NewFarmerForm'

export default async function NewFarmer() {

  return (
    <div>
      <FormHeader title='New Farmer' />

     <NewFarmerForm />       
    </div>
  )
}
