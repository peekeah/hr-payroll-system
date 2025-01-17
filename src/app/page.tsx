import Sidebar from "../components/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-[300px] p-5">
        <Sidebar />
      </div>
      <div className="bg-secondary flex-1">Right content</div>
    </div>
  );
}
