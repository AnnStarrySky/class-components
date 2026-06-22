import { Suspense } from 'react'
import Layout from "../components/Layout/Layout";

export default function Page() {
   return (
    <Suspense fallback={null}>
      <Layout />
    </Suspense>
  )
}