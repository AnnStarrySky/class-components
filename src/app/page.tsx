import { Suspense } from 'react'
import Layout from "../components/Layout/Layout";

export default function Page() {
  <Suspense fallback={null}>
      <Layout />
    </Suspense>
}