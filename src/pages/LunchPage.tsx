const LunchPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lunch Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example lunch items */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Grilled Chicken Salad</h2>
          <p className="text-gray-700">A healthy mix of grilled chicken, fresh greens, and a light vinaigrette.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Veggie Wrap</h2>
          <p className="text-gray-700">A delicious wrap filled with fresh vegetables and hummus.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Pasta Primavera</h2>
          <p className="text-gray-700">Pasta with a mix of seasonal vegetables in a light tomato sauce.</p>
        </div>
      </div>
    </div>
  );
};

export default LunchPage;
