const LunchPage = () => {
  const regulars = ["name1", "name2", "name3", "name4", "name5", "name6", "name7", "name8", "name9", "name10"];
  const nsfs = ["name1", "name2", "name3"];
  const orns = ["name1", "name2", "name3", "name4"];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#03045E]">Lunch Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Hierarchy order */}
        <div className="border p-4 rounded shadow h-fit bg-[#90E0EF]">
          <h2 className="text-xl font-semibold text-[#03045E]">Regular</h2>
          {regulars.map((reg, i) => (
            <div className="bg-white p-4 rounded shadow mt-2" key={i}>
              <h3 className="text-lg font-medium text-[#0077B6]">{reg}</h3>
              <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add food note..."></textarea>
              <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add drink note..."></textarea>
            </div>
          ))}
        </div>
        <div className="border p-4 rounded shadow h-fit bg-[#90E0EF]">
          <h2 className="text-xl font-semibold text-[#03045E]">NSF</h2>
          {nsfs.map((reg, i) => (
            <div className="bg-white p-4 rounded shadow mt-2" key={i}>
              <h3 className="text-lg font-medium text-[#0077B6]">{reg}</h3>
              <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add food note..."></textarea>
              <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add drink note..."></textarea>
            </div>
          ))}
        </div>
        <div className="border p-4 rounded shadow h-fit bg-[#90E0EF]">
          <h2 className="text-xl font-semibold text-[#03045E]">ORNS</h2>
          {orns.map((reg, i) => (
            <div className="bg-white p-4 rounded shadow mt-2" key={i}>
              <h3 className="text-lg font-medium text-[#0077B6]">{reg}</h3>
              <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add food note..."></textarea>
              <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add drink note..."></textarea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LunchPage;
