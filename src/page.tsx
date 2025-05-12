import { HeaderBlock } from 'components/headerBlock';
import Table from 'components/table';

function Page() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-violet-900 to-blue-800 flex flex-col items-center pt-4">
      <div className="w-full max-w-5xl mx-auto">
        <HeaderBlock />
        <div className="overflow-auto w-full max-h-[calc(100vh-250px)] mt-1">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Page;
