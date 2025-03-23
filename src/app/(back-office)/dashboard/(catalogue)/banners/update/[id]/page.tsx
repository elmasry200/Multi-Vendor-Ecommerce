import FormHeader from '@/components/backoffice/FormHeader';
import NewBannerForm from '@/components/backoffice/Forms/NewBannerForm';
import { getData } from '@/lib/getData';
import React from 'react'

interface BannerProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateBanner({ params }: BannerProps) {

  const { id } = await params;

  const banner = await getData(`banners/${id}`);
  return (
    <div>
      <FormHeader title='Update Banner' />
      <NewBannerForm updateData={banner} />
    </div>
  )
}
