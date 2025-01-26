import MemoryGame from "@/components/game/MemoryGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
          Memory Match Game
        </h1>
        <MemoryGame />
      </div>
    </div>
  );
};

export default Index;