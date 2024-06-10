import DraggableList from "./components/draggableList/DraggableList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-0 lg:p-24 ">
      <DraggableList />
    </main>
  );
}
