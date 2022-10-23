import { allList } from '@api/home';
import type { ReactElement } from 'react';
import type { ResponseType } from '@/types/index';

function Index(): ReactElement {
  return <div>hello wrold</div>;
}

export async function getStaticProps() {
  const res: ResponseType<any> = await allList({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    page: 1,
    size: 10
  });

  const props = {
    list: []
  };

  if (res?.code === 200) {
    props.list = res?.data || [];
  }

  return {
    props,
    revalidate: 10
  };
}

export default Index;
