import MainLayout from "@/components/common/layouts/MainLayout";

function Index() {
  return <div>Reviews</div>;
}

Index.getLayout = (pageProps) => (
  <MainLayout>
    <Index {...pageProps} />
  </MainLayout>
);

export default Index;
