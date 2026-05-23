export default function HomePage() {
  const stats = [
    { title: 'AI Replies', value: '942' },
    { title: 'Customers', value: '221' },
    { title: 'Revenue', value: '$4,200' },
    { title: 'Engagement', value: '87%' }
  ];

  const flows = [
    'Lead Qualification AI',
    'Auto Follow-up System',
    'AI Sales Conversion',
    'Realtime Inbox Automation'
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold">AI Social Automation Platform</h1>
            <p className="text-zinc-400 mt-3 text-lg">
              Realtime AI employees for customer support, sales and engagement.
            </p>
          </div>

          <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold">
            Start Autopilot
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <p className="text-zinc-400">{stat.title}</p>
              <h2 className="text-4xl font-bold mt-3">{stat.value}</h2>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-3xl font-bold mb-6">AI Automation Workflows</h2>

            <div className="space-y-4">
              {flows.map((flow) => (
                <div key={flow} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
                  <span className="text-lg">{flow}</span>
                  <span className="text-green-400">Running</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-6">Realtime Inbox</h2>

            <div className="space-y-4">
              <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800">
                <p className="font-semibold">Instagram Lead</p>
                <p className="text-zinc-400 mt-2">AI replied automatically</p>
              </div>

              <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800">
                <p className="font-semibold">Facebook Customer</p>
                <p className="text-zinc-400 mt-2">Awaiting conversion flow</p>
              </div>

              <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800">
                <p className="font-semibold">Messenger Support</p>
                <p className="text-zinc-400 mt-2">Gemini AI active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
