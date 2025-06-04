import React from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
function Index() {
  return <div>Indwwex</div>;
}

export default Index;

Index.getLayout = (pageProps) => (
  <MainLayout>
    <Index {...pageProps} />
  </MainLayout>
);
