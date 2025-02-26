const LunchPage = () => {
  const regulars = ["name1", "name2", "name3", "name4", "name5", "name6", "name7", "name8", "name9", "name10"];
  const nsfs = ["name1", "name2", "name3"];
  const orns = ["name1", "name2", "name3", "name4"];

  return (
    <div className="container mx-auto p-4 bg-oxford_blue text-light_cyan">
      <h1 className="text-2xl font-bold mb-4 text-light_cyan">Lunch Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Hierarchy order */}
        <div className="border p-4 rounded shadow h-fit bg-marian_blue">
          <h2 className="text-xl font-semibold text-light_cyan">Regular</h2>
          {regulars.map((reg, i) => (
            <div className="bg-light_cyan p-4 rounded shadow mt-2" key={i}>
              <h3 className="text-lg font-medium text-oxford_blue">{reg}</h3>
              <textarea className="w-full mt-2 p-2 border rounded bg-white text-oxford_blue" placeholder="Add food note..."></textarea>
              <textarea className="w-full mt-2 p-2 border rounded bg-white text-oxford_blue" placeholder="Add drink note..."></textarea>
            </div>
          ))}
        </div>
        <div className="border p-4 rounded shadow h-fit bg-marian_blue">
          <h2 className="text-xl font-semibold text-light_cyan">NSF</h2>
          {nsfs.map((reg, i) => (
            <div className="bg-light_cyan p-4 rounded shadow mt-2" key={i}>
              <h3 className="text-lg font-medium text-oxford_blue">{reg}</h3>
              <textarea className="w-full mt-2 p-2 border rounded bg-white text-oxford_blue" placeholder="Add food note..."></textarea>
              <textarea className="w-full mt-2 p-2 border rounded bg-white text-oxford_blue" placeholder="Add drink note..."></textarea>
            </div>
          ))}
        </div>
        <div className="border p-4 rounded shadow h-fit bg-marian_blue">
          <h2 className="text-xl font-semibold text-light_cyan">ORNS</h2>
          {orns.map((reg, i) => (
            <div className="bg-light_cyan p-4 rounded shadow mt-2" key={i}>
              <h3 className="text-lg font-medium text-oxford_blue">{reg}</h3>
              <textarea className="w-full mt-2 p-2 border rounded bg-white text-oxford_blue" placeholder="Add food note..."></textarea>
              <textarea className="w-full mt-2 p-2 border rounded bg-white text-oxford_blue" placeholder="Add drink note..."></textarea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LunchPage;
